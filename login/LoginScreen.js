import React from 'react';
  import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, StatusBar, ScrollView } from 'react-native';
  import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
  import Mascota from './mascota';
  import Anuncio from './anuncio';
  import Consejos from './consejos';
  import Usuario from './usuario';
  import GpsScreen from './gps'; 
  import * as Animatable from 'react-native-animatable';
  import Icon from 'react-native-vector-icons/MaterialIcons';

  const Stack = createStackNavigator();

  const statusBarHeight = StatusBar.currentHeight || 0;

  function HomeScreen({ navigation }) {
    return (
      <Animatable.View animation="slideInRight" duration={500} style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>SNOWPET</Text>
          <TouchableOpacity style={styles.userButton} onPress={() => navigation.navigate('Usuario')}>
            <Icon name="person-add" size={20} color="#fff" />
            <Text style={styles.optionText}>Usuario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={() => console.log("Cerrar sesión")}>
            <Icon name="exit-to-app" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <ImageBackground
          source={require('../assets/1.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover">
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.contentContainer}>
              <Text style={[styles.welcomeMessage, styles.moveDown]}>
                ¡Te damos la bienvenida a SNOWPET, una aplicación de ayuda a los animales a regresar a sus hogares y reencontrarse con sus dueños!
              </Text>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.optionButton, styles.transparentButton]} onPress={() => navigation.navigate('Anuncio')}>
              <Icon name="announcement" size={20} color="#fff" />
              <Text style={styles.optionText}>Anuncio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.gpsButton, styles.transparentButton]} onPress={() => navigation.navigate('GPS')}>
              <Icon name="gps-fixed" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionButton, styles.transparentButton]} onPress={() => navigation.navigate('Consejos')}>
              <Icon name="pets" size={20} color="#fff" />
              <Text style={styles.optionText}>Consejos</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Animatable.View>
    );
  }

  const LoginScreen = () => (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Usuario" component={Usuario} />
      <Stack.Screen name="Mascota" component={Mascota} />
      <Stack.Screen name="Anuncio" component={Anuncio} />
      <Stack.Screen name="Consejos" component={Consejos} />
      <Stack.Screen name="GPS" component={GpsScreen} />
    </Stack.Navigator>
  );

  export default LoginScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: statusBarHeight,
      backgroundColor: 'transparent',
    },
    titleContainer: {
      paddingTop: 20,
      paddingBottom: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 2,
      borderBottomColor: '#ccc',
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    titleText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcomeMessage: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#555',
      textAlign: 'center',
      marginHorizontal: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      padding: 10,
      borderRadius: 10,
    },
    moveDown: {
      marginTop: 280, // Ajusta según sea necesario
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: 'rgba(204, 204, 204, 0.5)',
    },
    optionButton: {
      flex: 1,
      flexDirection: 'row',
      marginHorizontal: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 50,
      backgroundColor: '#007bff',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    },
    gpsButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#007bff',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
      marginHorizontal: 5,
    },
    optionText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
      marginLeft: 5,
    },
    userButton: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      backgroundColor: '#007bff',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
      marginLeft: 90,
    },
    logoutButton: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      backgroundColor: '#007bff',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    },
    transparentButton: {
      backgroundColor: '#007bff',
    },
  });    
