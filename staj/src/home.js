import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { deviceHeight, deviceWidth } from './Dimensions';
import Cards from './Cards';

export default function Home(props) {
  const [city, setCity] = useState('');

  const cities = [
    { name: 'İstanbul', image: require('../assets/images/istanbul.jpg') },
    { name: 'Ankara', image: require('../assets/images/ankara.jpg') },
    { name: 'New York', image: require('../assets/images/image4.jpg') },
    { name: 'Londra', image: require('../assets/images/image5.jpg') },
    { name: 'San Francisco', image: require('../assets/images/image6.jpg') },
    { name: 'New Jersey', image: require('../assets/images/image7.jpg') },
  
  ];

  return (
    <View>
      <ImageBackground
        source={require('../assets/images/bg.png')}
        style={{ height: deviceHeight, width: deviceWidth }}
        imageStyle={{ opacity: 0.6, backgroundColor: 'black' }}
      />
      <View
        style={{
          position: 'absolute',
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: deviceWidth - 20,
          }}>
          {/* <Icon name="menu" size={46} color="white" /> */}
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 100 }}>
          <Text style={{ fontSize: 40, color: 'white' }}>Hava Durumu</Text>
          <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
            Şehri ismine göre arayın
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 50,
              borderWidth: 1,
              borderColor: 'white',
              marginTop: 16,
              paddingHorizontal: 10,
            }}>
            <TextInput
              value={city}
              onChangeText={val => setCity(val)}
              placeholder="Hangi Şehir"
              placeholderTextColor="white"
              style={{ paddingHorizontal: 10, color: 'white', fontSize: 16 }}
            />
            <TouchableOpacity onPress={() => props.navigation.navigate('Details', { cityName: city })}>
              <Icon name="search" size={22} color="white" />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: 'white',
              fontSize: 25,
              paddingHorizontal: 10,
              marginTop: 220,
              marginBottom: 20,
            }}>
            Konumum
          </Text>
          <FlatList
            horizontal
            data={cities}
            renderItem={({ item }) => (
              <Cards name={item.name} image={item.image} navigation={props.navigation} />
            )}
          />
        </View>
      </View>
    </View>
  );
}
