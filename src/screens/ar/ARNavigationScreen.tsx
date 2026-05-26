import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

import Header from '../../components/layout/Header';

const COLORS = {
  primary: '#700003',
  secondary: '#04324A',
  background: '#f7f7f7',
  dark: '#1d1d1d',
  accent: '#FBEFD5',
  white: '#ffffff',
  gray: '#6b7280',
  lightGray: '#e5e7eb',
  success: '#0f766e',
};

const ARNavigationScreen = ({ route, navigation }: any) => {
  const [navigationStarted, setNavigationStarted] = useState(false);
  const [arrived, setArrived] = useState(false);

  const destinationRoom =
    route?.params?.room ||
    route?.params?.destinationRoom ||
    route?.params?.selectedRoom ||
    'قاعة غير محددة';

  const currentRoom =
    route?.params?.currentRoom ||
    route?.params?.detectedRoom ||
    'موقعك الحالي';

  const routeSteps = useMemo(
    () => [
      `ابدئي من: ${currentRoom}`,
      'اتبعي المسار الموضح في الممر الرئيسي',
      'انعطفي عند نقطة التوجيه التالية',
      `الوصول إلى: ${destinationRoom}`,
    ],
    [currentRoom, destinationRoom]
  );

  const handleStartNavigation = () => {
    setNavigationStarted(true);
    setArrived(false);

    /*
      REAL UNITY AR LAUNCH - COMMENTED FOR DEMO SAFETY

      The real AR module is integrated, but it may crash on the emulator because
      the emulator architecture may not support the Unity ARM64 AR module.

      Later, when testing on a supported Android ARCore device, uncomment this:

      import { NativeModules } from 'react-native';

      NativeModules.UnityModule.openUnity(destinationRoom);

      Or if your native method name is different:

      NativeModules.UnityModule.startUnity(destinationRoom);
      NativeModules.UnityModule.openAR(destinationRoom);
    */

    Alert.alert(
      'تم تشغيل التوجيه',
      `تم اختيار الوجهة: ${destinationRoom}\n\nسيتم عرض مسار تجريبي آمن للعرض.`
    );
  };

  const handleArrived = () => {
    setArrived(true);
    Alert.alert('تم الوصول', `لقد وصلتِ إلى ${destinationRoom}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="UniWay" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>AR Navigation</Text>
          <Text style={styles.subtitle}>
            التوجيه إلى الوجهة المختارة داخل المبنى
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>الموقع الحالي</Text>
          <Text style={styles.roomText}>{currentRoom}</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>الوجهة</Text>
          <Text style={styles.destinationText}>{destinationRoom}</Text>
        </View>

        <View style={styles.mapCard}>
          <Text style={styles.sectionTitle}>معاينة المسار</Text>

          <View style={styles.routePreview}>
            <View style={styles.pointStart}>
              <Text style={styles.pointText}>Start</Text>
            </View>

            <View style={styles.routeLine}>
              <View style={styles.routeDot} />
              <View style={styles.routeDot} />
              <View style={styles.routeDot} />
            </View>

            <View style={styles.pointEnd}>
              <Text style={styles.pointText}>Room</Text>
            </View>
          </View>

          <Text style={styles.previewNote}>
            هذه معاينة آمنة للمسار أثناء الاختبار على المحاكي. سيتم استخدام Unity AR
            عند التشغيل على بيئة Android مناسبة.
          </Text>
        </View>

        <View style={styles.stepsCard}>
          <Text style={styles.sectionTitle}>خطوات التوجيه</Text>

          {routeSteps.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {navigationStarted && !arrived && (
          <View style={styles.statusBox}>
            <Text style={styles.statusTitle}>التوجيه قيد التشغيل</Text>
            <Text style={styles.statusText}>
              اتبعي المسار حتى الوصول إلى {destinationRoom}
            </Text>
          </View>
        )}

        {arrived && (
          <View style={styles.arrivedBox}>
            <Text style={styles.arrivedTitle}>تم الوصول بنجاح</Text>
            <Text style={styles.arrivedText}>
              وصلتِ إلى {destinationRoom}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleStartNavigation}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>
            {navigationStarted ? 'إعادة تشغيل التوجيه' : 'Start Navigation'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleArrived}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryButtonText}>Simulate Arrival</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.backButtonText}>رجوع</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ARNavigationScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  titleBox: {
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: COLORS.gray,
    lineHeight: 22,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 6,
  },
  roomText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  destinationText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 14,
  },
  mapCard: {
    backgroundColor: COLORS.accent,
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.secondary,
    marginBottom: 14,
  },
  routePreview: {
    height: 150,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pointStart: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointEnd: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  routeLine: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.primary,
    marginHorizontal: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  previewNote: {
    marginTop: 12,
    fontSize: 13,
    color: COLORS.secondary,
    lineHeight: 20,
  },
  stepsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumber: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.dark,
    lineHeight: 21,
  },
  statusBox: {
    backgroundColor: '#fff7ed',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 6,
  },
  statusText: {
    fontSize: 14,
    color: COLORS.dark,
    lineHeight: 20,
  },
  arrivedBox: {
    backgroundColor: '#ecfdf5',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#99f6e4',
  },
  arrivedTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.success,
    marginBottom: 6,
  },
  arrivedText: {
    fontSize: 14,
    color: COLORS.dark,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  backButton: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  backButtonText: {
    color: COLORS.secondary,
    fontSize: 15,
    fontWeight: '700',
  },
});