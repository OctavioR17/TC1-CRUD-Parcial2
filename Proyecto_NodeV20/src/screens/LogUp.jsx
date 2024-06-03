import { useState } from "react";
import { View, Image, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import stylesLogUp from '../styles/LogUpStyles';
import axios from 'axios';
import { NESTJS_API_REST_URL_USER } from '../api/constants';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

function LogUp ({props}) {

  const [user, setUser] = useState('');
  const [userVerify, setUserVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState('')
  const [repeatPasswordVerify, setRepeatPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  function handleSubmit(){

    if((userVerify === true) && (emailVerify === true) && (passwordVerify === true) && (repeatPasswordVerify === true)) {
        const userData = {
        user : user,
        email,
        password,
        };

        axios.post(NESTJS_API_REST_URL_USER+"/register",userData)
        .then(res => {console.log(res.data)

          if(res.data.status == "ok") {
            Alert.alert("Registro realizado correctamente")
            navigation.navigate('LogIn')
          } else {
            Alert.alert("Usuario ya existente")
          }
        })
        .catch(e => console.log(e))

    }else {
      Alert.alert('ERROR',"Hay campos que no cumplen con los requerimientos")
    }
    
  }

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setUser(nameVar);
    setUserVerify(false);

    if((nameVar.length >= 8)) {
      setUserVerify(true);

    }
  }

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    if(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)){
      setEmail(emailVar);
      setEmailVerify(true);
    }

  }

  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)){
      setPassword(passwordVar);
      setPasswordVerify(true);

    }
  }

  function handleRepeatPassword(e) {
    const passVar = e.nativeEvent.text;
    setRepeatPassword(passVar);
    setRepeatPasswordVerify(false);

    if(password === passVar) {
      setRepeatPassword(passVar);
      setRepeatPasswordVerify(true);
    }
  }


    return(
           
    <ScrollView contentContainerStyle={{flexGrow: 1}} 
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="always">
    <View style={stylesLogUp.container}>
      <View style={stylesLogUp.imgView}>
        <Image
          style={stylesLogUp.img}
          source={{uri : 'https://img.freepik.com/psd-gratis/icono-3d-aplicacion-redes-sociales_23-2150049569.jpg?t=st=1716851563~exp=1716855163~hmac=cf74e6f6b5a85bbed4918ff2ef9d9457ad070dc7b6067fb9f8eeabe1d833cba6&w=740'}}
        />
      </View>

      <TextInput
        label="Usuario"
        style={stylesLogUp.input}
        value={user}
        onChange={e => handleName(e)}
      />
      {user.length < 1 ? <Text style={{color : 'red'}}> El usuario no puede estar vacio</Text> : userVerify ? null : (
        <Text style={{color : 'red'}}>El usuario debe tener mas de 8 caracteres</Text> ) }

      <TextInput
        label="Email"
        style={stylesLogUp.input}
        value={email}
        onChange={e => handleEmail(e)}
      />
       {email.length < 1 ? <Text style={{color : 'red'}}> El email no puede estar vacio</Text> : emailVerify ? null : (
        <Text style={{color : 'red'}}>No es un email valido</Text> )}
      
      <View>
      <TextInput
        label="Contraseña"
        style={stylesLogUp.input}
        value={password}
        onChange={e => handlePassword(e)}
        secureTextEntry = {showPassword}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {password.length < 1 ? null : !showPassword ? (
              <Feather
                name="eye-off"
                style={{marginRight: -10}}
                color={passwordVerify ? 'green' : 'red'}
                size={23}
              />
            ) : (
              <Feather
                name="eye"
                style={{marginRight: -10}}
                color={passwordVerify ? 'green' : 'red'}
                size={23}
              />
            )}
        </TouchableOpacity>

      </View>
      {password.length < 1 ? <Text style={{color : 'red'}}> El contraseña no puede estar vacia</Text> : passwordVerify ? null : (
        <Text style={{color : 'red'}}>No es una contraseña valida</Text> )}
      
      <View>
      <TextInput
        label="Repetir Contraseña"
        style={stylesLogUp.input}
        value={repeatPassword}
        onChange={e => handleRepeatPassword(e)}
        secureTextEntry = {showPassword}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {password.length < 1 ? null : !showPassword ? (
              <Feather
                name="eye-off"
                style={{marginRight: -10}}
                color={'red'}
                size={23}
              />
            ) : (
              <Feather
                name="eye"
                style={{marginRight: -10}}
                color={'green'}
                size={23}
              />
            )}
        </TouchableOpacity>

      </View>
      {repeatPassword.length < 1 ? <Text style={{color : 'red'}}> Este campo no puede estar vacio</Text> : repeatPasswordVerify ? null : (
        <Text style={{color : 'red'}}>Las contraseñas no son iguales</Text> )}

      <Button 
        style={stylesLogUp.logup} 
        icon="login" mode="contained" 
        onPress={() => handleSubmit()}
      >
        Registrarse
      </Button>    

    </View>
    </ScrollView>

    )
}

export default LogUp;

