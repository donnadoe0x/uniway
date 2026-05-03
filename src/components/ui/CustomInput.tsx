import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: any; // 🔥 allow external styling
}

const CustomInput: React.FC<Props> = ({
  placeholder,
  value,
  onChangeText,
  style,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, style]} // 🔥 merge styles
        textAlign="right" // RTL support
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  input: {
    backgroundColor: '#EAEAEA', // 🔥 light grey default
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    fontSize: 16,
  },
});