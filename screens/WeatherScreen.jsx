import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image,
  Pressable,
} from 'react-native';

export default function WeatherScreen({route, navigation}) {
  const {city} = route.params;
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = '3e699a092a40ac34acd099e02314c7ff';
      setWeatherData(null);
      if (city === '') {
        return;
      }
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
        );
        if (!response.ok) {
          throw new Error('City not found');
        }
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
        setError(false);
      } catch (err) {
        setError(true);
        console.error(err.message);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>City not found. Please try again.</Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{weatherData?.name}</Text>
        <Text style={styles.text}>
          Temperature: {weatherData?.main?.temp}°C
        </Text>
        <Text style={styles.text}>
          Weather: {weatherData?.weather[0]?.description}
        </Text>
      </View>
      <View>
        <Image
          style={styles.icon}
          source={{
            uri: `http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}.png`,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'black',
  },
  errorContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 16,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontSize: 24,
    marginVertical: 8,
    color: 'white',
  },
  error: {
    fontSize: 18,
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 100,
    backgroundColor: 'rgba(237, 231, 225, 0.15)',
  },
});
