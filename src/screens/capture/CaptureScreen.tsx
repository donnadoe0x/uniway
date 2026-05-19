import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import Header from '../../components/layout/Header';
import BottomNav from '../../components/layout/BottomNav';

const CAMERA_POPUP_KEY = 'camera_permission_seen';

const CaptureScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);

  const showCameraInfoOnce = async (): Promise<boolean> => {
    const hasSeenPopup = await AsyncStorage.getItem(CAMERA_POPUP_KEY);

    if (hasSeenPopup) {
      return true;
    }

    return new Promise((resolve) => {
      Alert.alert(
        'الوصول إلى الكاميرا',
        'نحتاج إلى إذن لاستخدام الكاميرا لالتقاط صورة لوحة القاعة وتحديد موقعك.',
        [
          {
            text: 'إلغاء',
            style: 'cancel',
            onPress: () => resolve(false),
          },
          {
            text: 'موافقة',
            onPress: async () => {
              await AsyncStorage.setItem(CAMERA_POPUP_KEY, 'true');
              resolve(true);
            },
          },
        ],
        { cancelable: false }
      );
    });
  };

  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
      return true;
    }

    const alreadyGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );

    if (alreadyGranted) {
      return true;
    }

    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'إذن استخدام الكاميرا',
        message: 'يحتاج تطبيق UniWay إلى استخدام الكاميرا لالتقاط صورة لوحة القاعة.',
        buttonPositive: 'موافق',
        buttonNegative: 'إلغاء',
      }
    );

    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        'إذن الكاميرا غير مفعل',
        'يرجى تفعيل إذن الكاميرا من إعدادات التطبيق.',
        [
          { text: 'إلغاء', style: 'cancel' },
          { text: 'فتح الإعدادات', onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }

    Alert.alert('تم الرفض', 'لا يمكن فتح الكاميرا بدون السماح باستخدامها.');
    return false;
  };

  const handleImage = async (uri: string | undefined) => {
    if (!uri) {
      Alert.alert('تنبيه', 'لم يتم اختيار صورة');
      return;
    }

    try {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);

        navigation.navigate('Confirm', {
          detectedRoom: 'قاعة 101',
        });
      }, 2000);
    } catch (error) {
      setLoading(false);
      Alert.alert('خطأ', 'حدث خطأ أثناء تحليل الصورة');
    }
  };

  const openCamera = async () => {
    try {
      const shouldContinue = await showCameraInfoOnce();

      if (!shouldContinue) {
        return;
      }

      const allowed = await requestCameraPermission();

      if (!allowed) {
        return;
      }

      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: false,
        maxWidth: 1000,
        maxHeight: 1000,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert('خطأ', result.errorMessage || 'تعذر فتح الكاميرا');
        return;
      }

      const imageUri = result.assets?.[0]?.uri;
      handleImage(imageUri);
    } catch (error) {
      Alert.alert('خطأ', 'تعذر فتح الكاميرا');
    }
  };

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
        maxWidth: 1000,
        maxHeight: 1000,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert('خطأ', result.errorMessage || 'تعذر فتح المعرض');
        return;
      }

      const imageUri = result.assets?.[0]?.uri;
      handleImage(imageUri);
    } catch (error) {
      Alert.alert('خطأ', 'تعذر فتح المعرض');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="UniWay" />

      <View style={styles.content}>
        <Text style={styles.title}>التقطي صورة واضحة للوحة القاعة</Text>

        <Text style={styles.subtitle}>
          تأكدي من ظهور اسم القاعة بشكل واضح داخل الصورة
        </Text>

        <View style={styles.instructionBox}>
          <Text style={styles.instructionText}>• وجّهي الكاميرا نحو لوحة القاعة</Text>
          <Text style={styles.instructionText}>• تأكدي من الإضاءة ووضوح النص</Text>
          <Text style={styles.instructionText}>• التقطي الصورة ثم انتظري تحليلها</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#700003" />
            <Text style={styles.loadingText}>جارٍ تحليل الصورة...</Text>
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.primaryButton} onPress={openCamera}>
              <Text style={styles.primaryButtonText}>فتح الكاميرا</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={openGallery}>
              <Text style={styles.secondaryButtonText}>اختيار صورة من المعرض</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <BottomNav navigation={navigation} />
    </View>
  );
};

export default CaptureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 110,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#700003',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#4B4B4B',
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 22,
    marginBottom: 24,
  },
  instructionBox: {
    width: '100%',
    backgroundColor: '#f3f1f5',
    borderRadius: 16,
    padding: 18,
    marginBottom: 28,
  },
  instructionText: {
    fontSize: 14,
    color: '#1d1d1d',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 8,
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: '#700003',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
  },
  secondaryButtonText: {
    color: '#700003',
    fontSize: 15,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  loadingText: {
    marginTop: 12,
    color: '#700003',
    fontSize: 14,
    fontWeight: '600',
  },
});