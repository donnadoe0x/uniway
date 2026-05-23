import { NativeModules, Platform } from 'react-native';

const { UnityModule } = NativeModules;

export function openUnityNavigation(startRoom: string, destinationRoom: string) {
  if (Platform.OS !== 'android') {
    console.warn('Unity AR is currently integrated for Android only.');
    return;
  }

  if (!UnityModule) {
    console.warn('UnityModule is not available. Rebuild the Android app.');
    return;
  }

  UnityModule.openUnity(startRoom, destinationRoom);
}