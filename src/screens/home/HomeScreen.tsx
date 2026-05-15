import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';

import Header from '../../components/layout/Header';
import BottomNav from '../../components/layout/BottomNav';

// ✅ استيراد اللوقو فقط
import HomeLogo from '../../assets/images/UniWay_colored.svg';

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#1a1a1a" barStyle="light-content" />

      <Header title="uniWay" navigation={navigation} />

      <View style={styles.container}>

        {/* ✅ اللوقو */}
        <View style={styles.logoContainer}>
          <HomeLogo width={120} height={120} />
        </View>

        {/* النصوص */}
        <Text style={styles.welcomeText}>اهلا في uniWay</Text>
        <Text style={styles.subtitle}>اختر طريقة تحديد القاعة</Text>

        {/* الأزرار */}
        <View style={styles.buttonsContainer}>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.buttonText}>كتابة اسم القاعة</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Capture')}
          >
            <Text style={styles.buttonText}>تصوير لوحة القاعة</Text>
          </TouchableOpacity>

        </View>

      </View>

      {/* ✅ البوتوم ناف */}
      <BottomNav
        navigation={navigation}
        route={{ name: 'Home' }}
      />

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#ffffff',
  },

  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },

  welcomeText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },

  buttonsContainer: {
    width: '100%',
    gap: 18,
  },

  button: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B0000',
    paddingVertical: 16,
    borderRadius: 25,
    gap: 10,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});