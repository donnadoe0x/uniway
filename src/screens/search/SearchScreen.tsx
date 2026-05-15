import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Header from '../../components/layout/Header';
import BottomNav from '../../components/layout/BottomNav';

const classrooms = [
  'قاعة ج 205',
  'قاعة د 101',
  'قاعة د 210',
];

const SearchScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>

      <Header title="uniWay" navigation={navigation} />

      <View style={styles.container}>

        {/* الخلفية الزرقاء */}
        <View style={styles.topSection} />

        {/* كرت البحث */}
        <View style={styles.searchCard}>

          {/* شريط البحث */}
          <View style={styles.searchBar}>

            {/* زر الرجوع */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.icon}>←</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="ابحث عن القاعة"
              placeholderTextColor="#777"
              style={styles.input}
              value={search}
              onChangeText={setSearch}
            />

            {/* زر حذف النص */}
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={styles.icon}>✕</Text>
            </TouchableOpacity>

          </View>

          {/* النتائج */}
          <FlatList
            data={classrooms}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('ARNavigation')}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />

        </View>

      </View>

      <BottomNav navigation={navigation} />

    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    backgroundColor: '#003B5C',
    alignItems: 'center',
  },

  topSection: {
    width: '100%',
    height: 180,
    backgroundColor: '#003B5C',
  },

  searchCard: {
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginTop: -40,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  input: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
    color: '#000',
  },

  icon: {
    fontSize: 20,
    color: '#444',
    marginHorizontal: 8,
  },

  item: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },

  itemText: {
    fontSize: 22,
    textAlign: 'right',
    color: '#222',
    fontWeight: '500',
  },
});