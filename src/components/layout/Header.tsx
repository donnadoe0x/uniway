import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';

const Header = ({ title }: any) => {
  return (
    <View style={styles.wrapper}>

      {/* Status Bar */}
      <View style={styles.statusBar} />

      {/* Header */}
      <View style={styles.container}>

        {/* فراغ بدل أيقونة المنيو */}
        <View style={styles.sideSpace} />

        <Text style={styles.title}>{title}</Text>

        <View style={styles.sideSpace} />

      </View>

      {/* الخط السفلي */}
      <View style={styles.bottomLine} />

    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
  },

  statusBar: {
    height: Platform.OS === 'android'
      ? StatusBar.currentHeight
      : 0,
    backgroundColor: '#ffffff',
  },

  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },

  title: {
    color: '#111111',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },

  sideSpace: {
    width: 40,
  },

  bottomLine: {
    height: 1,
    backgroundColor: '#d9d9d9',
  },
});