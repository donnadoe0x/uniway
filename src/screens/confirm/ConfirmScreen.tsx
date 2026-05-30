import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Header from '../../components/layout/Header';
import { addBookmark } from '../../services/api/bookmarksApi';

const COLORS = {
  primary: '#700003',
  secondary: '#04324A',
  background: '#f7f7f7',
  dark: '#1d1d1d',
  white: '#ffffff',
  light: '#f3f1f5',
  accent: '#FBEFD5',
  gray: '#6b7280',
};

const ConfirmScreen = ({ navigation, route }: any) => {
  const [saving, setSaving] = useState(false);

  const detectedRoom =
    route?.params?.detectedRoom ||
    route?.params?.className ||
    route?.params?.processedRoomId ||
    route?.params?.roomId ||
    'قاعة غير محددة';

  const processedRoomId =
    route?.params?.processedRoomId ||
    route?.params?.roomId ||
    route?.params?.processed_room_id ||
    '';

  const className =
    route?.params?.className ||
    detectedRoom;

  const buildingId =
    route?.params?.buildingId ||
    'غير محدد';

  const floorNum =
    route?.params?.floorNum ||
    'غير محدد';

  const description =
    route?.params?.description ||
    'لا يوجد وصف متاح لهذه القاعة.';

  const rawText =
    route?.params?.rawText ||
    route?.params?.detected_text_raw ||
    '';

  const canSaveBookmark = useMemo(() => {
    return processedRoomId && processedRoomId.trim().length > 0;
  }, [processedRoomId]);

  const handleSaveBookmark = async () => {
    if (!canSaveBookmark) {
      Alert.alert(
        'لا يمكن الحفظ',
        'لم يتم العثور على رقم القاعة الصحيح من نتيجة نموذج التعرف.'
      );
      return;
    }

    try {
      setSaving(true);

      await addBookmark(processedRoomId);

      Alert.alert(
        'تم الحفظ',
        `تمت إضافة ${className} إلى القاعات المحفوظة.`
      );
    } catch (error) {
      console.log('Save bookmark error:', error);

      Alert.alert(
        'تعذر الحفظ',
        'لم نتمكن من حفظ القاعة في المفضلة. تأكدي أن القاعة موجودة في قاعدة البيانات ثم حاولي مرة أخرى.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmLocation = () => {
  

    navigation.navigate('Search', {
      currentRoom: className,
      currentRoomId: processedRoomId,
      buildingId,
      floorNum,
      description,
    });
  };

  const handlePreviewAR = () => {
    

    navigation.navigate('ARNavigation', {
      currentRoom: className,
      detectedRoom: className,
      room: className,
      destinationRoom: className,
      selectedRoom: className,
      roomId: processedRoomId,
      buildingId,
      floorNum,
      description,
    });
  };

  return (
    <View style={styles.container}>
      <Header title="UniWay" />

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>تم تحديد الموقع</Text>

          <Text style={styles.subtitle}>
            تم تحليل صورة لوحة القاعة وتحديد موقعك الحالي.
          </Text>

          <View style={styles.infoBox}>
            <Text style={styles.label}>القاعة</Text>
            <Text style={styles.roomName}>{className}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.smallBox}>
              <Text style={styles.smallLabel}>المبنى</Text>
              <Text style={styles.smallValue}>{buildingId}</Text>
            </View>

            <View style={styles.smallBox}>
              <Text style={styles.smallLabel}>الدور</Text>
              <Text style={styles.smallValue}>{floorNum}</Text>
            </View>
          </View>

          <View style={styles.descriptionBox}>
            <Text style={styles.label}>الوصف</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          {rawText ? (
            <View style={styles.rawBox}>
              <Text style={styles.rawLabel}>النص المقروء من الصورة</Text>
              <Text style={styles.rawText}>{rawText}</Text>
            </View>
          ) : null}

          {!canSaveBookmark ? (
            <Text style={styles.warningText}>
              تنبيه: لم يصل رقم القاعة الداخلي من نموذج التعرف، لذلك قد لا يعمل الحفظ في المفضلة.
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleConfirmLocation}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>تأكيد الموقع واختيار الوجهة</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSaveBookmark}
            activeOpacity={0.85}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color={COLORS.primary} />
            ) : (
              <Text style={styles.secondaryButtonText}>حفظ في المفضلة</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.previewButton}
            onPress={handlePreviewAR}
            activeOpacity={0.85}
          >
            <Text style={styles.previewButtonText}>معاينة التوجيه</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.cancelButtonText}>إعادة المحاولة</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 26,
    padding: 22,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 7,
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: COLORS.accent,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'right',
    marginBottom: 6,
  },
  roomName: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.secondary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  smallBox: {
    flex: 1,
    backgroundColor: COLORS.light,
    borderRadius: 16,
    padding: 14,
  },
  smallLabel: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'right',
    marginBottom: 4,
  },
  smallValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.dark,
    textAlign: 'right',
  },
  descriptionBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  description: {
    fontSize: 14,
    color: COLORS.dark,
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 21,
  },
  rawBox: {
    backgroundColor: '#f9fafb',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
  },
  rawLabel: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'right',
    marginBottom: 4,
  },
  rawText: {
    fontSize: 13,
    color: COLORS.dark,
    textAlign: 'right',
  },
  warningText: {
    color: COLORS.primary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 17,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 17,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ead8ad',
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '800',
  },
  previewButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 17,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  previewButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
  },
  cancelButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 17,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.gray,
    fontSize: 15,
    fontWeight: '700',
  },
});