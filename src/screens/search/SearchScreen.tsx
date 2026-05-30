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

const BASE_URL = 'https://rayouf0-uniway-backend-core.hf.space';

const SearchScreen = ({ navigation }: any) => {

  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);

  // البحث من الـ API
  const searchClassrooms = async (text: string) => {

    setSearch(text);

    // إذا فاضي امسح النتائج
    if (text.trim() === '') {
      setResults([]);
      return;
    }

    try {

      const response = await fetch(
        `${BASE_URL}/classrooms/search?query=${encodeURIComponent(text)}`
      );

      const data = await response.json();

      console.log('API RESULT:', data);

      // ✅ التعديل هنا (التأكد أنه Array)
      setResults(Array.isArray(data) ? data : data.data || []);

    } catch (error) {
      console.log('Search Error:', error);
    }
  };

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
              onChangeText={searchClassrooms}
            />

            {/* زر حذف النص */}
            <TouchableOpacity
              onPress={() => {
                setSearch('');
                setResults([]);
              }}
            >
              <Text style={styles.icon}>✕</Text>
            </TouchableOpacity>

          </View>

          {/* النتائج */}
          <FlatList
            data={results}
            keyExtractor={(item, index) => index.toString()}

            renderItem={({ item }) => (

              <TouchableOpacity
                style={styles.item}
                onPress={() =>
                  navigation.navigate('ARNavigation', {
                    room: item,
                  })
                }
              >
                {/* ✅ عرض رقم القاعة */}
                <Text style={styles.itemText}>
                  {item.roomId}
                </Text>

                {/* ✅ عرض التفاصيل */}
                <Text style={{
                  textAlign: 'right',
                  color: '#666',
                  marginTop: 5,
                  fontSize: 14
                }}>
                  {item.className} - مبنى {item.buildingId} - الدور {item.floorNum}
                </Text>

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

  icon: {
    fontSize: 22,
    color: '#555',
  },

  input: {
    flex: 1,
    fontSize: 18,
    textAlign: 'right',
    marginHorizontal: 10,
  },

  item: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  itemText: {
    fontSize: 22,
    textAlign: 'right',
    color: '#333',
  },

});