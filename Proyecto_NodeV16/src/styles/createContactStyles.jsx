import { StyleSheet } from "react-native";

const stylesCreateContact = StyleSheet.create({
container: {
    flex: 1
},

linearGradient:{
    height:'15%',
    backgroundColor: '#f65141',
    justifyContent: 'center',
},

linearGradient2:{
    height:'0.1%',
    backgroundColor: '#ddd',
    margin: 5
},

input: {
   margin: 10,
   backgroundColor: '#ddd',
   borderRadius: 10,
   padding: 8,
},

upload:{
    margin: 10,
    backgroundColor: '#1671bd',
    padding: 8,
    //width: '50%',
},

register:{
    margin: 10,
    backgroundColor: '#f65141',
    padding: 8,
    //width: '50%',
},

camera:{
    margin: 10,
    backgroundColor: '#0593a7',
    padding: 8,
    //width: '50%',
},

gallery:{
    margin: 10,
    backgroundColor: '#3da19b',
    padding: 8,
    //width: '50%',
},

cancel:{
    margin: 10,
    backgroundColor: '#ad2f47',
    padding: 8,
    //width: '50%',
},

countrypicker: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
},

label: {
    margin: 10,
},

header: {
    padding: 40
},

textHeader: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: 20,
    color: '#fff'
},

menu: {
    justifyContent: 'center',
    alignItems: 'center'
},

buttonModalView:{
    flexDirection:'row',
    padding:10,
    justifyContent:'space-around',
    backgroundColor:'#ddd',
    
},

modalView:{
    position:'absolute',
    bottom:2,
    width:'100%',
    height:'25%',
    backgroundColor: '#ddd'
}

});

export default stylesCreateContact;
