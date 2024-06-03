import React from "react";
import { View, Image, Text, Linking, Platform, Alert } from "react-native";
import styles from '../styles/PerfilStyles';
import { Title, Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import CountryFlag from "react-native-country-flag";
import axios from 'axios';

import { NESTJS_API_REST_URL } from '../api/constants';

const ContactPerfil = (props) => {

    const {_id, name, phone, age, gender, country, image, iso, user} = props.route.params.item;

    const openDial = () =>{
        if(Platform.OS == "android"){
            Linking.openURL(`tel:${phone}` )
        }else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }

    const handleDelete = async () => {

        try{
            const response = await axios.delete(NESTJS_API_REST_URL+"/"+_id);
                Alert.alert('Success', 'Contacto eliminado exitosamente');
                props.navigation.navigate("Home")

        }catch(err){
            console.log(err)
        }
    }

    return (
        <View style={styles.container}>

            <View
              style={styles.linearGradient}
             />

            <View style={{alignItems:"center"}}>
                <Image
                    source={{ uri: image }}
                    style={styles.img}
                />
            </View>
            
            <View style={{alignItems:"center"}}>
                 <Title>{name}</Title>
                 <Text style={{fontSize:20,paddingBottom:10}}>{age}</Text>
             </View>

             <Card style={styles.myCard} onPress={() => openDial()}>
                 <View style={styles.viewCard}>
                    <Icon name="phone" style={styles.icon}/>
                    <Text style={styles.text}>{phone}</Text>
                 </View>
             </Card>

             <Card style={styles.myCard}>
                 <View style={styles.viewCard}>
                    <Icon name="user" style={styles.icon}/>
                    <Text style={styles.text}>{gender}</Text>
                 </View>
             </Card>

             <Card style={styles.myCard}>
                 <View style={styles.viewCard}>
                    <Icon name="flag" style={styles.icon}/>
                    <Text style={styles.text}> <CountryFlag isoCode={iso} size={20} /> {country} </Text>
                 </View>
             </Card>

             <View style={{flexDirection:'row',padding:30,justifyContent:'space-around'}}>
                <Button icon="account-edit" style={ styles.edit } mode="contained" onPress={() => { props.navigation.navigate("UpdateContact",{_id, name, phone, age, gender, country, image, iso, user})} }>
                    Editar
                </Button>
                <Button icon="delete" style={styles.delete} mode="contained" onPress={handleDelete}>
                    Eliminar
                </Button>
             </View>

        </View>

        
    )

};

export default ContactPerfil;