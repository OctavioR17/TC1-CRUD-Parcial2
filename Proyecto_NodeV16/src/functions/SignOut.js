//import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const navigation = useNavigation();

function SignOut() {
    AsyncStorage.setItem('isLoggedIn', '');
    AsyncStorage.setItem('token', '');
    navigation.navigate('InitScreen');
  };


  export default SignOut;