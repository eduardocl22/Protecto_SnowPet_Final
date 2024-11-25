import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, TextInput, Dimensions, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const GpsScreen = ({ navigation }) => {
  const [isReportVisible, setIsReportVisible] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [animalType, setAnimalType] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [reportLocation, setReportLocation] = useState(null);
  const [animalName, setAnimalName] = useState('');
  const [animalColor, setAnimalColor] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const screenHeight = Dimensions.get('window').height;
  const translateY = useSharedValue(screenHeight);

  const handleMapPress = (e) => {
    const { coordinate } = e.nativeEvent;
    Alert.alert(
      'Reportar Mascota',
      '¿Desea reportar una mascota perdida en la zona seleccionada?',
      [
        { text: 'No', onPress: () => {} },
        {
          text: 'Sí',
          onPress: () => {
            setReportLocation(coordinate);
            setIsReportVisible(true);
            translateY.value = withTiming(0, {
              duration: 800,
              easing: Easing.inOut(Easing.ease),
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleConfirmReport = () => {
    setIsReportVisible(false);
    setIsDetailsVisible(false);
    translateY.value = withTiming(screenHeight, {
      duration: 400,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const closeReport = () => {
    setIsReportVisible(false);
    setIsDetailsVisible(false);
    setReportLocation(null);
  };

  const showDetailsForm = () => {
    setIsDetailsVisible(true);
  };

  const handleAnimalTypeSelect = (type) => {
    setAnimalType(type);
  };

  const handleBackToReport = () => {
    setIsDetailsVisible(false);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleMarkerPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -17.7833,
          longitude: -63.1821,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onPress={handleMapPress}
      >
        {reportLocation && (
          <Marker coordinate={reportLocation} onPress={handleMarkerPress}>
            <Icon name="pets" size={30} color="#000" />
          </Marker>
        )}
      </MapView>

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={25} color="#fff" />
          <Text style={styles.searchText}>¿Buscas alguna mascota?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => navigation.navigate('Anuncio')}
        >
          <Icon name="announcement" size={25} color="#fff" />
          <Text style={styles.bottomButtonText}>Anuncio</Text>
        </TouchableOpacity>

        {/* Botón de cámara añadido entre Anuncio y Consejos */}
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {}}
        >
          <Icon name="camera-alt" size={25} color="#fff" />
          <Text style={styles.bottomButtonText}>Cámara</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => navigation.navigate('Consejos')}
        >
          <Icon name="pets" size={25} color="#fff" />
          <Text style={styles.bottomButtonText}>Consejos</Text>
        </TouchableOpacity>
      </View>

      {isReportVisible && !isDetailsVisible && (
        <Animated.View style={[styles.reportContainer, animatedStyle]}>
          <Text style={styles.title}>Seleccione un tipo de reporte</Text>
          <TouchableOpacity style={styles.button} onPress={showDetailsForm}>
            <Text style={styles.buttonText}>PERDÍ MI MASCOTA</Text>
          </TouchableOpacity>
          <Text style={styles.subtitle}>Encontré una mascota en la calle:</Text>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>LA TENGO EN CUSTODIA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>SOLO LA VI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={closeReport}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {isDetailsVisible && (
        <Animated.View style={[styles.detailsContainer, animatedStyle]}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToReport}>
            <Icon name="arrow-back" size={25} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Detalles de la mascota perdida</Text>
          <View style={styles.animalTypeContainer}>
            <TouchableOpacity
              style={[styles.animalTypeButton, animalType === 'gato' && styles.selectedButton]}
              onPress={() => handleAnimalTypeSelect('gato')}
            >
              <Icon name="pets" size={25} color={animalType === 'gato' ? '#fff' : '#000'} />
              <Text style={styles.buttonText}>Gato</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.animalTypeButton, animalType === 'perro' && styles.selectedButton]}
              onPress={() => handleAnimalTypeSelect('perro')}
            >
              <Icon name="pets" size={25} color={animalType === 'perro' ? '#fff' : '#000'} />
              <Text style={styles.buttonText}>Perro</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedSize}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedSize(itemValue)}
            >
              <Picker.Item label="Tamaño" value="" />
              <Picker.Item label="Pequeño" value="pequeño" />
              <Picker.Item label="Mediano" value="mediano" />
              <Picker.Item label="Grande" value="grande" />
            </Picker>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={animalName}
            onChangeText={setAnimalName}
          />
          <TextInput
            style={styles.input}
            placeholder="Color"
            value={animalColor}
            onChangeText={setAnimalColor}
          />
          <TextInput
            style={styles.input}
            placeholder="Otros detalles"
            value={otherDetails}
            onChangeText={setOtherDetails}
          />
          <TouchableOpacity style={styles.reportButton} onPress={handleConfirmReport}>
            <Text style={styles.reportButtonText}>Reportar Mascota Perdida</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {animalName && <Text style={styles.modalText}>Nombre: {animalName}</Text>}
            {animalType && <Text style={styles.modalText}>Tipo: {animalType}</Text>}
            {animalColor && <Text style={styles.modalText}>Color: {animalColor}</Text>}
            {otherDetails && <Text style={styles.modalText}>Detalles: {otherDetails}</Text>}
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/*Ícono de GPS*/}
      <TouchableOpacity style={styles.gpsButton}>
        <Icon name="my-location" size={30} color="#fff" />
      </TouchableOpacity>
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
  topBar: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  searchButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  searchText: {
    color: '#fff',
    marginLeft: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#007bff',
    padding: 10,
  },
  bottomButton: {
    alignItems: 'center',
  },
  bottomButtonText: {
    color: '#fff',
    marginTop: 5,
  },
  reportContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  animalTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  animalTypeButton: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#6200EE',
  },
  pickerContainer: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  reportButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  reportButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  
  //Estilos de GPS
  gpsButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GpsScreen;
