import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://rayouf0-uniway-backend-core.hf.space';
const DEVICE_ID_KEY = 'UNIWAY_DEVICE_ID';

export type BackendBookmark = {
  id?: string;
  roomId?: string;
  room_id?: string;
  name?: string;
  roomName?: string;
  classroomName?: string;
  description?: string;
  location?: string;
};

export type BookmarkRoom = {
  id: string;
  name: string;
  description: string;
};

export const getDeviceId = async (): Promise<string> => {
  const savedId = await AsyncStorage.getItem(DEVICE_ID_KEY);

  if (savedId) {
    return savedId;
  }

  const newId = `device_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  await AsyncStorage.setItem(DEVICE_ID_KEY, newId);

  return newId;
};

const normalizeBookmark = (item: BackendBookmark): BookmarkRoom => {
  const id =
    item.roomId ||
    item.room_id ||
    item.id ||
    item.name ||
    item.roomName ||
    item.classroomName ||
    'unknown-room';

  const name =
    item.name ||
    item.roomName ||
    item.classroomName ||
    item.roomId ||
    item.room_id ||
    id;

  const description =
    item.description ||
    item.location ||
    'موقع محفوظ في المفضلة';

  return {
    id: String(id),
    name: String(name),
    description: String(description),
  };
};

export const fetchBookmarks = async (): Promise<BookmarkRoom[]> => {
  const deviceId = await getDeviceId();

  const response = await fetch(`${BASE_URL}/bookmarks/my`, {
    method: 'GET',
    headers: {
      'x-device-id': deviceId,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch bookmarks');
  }

  const data = await response.json();

  const list =
    Array.isArray(data)
      ? data
      : Array.isArray(data.bookmarks)
      ? data.bookmarks
      : Array.isArray(data.data)
      ? data.data
      : [];

  return list.map(normalizeBookmark);
};

export const addBookmark = async (roomId: string): Promise<void> => {
  const deviceId = await getDeviceId();

  const response = await fetch(`${BASE_URL}/bookmarks/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-device-id': deviceId,
    },
    body: JSON.stringify({
      roomId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to add bookmark');
  }
};