import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import * as Location from 'expo-location';


import api from './src/services/api';

import Day from './src/components/Day';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons'; 

import dayBG from './assets/day-sun.jpg';
import nightBG from './assets/clear_night.jpg';

export default function App() {

  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [themeDark, setThemeDark] = useState(false);

  const [latitude, setLatitude] = useState('');
  const [longitude,setLongitude] = useState('');

  async function getPosition() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permita o acesso a localização!');
    }else{
      let {coords} = await Location.getCurrentPositionAsync({});
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
    }  
  }

  async function loadWeather() {
    getPosition();
    const response = await api.get(`https://api.hgbrasil.com/weather?array_limit=7&fields=only_results,currently,date,temp,humidity,wind_speedy,sunrise,sunset,city,forecast,max,min,weekday,condition&key=4ca2a62c&lat=${latitude}&lon=${longitude}`);
    setWeather(response.data);
    setForecast(response.data.forecast);
    console.log(response.data);
  }

  useEffect(() => {
    loadWeather();
  },[]);
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    column: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonThemeDark: {
      position: 'absolute',
      top: 50,
      left: 15,
      alignItems: 'flex-start',
      padding: 2,
    },
    temperatura: {
      fontSize: 80,
      color: weather.currently === 'dia' ? '#008a83' : '#f5f5dc',
    },
    reload: {
      position: 'absolute',
      right: -100,
      top: -100,
    },
    city: {
      marginBottom: -15,
      fontSize: 20,
      fontWeight: 'bold',
      color: weather.currently === 'dia' ? '#0c2c2b6b' : '#faebd7',
    },
    semanal: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      marginTop: 60, 
      backgroundColor: weather.currently === 'dia' ? '#0c2c2b6b' : '#a28b9680', 
      width: 500,
      height: 200,
      
      marginRight: 150,
      paddingRight: 28,
      paddingTop: 18,

      elevation: 75,
    },
    scroll: {
      marginLeft: 50,
    },
    columnItemDay: {
      marginHorizontal: 3,
      alignItems: 'center',
      justifyContent: 'center',

      width: 70,
      height: 100,
      padding: 5,
      borderRadius: 10,
      backgroundColor: weather.currently === 'dia' ? '#02504c6b' : '#ffffff6b',
      shadowOffset: {
        width: 10,
        height: 15,
      },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 100,
    },
    imageBG: {
      width: '100%',
      height: '100%',
    }
  });

  return (
    <>
    <StatusBar translucent={true} />
    <ImageBackground 
      source={weather.currently === 'dia' ? dayBG : nightBG} 
      resizeMode='cover' 
      style={styles.imageBG}
    >
      <View style={styles.container}>        

        <Text style={{marginTop: -40, fontWeight: 'bold', fontSize: 40, color: weather.currently === 'dia' ? '#008a83' : '#faebd7' }}>Hoje</Text>
        <Text style={{fontSize: 15, color: weather.currently === 'dia' ? '#0c2c2b6b' : '#faebd7' }}>{weather.date}</Text>


        <Text style={styles.city}>{weather.city}</Text>
        <View style={styles.row}> 
          <Text style={styles.temperatura}>{weather.temp}</Text>
          <MaterialCommunityIcons name="temperature-celsius" size={28} color={weather.currently === 'dia' ? '#008a83' : '#faebd7'} />
          <TouchableOpacity  style={styles.reload} onPress={() => loadWeather()}>
            <EvilIcons name="refresh" size={36} color={weather.currently === 'dia' ? '#262626' : '#faebd7'} />
          </TouchableOpacity>
        </View> 
        
        <View style={[styles.row, {marginTop: 10}]}>
          <View style={styles.columnItemDay}>
            <Text style={{color: weather.currently === 'dia' ? '#f5f5f5' : '#ffe7db'}} >{weather.sunrise}</Text>
            <MaterialCommunityIcons name="weather-sunset-up" size={35} color={weather.currently === 'dia' ? 'yellow' : '#003357'} />
          </View>
          <View style={styles.columnItemDay}>
            <Text style={{color: weather.currently === 'dia' ? '#f5f5f5' : '#ffe7db'}}>{weather.humidity}%</Text>
            <MaterialCommunityIcons name="water-outline" size={35} color={weather.currently === 'dia' ? 'blue' : '#003357'} />
          </View>
          <View style={styles.columnItemDay}>
            <Text style={{color: weather.currently === 'dia' ? '#f5f5f5' : '#ffe7db'}}>{weather.wind_speedy}</Text>
            <MaterialCommunityIcons name="weather-windy" size={35} color={weather.currently === 'dia' ? '#f5f5f5' : '#003357'} />
          </View>
          <View style={styles.columnItemDay}>
            <Text style={{color: weather.currently === 'dia' ? '#f5f5f5' : '#ffe7db'}}>{weather.sunset}</Text>
            <MaterialCommunityIcons name="weather-sunset-down" size={35} color={weather.currently === 'dia' ? 'orange' : '#003357'} />
          </View>
        </View>
        
        <View style={styles.semanal}>
          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            style={styles.scroll} 
            // scrollEventThrottle={200}
            // decelerationRate="fast"
          >
            {forecast.map(day => (
              <Day 
                key={day.weekday}
                dateDay={day.date}
                condition={day.condition} 
                tempMax={day.max} 
                tempMin={day.min} 
                theme={weather.currently} >{day.weekday}</Day>
            ))}
            
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
    </>
  );

  
}
