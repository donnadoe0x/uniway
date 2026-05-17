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
    paddingTop: 50,
    paddingBottom: 25,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',


    // 🔥 shadow (fixed)
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6, // must be between 0–1
    shadowRadius: 4,
    elevation: 12,

    
    marginBottom: 12,
  },

  title: {
    color: '#1d1d1d',
    fontSize: 32,
    fontWeight: 'bold',
  },
});