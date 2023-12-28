/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';

import {
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {enableLatestRenderer, LatLng} from 'react-native-maps';
import MapView, {Marker} from 'react-native-maps';

import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

enableLatestRenderer().then(console.log);


check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
  .then((result) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log('This feature is not available (on this device / in this context)');
        break;
      case RESULTS.DENIED:
        console.log('The permission has not been requested / is denied but requestable');
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }
  })
  .catch((error) => {
    console.log({error})
  });



type PermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';

function App(): React.JSX.Element {
  const [locationStatus, setLocationStatus] = useState<PermissionStatus>('limited')
  const [myLatLng, setMyLatLng] = useState<LatLng>({
    latitude: 37.78825,
    longitude: -122.4324,
  })
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
      console.log({result})
      setLocationStatus(result)
    });
    Geolocation.setRNConfiguration(
      {
        skipPermissionRequests: false,
        enableBackgroundLocationUpdates: true,
        locationProvider: 'playServices' 
      }
    )
  }, [])

  useEffect(() => {
    if (locationStatus === 'granted') {
      Geolocation.getCurrentPosition(info => {
        console.log({info})
        setMyLatLng({longitude: info.coords.longitude, latitude: info.coords.latitude})
      },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true },
      );
    }
  }, [locationStatus])

  return (
    <View style={backgroundStyle}>
      <MapView
        region={{
          latitude: myLatLng.latitude,
          longitude: myLatLng.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        followsUserLocation
        style={{flex: 1, backgroundColor: 'steelblue'}}
      >
        <Marker
          coordinate={myLatLng}
          title={"Title"}
          description={"Description"}
        />
      </MapView>
    </View>
  );
}

export default App;
