import React from 'react';
import { View, Text, Button } from 'react-native';

const SearchScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>Search Screen</Text>

      <Button
        title="Start AR Navigation"
        onPress={() => navigation.navigate('ARNavigation')}
      />
    </View>
  );
};

export default SearchScreen;
