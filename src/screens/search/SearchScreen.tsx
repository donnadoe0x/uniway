import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

import Header from '../../components/layout/Header';
import BottomNav from '../../components/layout/BottomNav';
import { addBookmark } from '../../services/api/bookmarksApi';

const BASE_URL = 'https://rayouf0-uniway-backend-core.hf.space';
const REQUEST_TIMEOUT = 30000;

type ClassroomResult = {
  roomId: string;
  className: string;
  buildingId: string;
  floorNum: string;
  description: string;
};

const SearchScreen = ({ navigation, route }: any) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<ClassroomResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingRoomId, setSavingRoomId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const currentRoom =
    route?.params?.currentRoom ||
    route?.params?.detectedRoom ||
    'موقعك الحالي';

  const currentRoomId =
    route?.params?.currentRoomId ||
    route?.params?.roomId ||
    '';

  const requestWithTimeout = async (url: string): Promise<Response> => {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT);

    try {
      return await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const normalizeClassroom = (item: any): ClassroomResult => {
    const roomId = String(item.roomId || item.classId || item.id || '');
    const className = String(item.className || item.classname || roomId);

    return {
      roomId,
      className,
      buildingId: String(item.buildingId || 'غير محدد'),
      floorNum: String(item.floorNum || 'غير محدد'),
      description: String(item.description || 'لا يوجد وصف متاح.'),
    };
  };

  const searchClassrooms = async (text: string) => {
    setSearch(text);
    setErrorMessage('');

    const cleanText = text.trim();

    if (cleanText.length === 0) {
      setResults([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const encodedQuery = encodeURIComponent(cleanText);
      const response = await requestWithTimeout(
        `${BASE_URL}/classrooms/search?query=${encodedQuery}`
      );

      const data = await response.json();

      console.log('Search API Result:', data);

      if (!response.ok) {
        throw new Error(data?.detail || 'Search request failed');
      }

      const backendResults = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
          ? data.data
          : [];

      const normalizedResults = backendResults.map(normalizeClassroom);

      setResults(normalizedResults);
    } catch (error) {
      console.log('Search Error:', error);
      setResults([]);
      setErrorMessage('تعذر الاتصال بالخادم أو لم يتم العثور على نتائج.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectClassroom = (item: ClassroomResult) => {
    const destinationName = item.className || item.roomId;

    navigation.navigate('ARNavigation', {
      currentRoom,
      currentRoomId,

      room: destinationName,
      destinationRoom: destinationName,
      selectedRoom: destinationName,

      roomId: item.roomId,
      className: item.className,
      buildingId: item.buildingId,
      floorNum: item.floorNum,
      description: item.description,
    });
  };

  const handleSaveBookmark = async (item: ClassroomResult) => {
    if (!item.roomId) {
      Alert.alert(
        'لا يمكن الحفظ',
        'لا يوجد رقم قاعة صحيح لحفظ هذه القاعة.'
      );
      return;
    }

    try {
      setSavingRoomId(item.roomId);

      await addBookmark(item.roomId);

      Alert.alert(
        'تم الحفظ',
        `تمت إضافة ${item.className || item.roomId} إلى القاعات المحفوظة.`
      );
    } catch (error) {
      console.log('Save bookmark from search error:', error);

      Alert.alert(
        'تعذر الحفظ',
        'لم نتمكن من حفظ القاعة. تأكدي من الاتصال أو حاولي مرة أخرى.'
      );
    } finally {
      setSavingRoomId(null);
    }
  };

  const clearSearch = () => {
    setSearch('');
    setResults([]);
    setErrorMessage('');
    setLoading(false);
  };

  const renderItem = ({ item }: { item: ClassroomResult }) => {
    const isSaving = savingRoomId === item.roomId;

    return (
      <View style={styles.item}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => handleSelectClassroom(item)}
        >
          <Text style={styles.itemTitle}>
            {item.className || item.roomId}
          </Text>

          <Text style={styles.itemSubtitle}>
            رقم القاعة: {item.roomId}
          </Text>

          <Text style={styles.itemDetails}>
            مبنى {item.buildingId} - الدور {item.floorNum}
          </Text>

          <Text style={styles.itemDescription}>
            {item.description}
          </Text>
        </TouchableOpacity>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.navigateButton}
            activeOpacity={0.85}
            onPress={() => handleSelectClassroom(item)}
          >
            <Text style={styles.navigateButtonText}>بدء</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.85}
            onPress={() => handleSaveBookmark(item)}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color="#700003" />
            ) : (
              <Text style={styles.saveButtonText}>حفظ</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="uniWay" navigation={navigation} />

      <View style={styles.container}>
        <View style={styles.topSection} />

        <View style={styles.searchCard}>
          <View style={styles.searchBar}>
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

            <TouchableOpacity onPress={clearSearch}>
              <Text style={styles.icon}>✕</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#700003" />
              <Text style={styles.loadingText}>جارٍ البحث...</Text>
            </View>
          ) : (
            <FlatList
              data={results}
              keyExtractor={(item, index) =>
                `${item.roomId || item.className}-${index}`
              }
              renderItem={renderItem}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.resultsContent}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    {errorMessage
                      ? errorMessage
                      : search.trim()
                        ? 'لا توجد نتائج مطابقة'
                        : 'اكتبي رقم أو اسم القاعة للبحث'}
                  </Text>
                </View>
              }
            />
          )}
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
    backgroundColor: '#04324A',
    alignItems: 'center',
  },

  topSection: {
    width: '100%',
    height: 180,
    backgroundColor: '#04324A',
  },

  searchCard: {
    width: '88%',
    maxHeight: '78%',
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
    color: '#1d1d1d',
  },

  resultsContent: {
    paddingBottom: 20,
  },

  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginTop: 10,
    color: '#700003',
    fontSize: 14,
    fontWeight: '600',
  },

  item: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  itemTitle: {
    fontSize: 22,
    textAlign: 'right',
    color: '#700003',
    fontWeight: '800',
    writingDirection: 'rtl',
  },

  itemSubtitle: {
    textAlign: 'right',
    color: '#333',
    marginTop: 5,
    fontSize: 14,
    writingDirection: 'rtl',
  },

  itemDetails: {
    textAlign: 'right',
    color: '#666',
    marginTop: 5,
    fontSize: 14,
    writingDirection: 'rtl',
  },

  itemDescription: {
    textAlign: 'right',
    color: '#777',
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
    writingDirection: 'rtl',
  },

  actionsRow: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 10,
  },

  navigateButton: {
    flex: 1,
    backgroundColor: '#700003',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },

  navigateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },

  saveButton: {
    flex: 1,
    backgroundColor: '#FBEFD5',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ead8ad',
  },

  saveButtonText: {
    color: '#700003',
    fontSize: 14,
    fontWeight: '800',
  },

  emptyContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  emptyText: {
    color: '#777',
    fontSize: 15,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
});