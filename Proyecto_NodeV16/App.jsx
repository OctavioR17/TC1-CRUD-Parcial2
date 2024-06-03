 import React, { useEffect, useState } from 'react';
 import { Button } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Home from './src/components/Home';
import InitScreen from './src/screens/InitScreen';
import LogIn from './src/screens/LogIn';
import LogUp from './src/screens/LogUp';
import CreateContact from './src/screens/CreateContact';
import ContactPerfil from './src/screens/ContactPerfil';
import UpdateContact from './src/screens/UpdateContact';
import styles from './src/styles/homeStyles';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator ();

function AuthStack(){
  return (
    <Stack.Navigator>

      <Stack.Screen name="InitScreen" component={InitScreen} 
          options={{
                title: '', headerStyle: { backgroundColor: '#f65141',},headerTintColor: '#fff'}}/>

        <Stack.Screen name="LogIn" component={LogIn} 
          options={{
                title: 'Iniciar Sesion', headerStyle: { backgroundColor: '#f65141',},headerTintColor: '#fff'}}/>

        <Stack.Screen name="LogUp" component={LogUp} 
          options={{
                title: 'Registro', headerStyle: { backgroundColor: '#f65141',},headerTintColor: '#fff'}}/>

        <Stack.Screen name="Home" component={Home} 
          options={{
                title: 'Mis Contactos', headerStyle: { backgroundColor: '#f65141',},headerTintColor: '#fff', }}/>

        <Stack.Screen name="CreateContact" component={CreateContact} 
          options={{
                title: 'Crear Contacto', headerStyle: { backgroundColor: '#f65141',},headerTintColor: '#fff', }}/>

        <Stack.Screen name="ContactPerfil" component={ContactPerfil}
          options={{
                title: 'Perfil', headerStyle: { backgroundColor: '#f65141',},headerTintColor: '#fff', }}/>

        <Stack.Screen name="UpdateContact" component={UpdateContact}
          options={{
                title: 'Actualizar', headerStyle: { backgroundColor: '#f65141',},headerTintColor: '#fff', }}/>

    </Stack.Navigator>
  );
}

function AppStack () {
  return (
    <Stack.Navigator > 

        <Stack.Screen name="Home" component={Home} 
          options={{
                title: 'Mis Contactos', headerStyle: { backgroundColor: '#f65141',},headerTintColor: '#fff', }}/>

        <Stack.Screen name="CreateContact" component={CreateContact} 
          options={{
                title: 'Crear Contacto', headerStyle: { backgroundColor: '#f65141',},headerTintColor: '#fff', }}/>

        <Stack.Screen name="ContactPerfil" component={ContactPerfil}
          options={{
                title: 'Perfil', headerStyle: { backgroundColor: '#f65141',},headerTintColor: '#fff', }}/>

        <Stack.Screen name="UpdateContact" component={UpdateContact}
          options={{
                title: 'Actualizar', headerStyle: { backgroundColor: '#f65141',},headerTintColor: '#fff', }}/>

        <Stack.Screen name="InitScreen" component={InitScreen} 
          options={{
                title: '', headerStyle: { backgroundColor: '#f65141',},headerTintColor: '#fff'}}/>


        <Stack.Screen name="LogIn" component={LogIn} 
          options={{
                title: 'Iniciar Sesion', headerStyle: { backgroundColor: '#f65141',},headerTintColor: '#fff'}}/>
                
        <Stack.Screen name="LogUp" component={LogUp} 
          options={{
                title: 'Registro', headerStyle: { backgroundColor: '#f65141',},headerTintColor: '#fff'}}/>
      </Stack.Navigator>
  );
}

function App () {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data, 'en App.jsx');
    setIsLoggedIn(data);
  }

  useEffect(() => {
    getData();
  },[isLoggedIn]);

  return (
      <PaperProvider style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#f65141" />
      <NavigationContainer>
        {isLoggedIn ? <AppStack/> : <AuthStack/>}
      </NavigationContainer>
      </PaperProvider>
  );
}

export default App;