import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  NativeModules,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type ARNavigationScreenProps = {
  route?: {
    params?: {
      startRoom?: string;
      detectedRoom?: string;
      destinationRoom?: string;
      selectedRoom?: string;
      room?: string;
    };
  };
  navigation?: any;
};

const { UnityModule } = NativeModules;

const ARNavigationScreen = ({ route, navigation }: ARNavigationScreenProps) => {
  const [status, setStatus] = useState('Preparing AR navigation...');

  const startRoom = useMemo(() => {
    return (
      route?.params?.startRoom ||
      route?.params?.detectedRoom ||
      'room D 101'
    );
  }, [route?.params]);

  const destinationRoom = useMemo(() => {
    return (
      route?.params?.destinationRoom ||
      route?.params?.selectedRoom ||
      route?.params?.room ||
      'room D 101'
    );
  }, [route?.params]);

  const openUnityAR = () => {
    if (Platform.OS !== 'android') {
      setStatus('Unity AR is currently integrated for Android only.');
      Alert.alert(
        'Android only',
        'Unity AR integration is currently available on Android only.',
      );
      return;
    }

    if (!UnityModule) {
      setStatus('UnityModule is not available. Rebuild the Android app.');
      Alert.alert(
        'UnityModule not found',
        'Make sure the Android native Unity module is added, then rebuild the app.',
      );
      return;
    }

    try {
      setStatus(`Opening AR route from ${startRoom} to ${destinationRoom}...`);
      UnityModule.openUnity(startRoom, destinationRoom);
    } catch (error) {
      console.log('Failed to open Unity:', error);
      setStatus('Failed to open Unity AR.');
      Alert.alert('Error', 'Failed to open Unity AR scene.');
    }
  };

  useEffect(() => {
    openUnityAR();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>AR Navigation</Text>

        <Text style={styles.label}>Starting point</Text>
        <Text style={styles.value}>{startRoom}</Text>

        <Text style={styles.label}>Destination</Text>
        <Text style={styles.value}>{destinationRoom}</Text>

        <Text style={styles.status}>{status}</Text>

        <TouchableOpacity style={styles.button} onPress={openUnityAR}>
          <Text style={styles.buttonText}>Open AR Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation?.goBack?.()}
        >
          <Text style={styles.secondaryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ARNavigationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#04324A',
    marginBottom: 24,
    textAlign: 'center',
  },

  label: {
    fontSize: 14,
    color: '#777',
    marginTop: 10,
  },

  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1d1d1d',
    marginTop: 4,
  },

  status: {
    fontSize: 14,
    color: '#04324A',
    marginTop: 24,
    textAlign: 'center',
    lineHeight: 20,
  },

  button: {
    backgroundColor: '#700003',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 24,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  secondaryButton: {
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#04324A',
  },

  secondaryButtonText: {
    color: '#04324A',
    fontSize: 16,
    fontWeight: '600',
  },
});