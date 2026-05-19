import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Header from '../../components/layout/Header';
import BottomNav from '../../components/layout/BottomNav';

const screenColors = {
  background: '#f7f7f7',
  navy: '#04324A',
  red: '#700003',
  cream: '#FBEFD5',
  dark: '#1d1d1d',
  white: '#ffffff',
};

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
    backgroundColor: screenColors.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  destinationCard: {
    backgroundColor: screenColors.navy,
    borderRadius: 22,
    padding: 20,
    marginTop: 20,
    marginBottom: 18,

    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },

  smallLabel: {
    color: screenColors.cream,
    fontSize: 14,
    textAlign: 'right',
    opacity: 0.9,
    writingDirection: 'rtl',
  },

  roomText: {
    color: screenColors.cream,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 6,
    writingDirection: 'rtl',
  },

  description: {
    color: screenColors.cream,
    fontSize: 14,
    textAlign: 'right',
    marginTop: 8,
    lineHeight: 22,
    writingDirection: 'rtl',
  },

  navigationPanel: {
    flex: 1,
    backgroundColor: screenColors.cream,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginBottom: 20,

    borderWidth: 1,
    borderColor: '#e4dac5',

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  panelTitle: {
    color: screenColors.navy,
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
  },

  compassCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 3,
    borderColor: screenColors.red,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  compassText: {
    color: screenColors.red,
    fontSize: 28,
    fontWeight: 'bold',
  },

  panelText: {
    color: screenColors.navy,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
    writingDirection: 'rtl',
  },

  endButton: {
    backgroundColor: screenColors.red,
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
  },

  endButtonText: {
    color: screenColors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});