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

const UpdateContact = ({navigation, route}) => {

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
                case "user":
                    return route.params.user
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
        user : getDetails("user"),
      } : {

        name:'', 
        phone:'', 
        age:'', 
        gender:'', 
        country:'', 
        image:'', 
        iso:'',
        user : ''
        
      });

      const [nameVerify, setNameVerify] = useState(false);
      const [phoneVerify, setPhoneVerify] = useState(false);
      const [ageVerify, setAgeVerify] = useState(false);


      function handleName(e) {
        const nameVar = e.nativeEvent.text;
        setData({... data, name : nameVar});
        setNameVerify(false);
    
        if((nameVar.length > 1)) {
            setNameVerify(true);
    
        }
      }

      function handleMobile(e) {
        const mobileVar = e.nativeEvent.text;
        setData({...data, phone : mobileVar});
        setPhoneVerify(false);
        if (/[0-9]{10}/.test(mobileVar)) {
          setData({...data, phone : mobileVar});
          setPhoneVerify(true);
        }
      }

      function handleAge(e) {
        const ageVar = e.nativeEvent.text;
        setData({... data, age : ageVar});
        setAgeVerify(false);
    
        if((ageVar.length > 1)) {
            setAgeVerify(true);
    
        }
      }

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

    function ImageAlert(){ 
        Alert.alert('ATENCION', 'Esta funcion se encuentra experimentando errores. \n Desactivada momentaneamente...')
    }

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4 , 3],
            quality: 1,
        });

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


        if((nameVerify === true) && (phoneVerify === true) && (ageVerify === true)){

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
        } else {
            Alert.alert("ERROR","Algunos campos no cumplen con los requerimientos")
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
                //onChangeText={text => setData({...data, name: text})}
                onChange={e => handleName(e)}
            />
            {nameVerify ? null : <Text style={{color : 'red'}}>El nombre no puede estar vacio</Text>}

            <TextInput
                label="Numero de Telefono"
                style={stylesCreateContact.input}
                theme={theme}
                value={data.phone}
                keyboardType="phone-pad"
                mode="outlined"  
                //onChangeText={text => setData( {...data, phone: text} )}
                onChange={e => handleMobile(e)} 
            />
            {phoneVerify ? null : <Text style={{color : 'red'}}>Número de teléfono con 10 digitos</Text>}

            <TextInput
                label="Edad"
                style={stylesCreateContact.input}
                theme={theme}
                value={data.age}
                keyboardType="phone-pad"
                mode="outlined"
                //onChangeText={text => setData( {...data, age: text} )}
                onChange={e => handleAge(e)}
            />
            {ageVerify ? null : <Text style={{color : 'red'}}>El campo de edad no puede estar vacio</Text>}

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
                <Divider />
                <Menu.Item onPress={() => selectGender('Otro')} title="Otro" />
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
                //onPress={() => setModal(true)}
                onPress={() => ImageAlert()}
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
                    <Button 
                        style={stylesCreateContact.register} 
                        icon="account-arrow-right" mode="contained" 
                        onPress={handleUpdateData}
                        >
                            Actualizar
                    </Button>
                    
        </View>
    )
    
}

const theme = {
    colors: {
        primary: 'red'  
    }
};

export default UpdateContact;
