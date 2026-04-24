import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import Header from '../../components/layout/Header';

const ConfirmScreen = ({ navigation, route }: any) => {
  const detectedRoom = route?.params?.detectedRoom || 'قاعة غير محددة';

  useEffect(() => {
    Alert.alert(
      'تم تحديد الموقع',
      `الموقع الحالي: ${detectedRoom}`,
      [
        {
          text: 'إلغاء',
          style: 'cancel',
          onPress: () => navigation.goBack(), // 🔥 go back to capture
        },
        {
          text: 'تأكيد',
          onPress: () =>
            navigation.navigate('ARNavigation', {
              room: detectedRoom,
            }),
        },
      ],
      { cancelable: false }
    );
  }, []);

  return (
    <View style={styles.container}>
      <Header title="UniWay" />
    </View>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
});