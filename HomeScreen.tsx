import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Header from '../../components/layout/Header';
import BottomNav from '../../components/layout/BottomNav';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1 }}>

      {/* الهيدر */}
      <Header title="uniWay" />

      {/* المحتوى */}
      <View style={styles.container}>
        
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>اهلا في uniWay</Text>
          <Text style={styles.subtitle}>
            اختر طريقة تحديد القاعة
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          
          {/* ✅ تم التعديل هنا */}
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.buttonText}>✍️ كتابة اسم القاعة</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Capture')}
          >
            <Text style={styles.buttonText}>📸 تصوير لوحة القاعة</Text>
          </TouchableOpacity>

        </View>

      </View>

      {/* البوتوم */}
      <BottomNav navigation={navigation} />

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  buttonsContainer: {
    gap: 18,
  },
  button: {
    backgroundColor: '#8B0000',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
});