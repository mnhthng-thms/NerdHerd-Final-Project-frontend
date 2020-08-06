import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Content } from 'native-base'
import LoginForm from '../components/LoginForm'

<<<<<<< HEAD
export default function LoginScreen() {
  return (
    <LinearGradient colors={['#017DDC', '#00BCA0']} style={styles.container}>
      <Content contentContainerStyle={styles.contentContainer}>
        <Line />
        <Text style={styles.logo}>Crescorex</Text>
        <Line />
        <LoginForm />
      </Content>
=======
//Import components
import LoginForm from '../components/LoginForm'

export default function LoginScreen ({}) {
  return (
    <LinearGradient colors={['#017DDC', '#00BCA0']} style={styles.container}>
      <Line />
      <Text style={styles.logo}>Crescorex</Text>
      <Line />

      {/* <TextInput
        maxLength={20}
        style={styles.inputUsername}
        placeholder="Username"
        placeholderTextColor={'#bdbdbd'}
      />

      <TextInput
        maxLength={22}
        style={styles.inputPassword}
        placeholder="Password"
        placeholderTextColor={'#bdbdbd'}
        secureTextEntry
      />

      <Text style={styles.forgotText}>
        Forgot Password?
      </Text>

      <TouchableHighlight style={styles.buttonLogin}>
        <Text style={styles.loginText}>Log in</Text>
      </TouchableHighlight> */}

      <LoginForm></LoginForm>

>>>>>>> 33ff63fa39cde313438dc69409fe5ae45ab9b86e
    </LinearGradient>
  )
}

const Line = () => {
  return <View style={styles.whiteLine}></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100
  },
  whiteLine: {
    backgroundColor: 'white',
    height: 6,
    width: 77 + '%',
    borderRadius: 20,
    marginVertical: 10,
  },
  logo: {
    color: 'white',
    fontSize: 40,
<<<<<<< HEAD
  }
=======
  },
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  inputUsername: {
    textAlign: 'center',
    width: 70 + '%',
    color: 'white',
    fontSize: 15,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#e3e3e3',
    borderRadius: 30,
    marginTop: 70,
  },
  inputPassword: {
    textAlign: 'center',
    width: 70 + '%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#e3e3e3',
    borderRadius: 30,
    marginTop: 15,
  },
  forgotText: {
    color: 'white',
    marginTop: 10,
  },
  buttonLogin: {
    width: 70 + '%',
    paddingVertical: 14,
    paddingHorizontal: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: 40,
  },
  loginText: {
    alignSelf: 'center',
  },
>>>>>>> 33ff63fa39cde313438dc69409fe5ae45ab9b86e
})
