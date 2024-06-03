import { StyleSheet } from "react-native";

const PerfilStyles = StyleSheet.create({
    linearGradient:{
        height:'13%',
        backgroundColor: '#f65141'
    },
    container:{
        flex:1
    },
    img:{
        height:140,
        width:140,
        borderRadius:70,
        marginTop:-50,
        backgroundColor: 'transparent'
    },
    viewCard:{
       flexDirection:"row",
       alignItems: 'center'
    },
    myCard:{
        margin:10,
        height:45,
        backgroundColor: '#ddd'
    },

    text:{
        fontSize:18,
        marginLeft:8,
        marginTop:7
    },

    icon:{
        fontSize:30,
        marginLeft:10,
        marginTop:10,
        color:'#921531',
    },

    edit: {
        backgroundColor: '#1671bd',
      },

    delete: {
        backgroundColor: '#ad2f47',
      },
});

export default PerfilStyles;
