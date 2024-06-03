import { StyleSheet } from "react-native";

const LogUpStyles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent : 'start',
    margin : 8
},

input: {
    margin: 10,
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 8,
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
    height:100,
    width:100,
    borderRadius:50,
    //marginTop:-50,
    backgroundColor: 'transparent',
    margin: 50
    
}

});

export default LogUpStyles;
