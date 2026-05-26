import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Header from '../../components/layout/Header';
import BottomNav from '../../components/layout/BottomNav';
import CustomInput from '../../components/ui/CustomInput';
import { fetchBookmarks, BookmarkRoom } from '../../services/api/bookmarksApi';

const BookmarksScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState<string>('');
  const [rooms, setRooms] = useState<BookmarkRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadBookmarks = async (): Promise<void> => {
    try {
      setLoading(true);
      const savedRooms = await fetchBookmarks();
      setRooms(savedRooms);
    } catch (error) {
      Alert.alert('خطأ', 'تعذر تحميل القاعات المحفوظة من الخادم');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [])
  );

  const handleRoomPress = (room: BookmarkRoom): void => {
    navigation.navigate('ARNavigation', {
      room: room.name,
      description: room.description,
    });
  };

  const handleDelete = (): void => {
    Alert.alert(
      'غير متاح حاليًا',
      'لا يوجد مسار حذف في الباكند حاليًا. نحتاج DELETE endpoint لحذف القاعات من المفضلة.'
    );
  };

  const filteredRooms = rooms.filter((room) =>
    `${room.name} ${room.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: BookmarkRoom }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => handleRoomPress(item)}
    >
      <TouchableOpacity
        style={styles.deleteContainer}
        onPress={handleDelete}
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

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#700003" />
          <Text style={styles.loadingText}>جارٍ تحميل القاعات المحفوظة...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredRooms}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>لا توجد قاعات محفوظة</Text>
          }
        />
      )}

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
    paddingBottom: 120,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 120,
  },
  loadingText: {
    marginTop: 12,
    color: '#700003',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#700003',
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,

    flexDirection: 'row',
    alignItems: 'flex-start',
    direction: 'ltr',

    elevation: 12,

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
    lineHeight: 24,
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