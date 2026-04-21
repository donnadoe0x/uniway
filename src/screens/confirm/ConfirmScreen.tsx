import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Header from '../../components/layout/Header';
import CustomButton from '../../components/ui/CustomButton';

const ConfirmScreen = ({ navigation, route }: any) => {
  
  const detectedRoom = route.params?.detectedRoom || 'Unknown';

  const handleConfirm = () => {
  navigation.navigate('ARNavigation', {
    room: detectedRoom,
  });
};

  return (
    <View style={styles.container}>
      {/* 🔷 Header */}
      <Header title="Confirmation" />

      {/* 🔲 Full Width Background Section */}
      <View style={styles.section}>
        {/* 📦 Popup Card */}
        <View style={styles.popup}>
          {/* Title */}
          <Text style={styles.title}>تم تحديد الموقع</Text>

          {/* Description */}
          <Text style={styles.description}>
            {detectedRoom}
          </Text>

          {/* Button */}
          <CustomButton
            title="Confirm"
            onPress={handleConfirm}
          />
        </View>
      </View>
    </View>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F1A',
  },

  // 🔲 Large horizontal section
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  // 📦 Popup card
  popup: {
    width: '100%',
    backgroundColor: '#1A1F2E',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',

    // Shadow (Android + iOS)
    elevation: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00E5FF',
    marginBottom: 12,
  },

  description: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
  },
});