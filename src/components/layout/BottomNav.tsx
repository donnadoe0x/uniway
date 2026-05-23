import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

import Bookmark from '../../assets/images/Bookmark.svg';
import BookmarkR from '../../assets/images/BookmarkR.svg';

import Home from '../../assets/images/Home.svg';
import HomeR from '../../assets/images/HomeR.svg';

import List from '../../assets/images/List.svg';
import ListR from '../../assets/images/ListR.svg';

import { colors } from '../../constants/theme';

const BottomNav = ({ navigation }: any) => {
  const route = useRoute();

  const isActive = (screen: string) => route.name === screen;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Bookmarks */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Bookmarks')}
        >
          {isActive('Bookmarks') ? (
            <BookmarkR width={40} height={40} />
          ) : (
            <Bookmark width={40} height={40} />
          )}
        </TouchableOpacity>

        {/* Home */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Home')}
        >
          {isActive('Home') ? (
            <HomeR width={40} height={40} />
          ) : (
            <Home width={40} height={40} />
          )}
        </TouchableOpacity>

        {/* Info */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Info')}
        >
          {isActive('Info') ? (
            <ListR width={40} height={40} />
          ) : (
            <List width={40} height={40} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
container: {
  height: 74,
  backgroundColor: '#ffffff',
  borderRadius: 24,
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',

  borderWidth: 1,
  borderColor: '#eeeeee',

  elevation: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.18,
  shadowRadius: 12,
},
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});