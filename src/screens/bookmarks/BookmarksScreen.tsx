import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../components/layout/Header';
import BottomNav from '../../components/layout/BottomNav';
import CustomInput from '../../components/ui/CustomInput';

const STORAGE_KEY = 'BOOKMARKED_ROOMS';

type Room = {
  id: string;
  name: string;
  description: string;
};

const defaultRooms: Room[] = [
  {
    id: '1',
    name: 'قاعة 101',
    description: 'الدور الأول، بجانب المدخل الرئيسي',
  },
  {
    id: '2',
    name: 'قاعة 202',
    description: 'الدور الثاني، بجانب معمل الحاسب',
  },
  {
    id: '3',
    name: 'معمل A-12',
    description: 'الدور الأرضي، نهاية الممر الأيسر',
  },
];

const BookmarksScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState<string>('');
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    I18nManager.forceRTL(true);
    loadBookmarks();
  }, []);

  const loadBookmarks = async (): Promise<void> => {
    try {
      const savedRooms = await AsyncStorage.getItem(STORAGE_KEY);

      if (savedRooms) {
        const parsedRooms: Room[] = JSON.parse(savedRooms);

        if (parsedRooms.length === 0) {
          setRooms(defaultRooms);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRooms));
        } else {
          setRooms(parsedRooms);
        }
      } else {
        setRooms(defaultRooms);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRooms));
      }
    } catch (error) {
      console.log('Error loading bookmarks:', error);
      setRooms(defaultRooms);
    }
  };

  const saveBookmarks = async (updatedRooms: Room[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRooms));
    } catch (error) {
      console.log('Error saving bookmarks:', error);
    }
  };

  const deleteRoom = async (id: string): Promise<void> => {
    const updatedRooms = rooms.filter((room) => room.id !== id);
    setRooms(updatedRooms);
    await saveBookmarks(updatedRooms);
  };

  const handleRoomPress = (room: Room): void => {
    navigation.navigate('ARNavigation', {
      room: room.name,
      description: room.description,
    });
  };

  const filteredRooms = rooms.filter((room) =>
    `${room.name} ${room.description}`.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: Room }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => handleRoomPress(item)}
    >
      <TouchableOpacity
        style={styles.deleteContainer}
        onPress={() => deleteRoom(item.id)}
      >
        <Text style={styles.delete}>حذف</Text>
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.roomTitle}>{item.name}</Text>
        <Text style={styles.roomDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="القاعات المحفوظة" />

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <CustomInput
            placeholder="ابحث عن القاعات..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>لا توجد قاعات محفوظة</Text>
        }
      />

      <BottomNav navigation={navigation} />
    </View>
  );
};

export default BookmarksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  searchContainer: {
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
    
  },
  searchBox: {
    backgroundColor: '#EAEAEA',
    borderRadius: 100,
    paddingHorizontal: 4,
    paddingVertical: 2,
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
card: {
  backgroundColor: '#700003',
  padding: 16,
  borderRadius: 20,
  marginBottom: 20,

  // layout
  flexDirection: 'row',
  alignItems: 'flex-start',
  direction: 'ltr',

  // 🔥 REAL shadow (Android)
  elevation: 12,

  // 🔥 extra depth (iOS)
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.25,
  shadowRadius: 6,
},
  deleteContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: 12,
    paddingTop: 2,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  roomTitle: {
    color: '#f3f1f5',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  roomDescription: {
    color: '#f3f1f5',
    fontSize: 18,
    lineHeight: 18,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  delete: {
    color: '#f3f1f5',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
  },
  emptyText: {
    color: '#4B4B4B',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
  },
});