import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

function Mascota() {
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [registrado, setRegistrado] = useState(false);
  const [errores, setErrores] = useState({ nombre: false, raza: false, edad: false });
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Inicio</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleRegister = () => {
    const nuevoErrores = {
      nombre: nombre === '',
      raza: raza === '',
      edad: edad === ''
    };

    setErrores(nuevoErrores);

    const camposValidos = !Object.values(nuevoErrores).includes(true);

    if (camposValidos) {
      setRegistrado(true);
      setTimeout(() => {
        setRegistrado(false);
      }, 2000);
    }
  };

  return (
    <Animatable.View animation="fadeIn" duration={500} style={styles.container}>
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => {}}>
          <Text style={styles.imagePlaceholder}>Ingresar Imagen</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, errores.nombre && styles.inputError]}
          placeholder="Nombre"
          value={nombre}
          onChangeText={(text) => {
            setNombre(text);
            setErrores((prevState) => ({ ...prevState, nombre: false }));
          }}
        />
        <TextInput
          style={[styles.input, errores.raza && styles.inputError]}
          placeholder="Raza"
          value={raza}
          onChangeText={(text) => {
            setRaza(text);
            setErrores((prevState) => ({ ...prevState, raza: false }));
          }}
        />
        <TextInput
          style={[styles.input, errores.edad && styles.inputError]}
          placeholder="Edad"
          value={edad}
          onChangeText={(text) => {
            setEdad(text);
            setErrores((prevState) => ({ ...prevState, edad: false }));
          }}
        />
        <TouchableOpacity style={[styles.registerButton, { width: '100%' }]} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
      {registrado && (
        <View style={styles.registeredContainer}>
          <Text style={styles.registeredText}>Registrado</Text>
        </View>
      )}
      <View style={styles.buttonContainerWrapper}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Usuario')}>
            <Text style={styles.optionText}>Usuario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Mascota')}>
            <Text style={styles.optionText}>Mascota</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Anuncio')}>
            <Text style={styles.optionText}>Anuncio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Consejos')}>
            <Text style={styles.optionText}>Consejos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  imageContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
    backgroundColor: 'lightgray',
    marginBottom: 20,
  },
  imagePlaceholder: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: 'green',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  registeredContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2 - 40,
    left: Dimensions.get('window').width / 2 - 75,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  registeredText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainerWrapper: {
    width: '100%',
    backgroundColor: 'rgba(204, 204, 204, 0.5)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  optionButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    borderRadius: 10,
    marginLeft: 10,
  },
  headerButtonText: {
    fontSize: 18,
    color: 'blue',
  },
});

export default Mascota;

