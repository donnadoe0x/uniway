import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>UniWay Home</Text>

      <Button
        title="Capture Location"
        onPress={() => navigation.navigate('Capture')}
      />

      <Button
        title="Search Classroom"
        onPress={() => navigation.navigate('Search')}
      />

      <Button
        title="Bookmarks"
        onPress={() => navigation.navigate('Bookmarks')}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
});