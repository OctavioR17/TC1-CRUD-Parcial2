import React, { useEffect, useState} from 'react';
import { View , Image, FlatList, Text, Alert, BackHandler} from 'react-native';
import {Button,Card, FAB } from 'react-native-paper';
import styles from '../styles/homeStyles';
import CountryFlag from "react-native-country-flag";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NESTJS_API_REST_URL, NESTJS_API_REST_URL_USER } from '../api/constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const Home = (props) => {

   const navigation = useNavigation();

    const [data, setData] = useState([]);
    const [userData, setUserData] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    
    const fetchData = async () => {
        try {
            const response = await axios.get(NESTJS_API_REST_URL+"/"+userData.user);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    function signout() {
        AsyncStorage.setItem('isLoggedIn', '');
        AsyncStorage.setItem('token', '');
        navigation.navigate('InitScreen');
      };

    async function getData(){
        const token = await AsyncStorage.getItem('token');

        console.log("TOKEN: "+token);

        axios.post(NESTJS_API_REST_URL_USER+"/userdata",{token : token})
        .then(res => {setUserData(res.data.data)});
        

        console.log("USER DATA: "+userData)

    }

    const exit = () => {
        Alert.alert('Salir' , '¿Realmente desea salir de la aplicacion?', [
            {
                text : 'Cancelar',
                onPress: () => null
            },
            {
                text : 'Salir',
                onPress: () => BackHandler.exitApp(),
            },
        ]);
        return true;
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
            getData();
            BackHandler.addEventListener('hardwareBackPress', exit);

            return() => {
                BackHandler.removeEventListener('hardwareBackPress', exit);
            };
        },[])
    );

    useEffect( () => {
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }

    const renderList = (item) => {
        return (

            <Card onPress={() => navigation.navigate("ContactPerfil",{item})}>
                <Card.Title 
                    left={(props) => (
                        <Image
                            style={styles.image}
                            source={{ uri: item.image }}
                        />
                    )}
                    style={styles.card}
                    title={item.name}
                    subtitle={
                        <View style={styles.subtitleContainer}>
                            <Text style={styles.subtitle}>{item.country} <CountryFlag isoCode={item.iso} size={15} /> </Text>
                        </View>
                    }
                />
            </Card>
        )
    }

    return ( 
    <View style={{flex: 1}}>

        <Button onPress={signout}> Cerrar Sesion</Button>

             <FlatList
             data = {data}
             keyExtractor={(item, index) => index.toString()}
             renderItem={({ item }) => 
                renderList(item) }
             refreshing={refreshing}
             onRefresh={onRefresh}
         />  

            <FAB
            icon = "plus"
            size = "medium"
            style = {styles.fab}
            onPress={() => navigation.navigate("CreateContact",{data: userData})}
            />
    
    </View>
    )
};

export default Home;

