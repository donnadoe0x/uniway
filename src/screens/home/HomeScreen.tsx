import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Header from '../../components/layout/Header';
import BottomNav from '../../components/layout/BottomNav';
import HomeLogo from '../../assets/images/UniWay_colored.svg';

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      <View>
        <Header title="UniWay" />
      </View>

      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <HomeLogo width={135} height={135} />
        </View>

        <Text style={styles.welcomeText}>أهلاً بكِ في UniWay</Text>

        <Text style={styles.subtitle}>
          اختاري طريقة تحديد موقعك داخل المبنى
        </Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.primaryButtonText}>كتابة اسم القاعة</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Capture')}
          >
            <Text style={styles.secondaryButtonText}>تصوير لوحة القاعة</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  headerWrapper: {
    marginTop: 18,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingBottom: 130,
    backgroundColor: '#ffffff',
  },

  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcomeText: {
    fontSize: 29,
    fontWeight: '800',
    color: '#1d1d1d',
    textAlign: 'center',
    marginBottom: 10,
    writingDirection: 'rtl',
  },

  subtitle: {
    fontSize: 17,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 25,
    writingDirection: 'rtl',
  },

  buttonsContainer: {
    width: '100%',
    gap: 18,
  },

  primaryButton: {
    width: '100%',
    backgroundColor: '#700003',
    paddingVertical: 17,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 5,
  },

  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  secondaryButton: {
    width: '100%',
    backgroundColor: '#700003',
    paddingVertical: 17,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 4,
  },

  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});