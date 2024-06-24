import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Pressable, Text} from 'react-native';

export default function HomeScreen({navigation}) {
  const [city, setCity] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [placeholder, setPlaceholder] = useState('Enter city name');

  const searchCity = () => {
    if (!city) {
      setPlaceholder('Please enter a city name first!');
      return;
    }
    navigation.navigate('Weather', {city});
    clearInput();
  };

  const handleFocus = () => {
    setPlaceholder('Enter city name');
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const clearInput = () => {
    setCity('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          value={city}
          onChangeText={setCity}
          placeholderTextColor="grey"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {city ? (
          <Pressable onPress={clearInput} style={styles.clearIcon}>
            <Text style={styles.clearText}>×</Text>
          </Pressable>
        ) : null}
      </View>
      <Pressable
        style={styles.searchButton}
        title="Search"
        onPress={searchCity}>
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 16,
    backgroundColor: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 3,
    borderRadius: 15,
    marginBottom: 12,
    padding: 10,
  },
  searchInput: {
    color: 'white',
  },
  clearIcon: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 100,
    height: 30,
    width: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(237, 231, 225, 0.15)',
  },
  clearText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchButton: {
    width: 100,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
