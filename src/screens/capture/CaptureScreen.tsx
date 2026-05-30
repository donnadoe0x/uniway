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
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';

import Header from '../../components/layout/Header';
import BottomNav from '../../components/layout/BottomNav';

const CAMERA_POPUP_KEY = 'camera_permission_seen';
const BASE_URL = 'https://rayouf0-uniway-backend-core.hf.space';
const REQUEST_TIMEOUT = 30000;

type PredictionData = {
  detected_text_raw?: string;
  processed_room_id?: string;
  className?: string;
  buildingId?: string;
  floorNum?: string;
  description?: string;
};

type PredictionResponse = {
  status: 'success' | 'error';
  message?: string;
  error_code?: string;
  data?: PredictionData;
};

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

  const requestWithTimeout = async (
    url: string,
    options: RequestInit
  ): Promise<Response> => {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT);

    try {
      return await fetch(url, {
        ...options,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const predictRoomFromImage = async (
    asset: Asset
  ): Promise<PredictionData> => {
    if (!asset.uri) {
      throw new Error('لم يتم العثور على مسار الصورة');
    }

    const formData = new FormData();

    formData.append('file', {
      uri: asset.uri,
      type: asset.type || 'image/jpeg',
      name: asset.fileName || `signage_${Date.now()}.jpg`,
    } as any);

    const response = await requestWithTimeout(`${BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    });

    const result: PredictionResponse = await response.json();

    if (!response.ok || result.status !== 'success' || !result.data) {
      throw new Error(
        result.message ||
          result.error_code ||
          'تعذر التعرف على لوحة القاعة من الصورة'
      );
    }

    return result.data;
  };

  const handleImage = async (asset: Asset | undefined): Promise<void> => {
    if (!asset?.uri) {
      Alert.alert('تنبيه', 'لم يتم اختيار صورة');
      return;
    }

    try {
      setLoading(true);

      const prediction = await predictRoomFromImage(asset);

      const detectedRoom =
        prediction.className ||
        prediction.processed_room_id ||
        'قاعة غير محددة';

      navigation.navigate('Confirm', {
        detectedRoom,
        processedRoomId: prediction.processed_room_id,
        roomId: prediction.processed_room_id,
        className: prediction.className,
        buildingId: prediction.buildingId,
        floorNum: prediction.floorNum,
        description: prediction.description,
        rawText: prediction.detected_text_raw,
      });
    } catch (error: any) {
      console.log('Prediction error:', error);

      Alert.alert(
        'تعذر تحليل الصورة',
        error?.message ||
          'حدث خطأ أثناء إرسال الصورة إلى نموذج التعرف. حاولي بصورة أوضح أو اختاري صورة من المعرض.'
      );
    } finally {
      setLoading(false);
    }
  };

  const openCamera = async (): Promise<void> => {
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
        maxWidth: 1200,
        maxHeight: 1200,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert('خطأ', result.errorMessage || 'تعذر فتح الكاميرا');
        return;
      }

      await handleImage(result.assets?.[0]);
    } catch (error) {
      console.log('Camera error:', error);
      Alert.alert('خطأ', 'تعذر فتح الكاميرا');
    }
  };

  const openGallery = async (): Promise<void> => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
        maxWidth: 1200,
        maxHeight: 1200,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert('خطأ', result.errorMessage || 'تعذر فتح المعرض');
        return;
      }

      await handleImage(result.assets?.[0]);
    } catch (error) {
      console.log('Gallery error:', error);
      Alert.alert('خطأ', 'تعذر فتح المعرض');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="تحديد الموقع" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>التقطي صورة واضحة للوحة القاعة</Text>

        <Text style={styles.subtitle}>
          تأكدي من ظهور اسم أو رقم القاعة بشكل واضح حتى يتمكن النظام من تحديد موقعك الحالي.
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
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={openCamera}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>فتح الكاميرا</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={openGallery}
              activeOpacity={0.85}
            >
              <Text style={styles.secondaryButtonText}>اختيار صورة من المعرض</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

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
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 120,
    paddingTop: 24,
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