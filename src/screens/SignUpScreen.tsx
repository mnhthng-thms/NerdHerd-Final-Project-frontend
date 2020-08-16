import i18n from '../i18n'
import React, { useState } from 'react'
import { StyleSheet, Text, Image } from 'react-native'
import { Content, View } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SharedElement } from 'react-native-shared-element'
import { useNavigation } from '@react-navigation/native'
// import Animated, { useCode } from 'react-native-reanimated'

import SignupForm from '../components/forms/SignupForm'
import { GradientContainer } from '../components/atomic/'
import { Colours, Fonts } from '../styles'
import { SignInNavContext } from '../contexts'
import { normalise, scaleImageByScreenDimensions } from '../../src/helpers/'
import { getCachedImageUri, runReanimatedTiming as runTiming } from '../utils/'

// const { Value, set } = Animated

const LOGO_IMAGE_PATH = '../../assets/images/logo.png'

export default function SignupScreen() {
  const nav = useNavigation()
  const _transit = () => {
    nav.goBack()
  }

  const _signUpTxtOnPressed = () => {
    nav.navigate('SignUp')
  }

  return (
    <GradientContainer flexDirection={'column'}>
      <Content scrollEnabled={false} contentContainerStyle={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <SharedElement id="logo">
            <Image
              style={styles.logo}
              source={{
                uri: getCachedImageUri(require(LOGO_IMAGE_PATH)),
              }}
            />
          </SharedElement>
        </View>
        <SignInNavContext.Provider value={nav}>
          <SignupForm />
        </SignInNavContext.Provider>
      </Content>
    </GradientContainer>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpTxtContainer: {
    flex: 1,
    flexDirection: 'row',
    width: 100 + '%',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'flex-end',
  },
  logo: { 
    ...scaleImageByScreenDimensions(require(LOGO_IMAGE_PATH), 0.8) 
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15 + '%',
  },
  signUpTxt: {
    flex: 2,
    fontSize: 15,
    fontFamily: Fonts.PrimaryBold,
    color: Colours.Sapphire,
    paddingLeft: 5,
    paddingTop: 10,
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
  signUpTouchableTxt: {
    shadowOffset: {
      width: 1.25,
      height: 1.25,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.12,
    elevation: 3,
    alignSelf: 'flex-end',
  },
  forgetPasswordTxt: {
    fontSize: 15,
    color: Colours.White,
    paddingTop: 10,
    textAlign: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
})
