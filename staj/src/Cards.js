import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export default function Cards({ name, image, navigation }) {
  return (
    <TouchableOpacity 
      style={{ marginHorizontal: 10 }} 
      onPress={() => navigation.navigate('Details', { cityName: name })} // 'cityName' parametresi burada geçiliyor
    >
      <ImageBackground
        source={image}
        style={{ height: deviceHeight / 5, width: deviceWidth / 2 - 50 }}
        imageStyle={{ borderRadius: 16 }}
      />
      <View style={{ position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 28,
            width: '100%',
            height: '100%',
            textAlign: 'center',
            textAlignVertical: 'center',
            color: 'white',
          }}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
