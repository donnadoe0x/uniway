import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }: { title: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
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