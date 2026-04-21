import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

import BottomNav from '../../components/layout/BottomNav';
import { detectClassroom } from '../../services/ml/ocrService';

const CaptureScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);

  const takePhoto = async () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.7,
      },
      async (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          console.log(response.errorMessage);
          return;
        }

        try {
          setLoading(true);

          const imageUri = response.assets?.[0]?.uri;

if (!imageUri) {
  console.log('No image selected');
  return;
}

const result = await detectClassroom(imageUri);

          navigation.navigate('Confirm', {
            detectedRoom: result.detectedText,
          });

        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        {loading ? (
          <ActivityIndicator size="large" color="#00E5FF" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Open Camera</Text>
          </TouchableOpacity>
        )}
      </View>

      <BottomNav navigation={navigation} />
    </View>
  );
};

export default CaptureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F1A',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00E5FF',
    padding: 15,
    borderRadius: 10,
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
  },
});