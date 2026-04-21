import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Header from '../../components/layout/Header';

const ARNavigationScreen = ({ route }: any) => {
  const room = route?.params?.room || 'Unknown';

  return (
    <View style={styles.container}>
      <Header title="AR Navigation" />

      <View style={styles.content}>
        <Text style={styles.text}>
          Navigating to:
        </Text>

        <Text style={styles.room}>
          {room}
        </Text>

        <Text style={styles.note}>
          (AR directions will appear here later)
        </Text>
      </View>
    </View>
  );
};

export default ARNavigationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F1A',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#FFFFFF',
    fontSize: 18,
  },

  room: {
    color: '#00E5FF',
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  note: {
    color: '#8892B0',
    fontSize: 14,
  },
});