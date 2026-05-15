import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

// استيراد الصور
import Bookmark from '../../assets/images/Bookmark.svg';
import Home from '../../assets/images/Home.svg';
import List from '../../assets/images/List.svg';

const BottomNav = ({ navigation }: any) => {
  return (
    <View style={styles.container}>

      {/* المفضلة */}
      <TouchableOpacity onPress={() => navigation.navigate('Bookmarks')}>
        <Bookmark width={26} height={26} />
      </TouchableOpacity>

      {/* الرئيسية */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Home width={26} height={26} />
      </TouchableOpacity>

      {/* المعلومات */}
      <TouchableOpacity onPress={() => navigation.navigate('informationPage')}>
        <List width={26} height={26} />
      </TouchableOpacity>

    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});