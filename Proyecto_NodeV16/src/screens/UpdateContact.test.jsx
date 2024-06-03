import React, { useState } from "react";
import { View, Text, Modal, Alert } from "react-native";
import { TextInput, Button, Menu, Divider } from "react-native-paper";
import stylesCreateContact from "../styles/createContactStyles";
import CountryPicker from 'react-native-country-picker-modal';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

import { CLOUDINARY_UPLOAD_PRESET,
         CLOUDINARY_CLOUD_NAME,
         CLOUDINARY_IMAGE_UPLOAD_API_URL,
         NESTJS_API_REST_URL } from '../api/constants';


const CreateContact = ({navigation, route}) => {

    const getDetails = (type) => {
        if(route.params){
            switch(type){
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "age":
                    return route.params.age
                case "gender":
                    return route.params.gender
                case "country":
                    return route.params.country
                case "image":
                    return route.params.image
                case "iso":
                    return route.params.iso
            }
        }
        return ""
    }

    //const [data, setData] = useState(getDetails({ name:"name", phone:'phone', age:'age', gender:'gender', country:'country', image:'image', iso:'iso' }));
    const [data, setData] = useState(route.params ? {
        name: getDetails("name"),
        phone: getDetails("phone"),
        age: getDetails("age"),
        gender: getDetails("gender"),
        country: getDetails("country"),
        image: getDetails("image"),
        iso: getDetails("iso"),
      } : {

        name:'', 
        phone:'', 
        age:'', 
        gender:'', 
        country:'', 
        image:'', 
        iso:'',
        
      });

    const [modal ,setModal] = useState(false)
    const [countryCode, setCountryCode] = useState("");

    const [visible, setVisible] = React.useState(false);

    const inputHndl = (name, value)=>{ setData((data)=>( {...data,[name]:value} )); }
  
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    
    const selectGender = (selectedGender) => {
        setData({ ...data, gender: selectedGender });
      closeMenu();
    };

    const onSelectCountry = (country) => {
        if (country && country.name && country.cca2) {
            setCountryCode(country);
            setData((data) => ({ ...data, country: country.name, iso: country.cca2 }));
        }
    };

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4 , 3],
            quality: 1,
        });

        console.log(result)

        if(!result.canceled){
            let newFile = {
                uri: result.assets[0].uri,
                type: "image/jpg",
                name: result.assets[0].fileName
                
            };

            console.log("NEWFILE: ", newFile)

                handleUpload(newFile);
            } else {
                Alert.alert("No se selecciono ninguna fotografia");
            }
    }  

    const pickPhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
            let newFile = {
                uri: result.assets[0].uri,
                type: "image/jpg",
                name: result.assets[0].fileName
            };

            handleUpload(newFile);
        
        }else{
            Alert.alert("No se tomo ninguna fotografia")
        }
    };

    const handleUpload = (image) => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        data.append('cloud_name', CLOUDINARY_CLOUD_NAME);

        console.log("data: ", data)

        fetch(CLOUDINARY_IMAGE_UPLOAD_API_URL, {
            method: 'post',
            body: data
        })
        .then(res => res.json())
        .then(data => { inputHndl('image', data.url); })
        //.then(setModal(false))
        .catch(err => {
            Alert.alert("No se pudo subir la imagen")
            console.log("ERROR", err)
        })
    }

    const handleUpdateData = async () => {

        onSelectCountry();

        let JSONUpdated = {
            id : route.params._id,
                name : data.name,
                phone : data.phone,
                age : data.age,
                gender : data.gender,
                country : data.country,
                image : data.image,
                iso : data.iso,
                user : data.user
        };

        try{
            const response = await axios.put(NESTJS_API_REST_URL+"/"+JSONUpdated.id, JSONUpdated );
            Alert.alert('Success', 'Contacto actualizado exitosamente');
            navigation.navigate("Home")
        }catch(error){
            console.log(error)
        }
    }

    const handleRegister = async () => {


        const Data = {
            ...data,
            image: data.image === '' ? 'https://i.pinimg.com/736x/8a/8d/3f/8a8d3f62663f719adc1b4402d1ce9d8f.jpg' : data.image,
            user: User
        };

        console.log("DATA: "+JSON.stringify(Data))


         try {
            const response = await axios.post(NESTJS_API_REST_URL, Data);
            Alert.alert('Success', 'Contacto registrado exitosamente');
            navigation.navigate("Home")
         } catch (error) {
            console.error('Error al subir los datos:', error);
            Alert.alert('Error', 'No se pudo registrar el contacto');
         }
    }


    return(
        <View style={stylesCreateContact.container}>

            <TextInput
                label="Nombre"
                style={stylesCreateContact.input}
                theme={theme}
                value={data.name}
                mode="outlined"
                onChangeText={text => setData({...data, name: text})}
            />

            <TextInput
                label="Numero de Telefono"
                style={stylesCreateContact.input}
                theme={theme}
                value={data.phone}
                keyboardType="phone-pad"
                mode="outlined"  
                onChangeText={text => setData( {...data, phone: text} )} 
            />

            <TextInput
                label="Edad"
                style={stylesCreateContact.input}
                theme={theme}
                value={data.age}
                keyboardType="phone-pad"
                mode="outlined"
                onChangeText={text => setData( {...data, age: text} )}
            />

            <Text style={stylesCreateContact.label}>Selecciona tu género:</Text>

            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                <Button  
                onPress={openMenu}
                mode="outlined" 
                style={stylesCreateContact.input} >
                {data.gender ? data.gender : " " }
                </Button>
                }
            >
                <Menu.Item onPress={() => selectGender('Masculino')} title="Masculino" />
                <Divider />
                <Menu.Item onPress={() => selectGender('Femenino')} title="Femenino" />
                </Menu>
            
            <View style={stylesCreateContact.countrypicker}>

             <CountryPicker 
                countryCode={countryCode.cca2}
                withFilter
                withFlag
                withCountryNameButton
                withAlphaFilter
                //withCallingCode
                withEmoji
                onSelect={onSelectCountry}
            /> 
            </View>

            <Button 
                style={stylesCreateContact.upload} 
                icon= { data.image == "" ? "file-image" : "check-bold" } mode="contained" 
                onPress={() => setModal(true)}
            >
                {data.image === "" ? "Subir Imagen" : ""}
            </Button>

            <Modal
             animationType='slide'
             transparent={true}
             visible={modal}
             onRequestClose= {() => {setModal(false)}}
            >
                <View style={stylesCreateContact.modalView}>
                    <View style={stylesCreateContact.buttonModalView}>

                        <Button icon="camera" style={stylesCreateContact.camera} mode="contained" onPress={pickPhoto}>
                            Camara
                        </Button>
                        <Button icon="folder-image" style={stylesCreateContact.gallery} mode="contained" onPress={pickImage}>
                            Galeria
                        </Button>
                    </View>
                    <Button icon="cancel" style={stylesCreateContact.cancel} mode="contained" onPress={() => setModal(false)}>
                        Cancelar
                    </Button>
                </View>

            </Modal>


            {route.params?
                    <Button 
                        style={stylesCreateContact.register} 
                        icon="account-arrow-right" mode="contained" 
                        onPress={handleUpdateData}
                        >
                            Actualizar
                    </Button>
                    :
                    <Button 
                        style={stylesCreateContact.register} 
                        icon="account-arrow-right" mode="contained" 
                        onPress={handleRegister}
                        >
                            Registrar
                    </Button>    
            } 

        </View>
    )
    
}

const theme = {
    colors: {
        primary: 'red'  
    }
};

export default CreateContact;
