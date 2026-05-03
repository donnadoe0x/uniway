import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Header from '../../components/layout/Header';
import BottomNav from '../../components/layout/BottomNav';
import { colors } from '../../constants/theme';

const ARNavigationScreen = ({ navigation, route }: any) => {
  const room = route?.params?.room || 'قاعة غير محددة';
  const description = route?.params?.description || 'سيتم عرض تفاصيل الموقع هنا';

  return (
    <View style={styles.container}>
      <Header title="UniWay" />

      <View style={styles.content}>
        <View style={styles.destinationCard}>
          <Text style={styles.smallLabel}>الوجهة الحالية</Text>
          <Text style={styles.roomText}>{room}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        <View style={styles.navigationPanel}>
          <Text style={styles.panelTitle}>منطقة الواقع المعزز</Text>

          <View style={styles.compassCircle}>
            <Text style={styles.compassText}>N</Text>
          </View>

          <Text style={styles.panelText}>
            سيتم عرض الأسهم والمسار داخل هذه المنطقة عند ربط خاصية الواقع المعزز لاحقًا
          </Text>
        </View>

        <TouchableOpacity
          style={styles.endButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.endButtonText}>إنهاء الملاحة</Text>
        </TouchableOpacity>
      </View>

      <BottomNav navigation={navigation} />
    </View>
  );
};

export default ARNavigationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  destinationCard: {
    backgroundColor: colors.navy,
    borderRadius: 22,
    padding: 20,
    marginTop: 20,
    marginBottom: 18,
    elevation: 8,
  },
  smallLabel: {
    color: colors.cream,
    fontSize: 13,
    textAlign: 'right',
    opacity: 0.85,
  },
  roomText: {
    color: colors.cream,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 6,
  },
  description: {
    color: colors.cream,
    fontSize: 14,
    textAlign: 'right',
    marginTop: 8,
    lineHeight: 22,
  },
  navigationPanel: {
    flex: 1,
    backgroundColor: colors.cream,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1.5,
    borderColor: colors.navy,
    marginBottom: 20,
  },
  panelTitle: {
    color: colors.navy,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  compassCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 3,
    borderColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  compassText: {
    color: colors.red,
    fontSize: 28,
    fontWeight: 'bold',
  },
  panelText: {
    color: colors.navy,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  endButton: {
    backgroundColor: colors.red,
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 5,
  },
  endButtonText: {
    color: colors.cream,
    fontSize: 16,
    fontWeight: 'bold',
  },
});