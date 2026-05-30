import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://rayouf0-uniway-backend-core.hf.space';
const DEVICE_ID_KEY = 'UNIWAY_DEVICE_ID';
const REQUEST_TIMEOUT = 10000;

export type BookmarkRoom = {
  id: string;
  roomId: string;
  name: string;
  className: string;
  buildingId: string;
  floorNum: string;
  description: string;
};

const getDeviceId = async (): Promise<string> => {
  try {
    const savedId = await AsyncStorage.getItem(DEVICE_ID_KEY);

    if (savedId) {
      return savedId;
    }

    const newId = `device_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    await AsyncStorage.setItem(DEVICE_ID_KEY, newId);

    return newId;
  } catch (error) {
    console.log('Device ID error:', error);
    return `device_${Date.now()}`;
  }
};

const requestWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout: number = REQUEST_TIMEOUT
): Promise<Response> => {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
};

export const fetchBookmarks = async (): Promise<BookmarkRoom[]> => {
  const deviceId = await getDeviceId();

  const response = await requestWithTimeout(`${BASE_URL}/bookmarks/my`, {
    method: 'GET',
    headers: {
      'x-device-id': deviceId,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.log('Fetch bookmarks failed:', response.status, errorText);
    throw new Error('Failed to fetch bookmarks');
  }

  const result = await response.json();
  const data = Array.isArray(result.data) ? result.data : [];

  return data.map((item: any) => {
    const roomId = String(
      item.roomId ||
        item.classId ||
        item.bookmarkDocId ||
        'unknown-room'
    );

    const className = String(
      item.className ||
        item.classname ||
        item.name ||
        roomId
    );

    return {
      id: String(item.bookmarkDocId || roomId),
      roomId,
      name: className,
      className,
      buildingId: String(item.buildingId || 'Not Specified'),
      floorNum: String(item.floorNum || 'Not Specified'),
      description: String(
        item.description ||
          `المبنى: ${item.buildingId || 'غير محدد'} - الدور: ${
            item.floorNum || 'غير محدد'
          }`
      ),
    };
  });
};

export const addBookmark = async (roomId: string): Promise<void> => {
  const deviceId = await getDeviceId();

  const response = await requestWithTimeout(`${BASE_URL}/bookmarks/add`, {
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
    const errorText = await response.text();
    console.log('Add bookmark failed:', response.status, errorText);
    throw new Error('Failed to add bookmark');
  }
};