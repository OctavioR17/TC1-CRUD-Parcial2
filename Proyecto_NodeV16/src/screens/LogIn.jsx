import { useEffect, useState } from "react";
import { View, Image, Alert, ScrollView, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import stylesLogIn from '../styles/LogInStyles';
import axios from 'axios';
import { NESTJS_API_REST_URL_USER } from "../api/constants";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function LogIn ({props}) {

    const navigation = useNavigation();

    const [user, setUser] = useState('');
    const [userVerify, setUserVerify] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState(false);

    function handleSubmit() {

        if((userVerify === true) && (passwordVerify === true)){

            const userData = {
                user: user,
                password: password,
            };
            
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            
            axios.post(NESTJS_API_REST_URL_USER + "/login", userData, config)
                .then(res => {
                    const status = res.data.status;
            
                    if (status === "ok") {
                        Alert.alert("Sesión iniciada con éxito");
                        AsyncStorage.setItem('token', res.data.data);
                        AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
                        //AsyncStorage.setItem('userType', res.data.userType)
                        navigation.navigate("Home");
                    } else if (status === "notfounduser") {
                        Alert.alert("El usuario no existe");
                    } else if (status === "wrongpassword") {
                        Alert.alert("La contraseña es incorrecta");
                    } else {
                        Alert.alert("Error desconocido: " + status);
                    }
                })
                .catch(error => {
                    console.log('Error en la solicitud:', error);
                    Alert.alert("Error en la solicitud: " + error.message);
                });
      
        } else {
            Alert.alert("Algun campo esta vacio")
        }

    }

    async function getData(){
        const data = await AsyncStorage.getItem('isLoggedIn');

        console.log(data, 'App.jsx')
    }

    function handleUser(e) {
        const userVar = e.nativeEvent.text;
        setUser(userVar);
        setUserVerify(false);

        if((userVar.length >= 1)){
            setUserVerify(true);
        }
    }

    function handlePassword(e) {
        const passwordVar = e.nativeEvent.text;
        setPassword(passwordVar);
        setPasswordVerify(false);

        if((passwordVar.length >= 1)){
            setPasswordVerify(true);
        }
    }

    useEffect(() => {
        getData();
        console.log("Holaa");
    },[])
    
    return(

        <ScrollView contentContainerStyle={{flexGrow: 1}} 
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always">

        <View style={stylesLogIn.container}>

            <View style={stylesLogIn.imgView}>

            <Image
            style = {stylesLogIn.img}
            source={{uri : 'https://img.freepik.com/vector-gratis/ilustracion-empresario_53876-5856.jpg?t=st=1716850847~exp=1716854447~hmac=c0d983ccd490ef06dacf09902500f60495b29139bbb84fcf8d47cf60631084e0&w=740' }}
            />

            </View>



            <TextInput
                label="Usuario"
                style={stylesLogIn.input}
                theme={theme}
                value={user}
                mode="outlined"
                onChange={e => handleUser(e)}
            />
            {userVerify ? null : <Text style={{color : 'red'}}> Este campo no puede estar vacio</Text> }

            <TextInput
                label="Contraseña"
                style={stylesLogIn.input}
                theme={theme}
                value={password}
                mode="outlined"
                onChange={e => handlePassword(e)}
            />
            {passwordVerify ? null : <Text style={{color : 'red'}}> Este campo no puede estar vacio</Text> }

            <Button 
                style={stylesLogIn.login} 
                icon="login" mode="contained" 
                onPress={() => handleSubmit()}
                >
                Iniciar Sesion
            </Button>    

        </View>
        </ScrollView>
    )
}

const theme = {
    colors: {
        primary: 'red'  
    }
};

export default LogIn;