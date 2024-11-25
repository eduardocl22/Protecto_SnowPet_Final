import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { db, collection, addDoc } from '../database/firebase'; // Asegúrate de que la ruta sea correcta

function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [registrado, setRegistrado] = useState(false); 
  const [errores, setErrores] = useState({ nombre: false, correo: false, contrasena: false });
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Atras</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleRegister = async () => {
    const nuevoErrores = {
      nombre: nombre === '',
      correo: correo === '',
      contrasena: contrasena === ''
    };
    
    setErrores(nuevoErrores);

    const camposValidos = !Object.values(nuevoErrores).includes(true);

    if (camposValidos) {
      try {
        await addDoc(collection(db, "usuarios"), {
          nombre: nombre,
          correo: correo,
          contraseña: contrasena
        });
        console.log("registro exitoso");
        setRegistrado(true);
        setTimeout(() => {
          setRegistrado(false);
          navigation.replace('LoginScreen'); // Redirige a LoginScreen
        }, 2000);
      } catch (error) {
        console.error("Error al agregar registro: ", error);
      }
    }
  };

  const fieldRef = useRef(null);

  const handleShakeAnimation = () => {
    fieldRef.current?.bounce(800);
  };

  return (
    <Animatable.View animation="fadeIn" duration={500} style={styles.container}>
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => {}}>
          <Image source={require('../assets/camera.png')} style={styles.image} resizeMode="contain" />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nombre</Text>
          <Animatable.View
            animation={errores.nombre ? 'shake' : ''}
            ref={fieldRef}
          >
            <TextInput
              style={[styles.input, errores.nombre && styles.inputError]}
              placeholder=""
              value={nombre}
              onChangeText={(text) => {
                setNombre(text);
                setErrores((prevState) => ({ ...prevState, nombre: false }));
              }}
            />
          </Animatable.View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Correo Electronico</Text>
          <Animatable.View
            animation={errores.correo ? 'shake' : ''}
            ref={fieldRef}
          >
            <TextInput
              style={[styles.input, errores.correo && styles.inputError]}
              placeholder=""
              value={correo}
              onChangeText={(text) => {
                setCorreo(text);
                setErrores((prevState) => ({ ...prevState, correo: false }));
              }}
            />
          </Animatable.View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Contraseña</Text>
          <Animatable.View
            animation={errores.contrasena ? 'shake' : ''}
            ref={fieldRef}
          >
            <TextInput
              style={[styles.input, errores.contrasena && styles.inputError]}
              placeholder=""
              secureTextEntry
              value={contrasena}
              onChangeText={(text) => {
                setContrasena(text);
                setErrores((prevState) => ({ ...prevState, contrasena: false }));
              }}
            />
          </Animatable.View>
        </View>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
      {registrado && (
        <Animatable.View animation="bounceIn" duration={1500} style={styles.registeredContainer}>
          <Text style={styles.registeredText}>¡Registro Exitoso!</Text>
        </Animatable.View>
      )}
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ADD8E6',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  inputLabel: {
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1.5,
    paddingHorizontal: 10,
    borderRadius: 10, // Agrega bordes redondeados
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
    backgroundColor: 'white',
    marginBottom: 20,
  },
  image: {
    width: '80%',
    height: '70%',
    resizeMode: 'contain',
  },
  registerButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 10,
    borderRadius: 10, // Agrega bordes redondeados
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  registeredContainer: {
    position: 'absolute',
    top: '50%', // Centrado verticalmente
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding:10,
    borderRadius: 5,
  },
  
  registeredText: {
    color: 'white',  
    fontSize: 18,
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
    fontSize: 17,
    color: 'black',
  },
});

export default Registro;
