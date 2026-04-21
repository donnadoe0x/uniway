import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

const CustomButton: React.FC<Props> = ({ title, onPress, loading }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00E5FF',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});