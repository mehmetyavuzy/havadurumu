import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { deviceHeight, deviceWidth } from './Dimensions';
import { API_KEY } from './Constants';

export default function Details(props) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const { cityName } = props.route.params; // Şehir adını al

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const encodedCityName = encodeURIComponent(cityName);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodedCityName}&appid=${API_KEY}&units=metric`);
        const result = await response.json();
        
        if (response.ok && result.cod === 200) {
          setData(result);
          setError('');
        } else {
          setError(result.message || 'hatalı sorgu');
          setData(null);
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching data');
      }
    };

    fetchWeatherData();
  }, [cityName]);

  const Data = ({ title, value }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{ color: 'gray', fontSize: 22 }}>{title}</Text>
      <Text style={{ color: 'white', fontSize: 22 }}>{value}</Text>
    </View>
  );

  return (
    <View>
      <ImageBackground
        source={require('../assets/images/image1.jpg')}
        style={{ height: deviceHeight, width: deviceWidth }}
        imageStyle={{ opacity: 0.6, backgroundColor: 'black' }}
      />
      <View style={{ position: 'absolute', paddingVertical: 20, paddingHorizontal: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: deviceWidth - 20 }}>
          <Icon name="menu" size={46} color="white" />
          {/* <Image source={require('../assets/images/user.jpg')} style={{ height: 46, width: 46, borderRadius: 50 }} /> */}
        </View>

        {error ? (
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{error}</Text>
        ) : data ? (
          <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', height: deviceHeight - 100 }}>
            <View>
              <Text style={{ color: 'white', fontSize: 40 }}>{cityName}</Text>
              <Text style={{ fontSize: 25, color: 'white', textAlign: 'center' }}>{data.weather[0].main}</Text>
            </View>
            <Text style={{ color: 'white', fontSize: 64 }}>{data.main.temp.toFixed(2)}&deg; C</Text>
            <View>
              <Text style={{ color: 'white', fontSize: 22, marginBottom: 16 }}>Hava Durumu Detayları</Text>
              <View style={{ width: deviceWidth - 60 }}>
                <Data value={data.wind.speed} title="Rüzgâr" />
                <Data value={data.main.pressure} title="Basınç" />
                <Data value={`${data.main.humidity}%`} title="Nem" />
                <Data value={data.visibility} title="Görüş Mesafesi" />
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
}
