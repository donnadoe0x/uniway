import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import Header from '../../components/layout/Header';
import { addBookmark } from '../../services/api/bookmarksApi';

const ConfirmScreen = ({ navigation, route }: any) => {
  const detectedRoom = route?.params?.detectedRoom || 'قاعة غير محددة';

  const saveDetectedRoom = async () => {
    try {
      await addBookmark(detectedRoom);

      Alert.alert(
        'تم الحفظ',
        'تمت إضافة القاعة إلى المفضلة'
      );
    } catch (error) {
      Alert.alert(
        'خطأ',
        'تعذر حفظ القاعة في المفضلة'
      );
    }
  };

  useEffect(() => {
    Alert.alert(
      'تم تحديد الموقع',
      `الموقع الحالي: ${detectedRoom}`,
      [
        {
          text: 'إلغاء',
          style: 'cancel',
          onPress: () => navigation.goBack(),
        },
        {
          text: 'حفظ في المفضلة',
          onPress: saveDetectedRoom,
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