import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BottomNav = ({ navigation }: any) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => navigation.navigate('Bookmarks')}>
        <Text style={styles.text}>Bookmarks</Text>
      </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Capture')}>
        <Text style={styles.text}>info</Text>
      </TouchableOpacity>

    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#f7f7f7',
  },
  text: {
    color: '#1d1d1d',
    fontWeight: '600',
  },
});