import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Header from '../../components/layout/Header';
import BottomNav from '../../components/layout/BottomNav';
import CustomInput from '../../components/ui/CustomInput';

const BookmarksScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState('');

  // 🔥 MOCK DATA (later comes from API)
  const [rooms, setRooms] = useState([
    { id: '1', name: 'Room 101' },
    { id: '2', name: 'Room 202' },
    { id: '3', name: 'Lab A-12' },
  ]);

  // ✅ Delete function
  const deleteRoom = (id: string) => {
    setRooms((prev) => prev.filter((room) => room.id !== id));
  };

  // 🔍 Filter rooms
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.roomText}>{item.name}</Text>

      <TouchableOpacity onPress={() => deleteRoom(item.id)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Bookmarks" />

      {/* 🔍 Search */}
      <View style={styles.searchContainer}>
        <CustomInput
          placeholder="Search bookmarked rooms..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* 📋 Rooms List */}
      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* 🔻 Bottom Nav */}
      <BottomNav navigation={navigation} />
    </View>
  );
};

export default BookmarksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F1A',
  },
  searchContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#1A1F2E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roomText: {
    color: '#fff',
    fontSize: 16,
  },
  delete: {
    color: '#FF5252',
    fontWeight: 'bold',
  },
});