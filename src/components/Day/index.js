import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImagePropTypes } from 'react-native';

import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Day = (props) => {
  
  var icon = '';
  switch (props.condition) {
    case 'storm':
      icon = 'lightnings'
      break;
    case 'snow':
      icon = 'snowflake-4'
      break;
    case 'hail':
      icon = 'snow'
      break;
    case 'rain':
      icon = 'rain'
      break;
    case 'fog':
      icon = 'fog'
      break;
    case 'clear_day':
      icon = 'day-sunny'
      break;
    case 'clear_night':
      icon = 'night-clear'
      break;
    case 'cloud':
      icon = 'cloudy'
      break;
    case 'cloudly_day':
      icon = 'day-cloudy'
      break;
    case 'cloudly_night':
      icon = 'day-cloudy'
      break;
  
    default:
      icon = 'sun'
      break;
  }
  
  const styles = StyleSheet.create({
    cardSemanal: {
      backgroundColor: props.theme === 'dia' ? '#b0c4c1' : '#ffffff6b',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderRadius: 40,
      padding: 2,
      margin: 5,
      paddingTop: 10,
      paddingBottom: 10,
      width: 75,
      height: 150,

      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 2,
      borderWidth: 1,
      borderColor: props.theme === 'dia' ? '#008a83' : '#591236e8'

    },
    row: {
      flexDirection: 'row',
    },
    temp: {
      fontSize: 20,
    },
    colorText: {
      fontWeight:'bold',
      color: props.theme === 'dia' ? '#fff' : '#000',
    },
    iconTemp: {
      fontSize: 20,
    },
    weekday: {
      fontWeight: 'bold',
      color: props.theme === 'dia' ? '#234842' : '#073a4b',
    },
    date: {
      fontSize: 8,
      marginTop: -7,
      color: props.theme === 'dia' ? '#002922' : '#d10069e8',
    },
  });


  {/* dateDay , condition , tempMax , tempMin */}

  return (
    <>
    <View style={styles.cardSemanal}>
      <Text style={[styles.weekday]}>{props.children}</Text>
      <Text style={[styles.date]}>{props.dateDay}</Text>
      <View style={styles.row}>
        <Text style={[styles.colorText, styles.temp]}>{props.tempMax}</Text>
        <MaterialCommunityIcons name="temperature-celsius" size={16} color={props.theme === 'dia' ? '#ff6669' : '#000'}/>
      </View>

      <Fontisto
        name={icon} 
        style={styles.iconTemp} 
        size={24} 
        color={props.theme === 'dia' ? '#008a83' : '#003357'}/>
      
      <View style={styles.row}>
        <Text style={[styles.colorText, styles.temp]}>{props.tempMin}</Text>
        <MaterialCommunityIcons name="temperature-celsius" size={16} color={props.theme === 'dia' ? '#ff6669' : '#000'}/>
      </View>
    </View>
    </>
  ); 
}

export default Day;

