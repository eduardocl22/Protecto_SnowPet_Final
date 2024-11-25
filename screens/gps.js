import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const GpsScreen = () => {
  const santaCruzLat = -17.7833;
  const santaCruzLong = -63.1821;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: santaCruzLat,
          longitude: santaCruzLong,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        <Marker
          coordinate={{ latitude: santaCruzLat, longitude: santaCruzLong }}
          title="Santa Cruz, Bolivia"
          description="Ciudad maravillosa en América del Sur"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default GpsScreen;
