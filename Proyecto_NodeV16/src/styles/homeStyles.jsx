import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
      margin: 7,
      elevation: 0,
      backgroundColor: 'transparent',
      borderWidth: 0
    },

    header: {
      margin: 10
    },

    avatar: {
      backgroundColor: '#1ced88'

    },

    cardViews: {
      flexDirection: 'row',
      backgroundColor: '#ddd',
    },

    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    image: {
        width: 45,
        height: 45,
        backgroundColor: 'transparent',
        borderRadius: 30
    },

    button: {
      backgroundColor: '#000',
      tintColor: '#fff'
    },

    text: {
      fontSize: 20,
      marginLeft: 10,
      paddingTop: 5
    },

    fab: {
      bottom: 16,
      right: 16,
      position: 'absolute',
      backgroundColor : '#f65141',
      borderRadius: 40
    },
    fabTop: {
      bottom: 'auto', // Elimina la posición en la parte inferior
      top: 16, // Posición en la parte superior del contenedor
  }

  });

export default styles;

