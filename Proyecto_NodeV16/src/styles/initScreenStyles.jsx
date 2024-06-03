import { StyleSheet } from "react-native";

const initScreenStyles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent : 'start',
    margin : 8
},

login:{
    margin: 20,
    backgroundColor: '#f65141',
    padding: 8,
    width :'60'
},

logup:{
    margin: 20,
    backgroundColor: '#1583d6',
    padding: 8,
    width : '60'
},

imgView : {
    alignItems: 'center',
},

img:{
    height:200,
    width:200,
    borderRadius:100,
    //marginTop:-50,
    backgroundColor: 'transparent',
    margin: 50
    
}

});

export default initScreenStyles;
