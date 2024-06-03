import React from "react";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import stylesInitScreen from "../styles/initScreenStyles";



const CreateContact = ({navigation}) => {

    return(
        <View style={stylesInitScreen.container}>

            <View style={stylesInitScreen.imgView}>

            <Image
            style = {stylesInitScreen.img}
            source={{uri : 'https://img.freepik.com/free-vector/contact-icon-3d-vector-illustration-blue-button-with-user-profile-symbol-networking-sites-apps-cartoon-style-isolated-white-background-online-communication-digital-marketing-concept_778687-1715.jpg'}}
            />

            </View>

            <Text> Tienes cuenta?</Text>

            <Button 
                style={stylesInitScreen.login} 
                icon="login" mode="contained" 
                onPress={() => navigation.navigate("LogIn")}
                >
                Iniciar Sesion
            </Button>

            <Text> No tienes?</Text>

            <Button 
                style={stylesInitScreen.logup} 
                icon="login-variant" mode="contained" 
                onPress={() => navigation.navigate("LogUp")}
                >
                Registrarse
                </Button>    

        </View>
    )
    
}

const theme = {
    colors: {
        primary: 'red'  
    }
};

export default CreateContact;
