/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {enableLatestRenderer} from 'react-native-maps';
import MapView, {Marker} from 'react-native-maps';

import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';


request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
  console.log({result})
});

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

enableLatestRenderer().then(console.log);


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <View style={backgroundStyle}>
       <MapView
         initialRegion={{
           latitude: 37.78825,
           longitude: -122.4324,
           latitudeDelta: 0.0922,
           longitudeDelta: 0.0421,
         }}
        style={{flex: 1, backgroundColor: 'steelblue'}}
       >
       <Marker
             coordinate={{
           latitude: 37.78825,
           longitude: -122.4324,
         }}
             title={"Title"}
             description={"Description"}
           />
       </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
