import React from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';

const Header = ({ title }: any) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.sideSpace} />

        <Text style={styles.title}>{title}</Text>

        <View style={styles.sideSpace} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    paddingTop:
      Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 18 : 35,
    paddingBottom: 18,
    marginBottom: 18,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },

  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },

  title: {
    color: '#1d1d1d',
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  sideSpace: {
    width: 40,
  },
});