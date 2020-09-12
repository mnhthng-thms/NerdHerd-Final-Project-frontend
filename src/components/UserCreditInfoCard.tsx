import i18n from '../i18n'
import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Text,
  Modal,
} from 'react-native'
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { Container, Form } from 'native-base'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import { normalise, normaliseV, normaliseH, PATTERN } from '../../src/helpers'
import StyledText from '../../src/components/atomic/StyledText'
import TextInputIcon from '../components/atomic/TextInputIcon'
import { FontAwesome5 } from '@expo/vector-icons'

import RNSpeedometer from 'react-native-speedometer'
import RNFadedScrollView from 'rn-faded-scrollview'
import RNPickerSelect from 'react-native-picker-select'

import { useForm, Controller } from 'react-hook-form'

import ModalField from '../components/ModalUserInfoCard'
import { reset } from 'i18n-js'

interface FormInput {
  loanAmount_calculate: number | null
  loanAmount_offer: number | null
}

interface UserCreditInfoCardProps {
  phoneNumber: string
  creditScore: number
}

const Line = function () {
  return <View style={styles.line} />
}

export default function UserCreditInfoCard(props: UserCreditInfoCardProps) {
  const { phoneNumber, creditScore } = props
  const [editable, setEditable] = useState(true)

  const placeholderLoanType = {
    label: i18n.t('home.loanOptionsInput'),
    value: null,
    color: '#9EA0A4',
  }

  const loanTypeContent = [
    { label: 'Vay tiêu dùng', value: 'consumption' },
    { label: 'Vay trả góp', value: 'installment' },
    { label: 'Vay mua ô tô', value: 'buyCar' },
  ]

  const loanDurationContent = [
    { label: '1 Tháng', value: '1month' },
    { label: '2 Tháng', value: '2months' },
    { label: '3 Tháng', value: '3months' },
    { label: '6 Tháng', value: '6months' },
    { label: '9 Tháng', value: '9months' },
    { label: '12 Tháng', value: '12months' },
    { label: '16 Tháng', value: '16months' },
    { label: '24 Tháng', value: '24months' },
    { label: '36 Tháng', value: '36months' },
  ]

  const placeholderDuration = {
    label: 'Chọn thời hạn vay',
    value: null,
    color: '#9EA0A4',
  }

  const { control, handleSubmit, errors, trigger, reset } = useForm<FormInput>()

  const [calculateModalVisible, setCalculateModalVisible] = useState(false)
  const [offerModalVisible, setOfferModalVisible] = useState(false)

  const [calculatePickerValue, setCalculatePickerValue] = useState(null)
  const [offerPickerValue, setOfferPickerValue] = useState(null)
  const [durationPickerValue, setOfferPickerDuration] = useState(null)

  const [calculatePickerWarning, setCalculatePickerWarning] = useState(
    <Text></Text>,
  )
  const [offerPickerWarning, setOfferPickerWarning] = useState(<Text></Text>)
  const [durationPickerWarning, setDurationPickerWarning] = useState(
    <Text></Text>,
  )

  const calculateFormOnSubmitted = (data: Object) => {
    setCalculateModalVisible(true)
    reset({ loanAmount_calculate: null })
  }

  const offerFormOnSubmitted = (data: Object) => {
    setOfferModalVisible(true)
    reset({ loanAmount_offer: null })
  }

  return (
    <>
      <Container style={styles.content}>
        {/*Information Modal for loanCalculated field*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={calculateModalVisible}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <View style={styles.informationIconContainer}>
                <Text style={styles.informationIcon}>!</Text>
                {/* <FontAwesome5 name="check" size={32} color="white" /> */}
              </View>
              <View style={styles.modalText}>
                <StyledText
                  fontWeight="bold"
                  style={styles.modalContentHeaderText}
                >
                  Result
                </StyledText>
                <StyledText
                  fontWeight="regular"
                  style={styles.modalContentText}
                >
                  Khoan vay cua ban co xac suat thanh cong la 67%
                </StyledText>
              </View>
              <TouchableOpacity
                style={styles.calculateModalConfirmButton}
                onPress={() => setCalculateModalVisible(false)}
              >
                <StyledText fontWeight="bold" style={styles.formConfirmText}>
                  OK
                </StyledText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/*Offer Modal for loanOffer field*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={offerModalVisible}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <View style={styles.successIconContainer}>
                <FontAwesome5 name="check" size={32} color="white" />
              </View>
              <View style={styles.modalText}>
                <StyledText
                  fontWeight="bold"
                  style={styles.modalContentHeaderText}
                >
                  Success
                </StyledText>
                <StyledText style={styles.modalContentText}>
                  Khoan vay cua ban co xac suat thanh cong la 67%
                </StyledText>
              </View>
              <TouchableOpacity
                style={styles.offerModalConfirmButton}
                onPress={() => setOfferModalVisible(false)}
              >
                <StyledText fontWeight="bold" style={styles.formConfirmText}>
                  OK
                </StyledText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <KeyboardAvoidingView
          keyboardVerticalOffset={120}
          behavior="padding"
          enabled
        >
          <ScrollView
            onTouchMove={() => setEditable(false)}
            onTouchEnd={() => setEditable(true)}
          >
            <View style={styles.phoneNumContainer}>
              <StyledText fontWeight="regular" style={styles.phoneNum}>
                {phoneNumber}
              </StyledText>
            </View>

            <Line></Line>

            <View style={styles.creditScoreContainer}>
              <StyledText fontWeight="bold" style={styles.creditScoreHeader}>
                {i18n.t('home.firstSubHeader')}
              </StyledText>

              <RNSpeedometer value={creditScore} size={normalise(220)} />
              <View style={styles.speedometerContainer}>
                <View style={{}}>
                  <Image
                    source={require('../images/bar.png')}
                    style={{ width: 220, height: 185, position: 'relative' }}
                  ></Image>
                  <StyledText style={styles.score} fontWeight="bold">
                    {String(creditScore)}
                  </StyledText>
                </View>
              </View>

              <StyledText fontWeight="regular" style={styles.creditScoreNote}>
                {i18n.t('home.suggestionContent.middle')}
              </StyledText>
            </View>

            <Line></Line>

            <View style={styles.loanDetailContainer}>
              <Form key={1}>
                <StyledText fontWeight="bold" style={styles.loanDetailHeader}>
                  {i18n.t('home.secondSubHeader')}
                </StyledText>

                {/* <StyledText
                  fontWeight="regular"
                  style={styles.loanDetailResult}
                >
                  Content goes here
                </StyledText> */}

                <View style={styles.loanType}>
                  <RNPickerSelect
                    placeholder={placeholderLoanType}
                    onValueChange={(value) => setCalculatePickerValue(value)}
                    items={loanTypeContent}
                    value={calculatePickerValue}
                  />
                  <TextInputIcon></TextInputIcon>
                </View>

                <Text style={styles.validationText}>
                  {calculatePickerWarning}
                </Text>

                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <TextInput
                      // validation code-block
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      value={value}
                      maxLength={12}
                      // End of validation code-block
                      keyboardType={'number-pad'}
                      editable={editable}
                      style={styles.loanAmount}
                      placeholder={i18n.t('home.loanAmountInput')}
                    />
                  )}
                  name="loanAmount_calculate"
                  rules={{
                    required: true,
                    minLength: 6,
                    min: 1000000,
                    max: 100000000000,
                    pattern: /^(1|2|3|4|5|6|7|8|9)+([0-9])/,
                  }}
                  defaultValue=""
                />
                {errors.loanAmount_calculate?.type === 'required' && (
                  <View style={styles.validationTextContainer}>
                    <Text style={styles.validationText}>
                      {i18n.t('home.validation.required')}
                    </Text>
                  </View>
                )}

                {errors.loanAmount_calculate?.type === 'min' && (
                  <View style={styles.validationTextContainer}>
                    <Text style={styles.validationText}>
                      {i18n.t('home.validation.invalidAmount')}
                    </Text>
                  </View>
                )}
                {errors.loanAmount_calculate?.type === 'max' && (
                  <View style={styles.validationTextContainer}>
                    <Text style={styles.validationText}>
                      {i18n.t('home.validation.invalidAmount')}
                    </Text>
                  </View>
                )}
                {errors.loanAmount_calculate?.type === 'pattern' && (
                  <View style={styles.validationTextContainer}>
                    <Text style={styles.validationText}>
                      {i18n.t('home.validation.invalidAmount')}
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.buttonNext}
                  onPress={async () => {
                    if (calculatePickerValue == null) {
                      setCalculatePickerWarning(
                        <Text>{i18n.t('home.validation.required')}</Text>,
                      )
                    } else {
                      setCalculatePickerWarning(<Text></Text>)
                      if (await trigger('loanAmount_calculate')) {
                        calculateFormOnSubmitted('ok')
                      }
                    }
                  }}
                  //onPress={handleSubmit(calculateFormOnSubmitted)}
                >
                  <StyledText fontWeight="bold" style={styles.buttonText}>
                    {i18n.t('home.submitBtn')}
                  </StyledText>
                </TouchableOpacity>
              </Form>
            </View>

            <Line></Line>

            <View style={styles.recommendContainer}>
              <Form key={2}>
                <StyledText fontWeight="bold" style={styles.loanDetailHeader}>
                  {i18n.t('home.recommendContent.header')}
                </StyledText>
                
                {/* <StyledText
                  fontWeight="regular"
                  style={styles.loanDetailResult}
                >
                  Content goes here
                </StyledText> */}

                <View
                  style={styles.loanType}
                  onTouchEnd={() => console.log('Pressed')}
                >
                  <RNPickerSelect
                    placeholder={placeholderLoanType}
                    onValueChange={(value) => setOfferPickerValue(value)}
                    items={loanTypeContent}
                    value={offerPickerValue}
                  />
                  <TextInputIcon></TextInputIcon>
                </View>
                <View style={styles.validationTextContainer}>
                  <Text style={styles.validationText}>
                    {offerPickerWarning}
                  </Text>
                </View>

                <View style={styles.loanType}>
                  <RNPickerSelect
                    placeholder={placeholderDuration}
                    onValueChange={(value) => setOfferPickerDuration(value)}
                    items={loanDurationContent}
                    value={durationPickerValue}
                  />
                  <TextInputIcon></TextInputIcon>
                </View>
                <View style={styles.validationTextContainer}>
                  <Text style={styles.validationText}>
                    {durationPickerWarning}
                  </Text>
                </View>

                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <TextInput
                      // validation code-block
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      value={value}
                      maxLength={12}
                      // End of validation code-block
                      keyboardType="number-pad"
                      editable={editable}
                      style={styles.loanAmount}
                      placeholder={i18n.t('home.loanAmountInput')}
                    />
                  )}
                  name="loanAmount_offer"
                  rules={{
                    required: true,
                    minLength: 6,
                    min: 1000000,
                    max: 100000000000,
                    pattern: /^(1|2|3|4|5|6|7|8|9)+([0-9])/,
                  }}
                  defaultValue=""
                />
                {errors.loanAmount_offer?.type === 'required' && (
                  <Text style={styles.validationText}>
                    {i18n.t('home.validation.required')}
                  </Text>
                )}
                {errors.loanAmount_offer?.type === 'min' && (
                  <Text style={styles.validationText}>
                    {i18n.t('home.validation.invalidAmount')}
                  </Text>
                )}
                {errors.loanAmount_offer?.type === 'max' && (
                  <Text style={styles.validationText}>
                    {i18n.t('home.validation.invalidAmount')}
                  </Text>
                )}
                {errors.loanAmount_offer?.type === 'pattern' && (
                  <Text style={styles.validationText}>
                    {i18n.t('home.validation.invalidCharacter')}
                  </Text>
                )}

                <TouchableOpacity
                  style={styles.buttonNext}
                  onPress={async () => {
                    if (
                      durationPickerValue == null &&
                      offerPickerValue == null
                    ) {
                      setOfferPickerWarning(
                        <Text>{i18n.t('home.validation.required')}</Text>,
                      )
                      setDurationPickerWarning(
                        <Text>{i18n.t('home.validation.required')}</Text>,
                      )
                    }
                    if (
                      durationPickerValue == null &&
                      offerPickerValue != null
                    ) {
                      setDurationPickerWarning(
                        <Text>{i18n.t('home.validation.required')}</Text>,
                      )
                      setOfferPickerWarning(<Text></Text>)
                    }
                    if (
                      durationPickerValue != null &&
                      offerPickerValue == null
                    ) {
                      setDurationPickerWarning(<Text></Text>)
                      setOfferPickerWarning(
                        <Text>{i18n.t('home.validation.required')}</Text>,
                      )
                    }
                    if (
                      durationPickerValue != null &&
                      offerPickerValue != null
                    ) {
                      setDurationPickerWarning(<Text></Text>)
                      setOfferPickerWarning(<Text></Text>)
                      if (await trigger('loanAmount_offer')) {
                        offerFormOnSubmitted('cf')
                      }
                    }
                  }}
                >
                  <StyledText fontWeight="bold" style={styles.buttonText}>
                    {i18n.t('home.recommendContent.submitBtn')}
                  </StyledText>
                </TouchableOpacity>
              </Form>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </>
  )
}

const styles = StyleSheet.create({
  line: {
    height: 25,
    width: 100 + '%',
    backgroundColor: '#e3d3d3',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    height: 100,
    justifyContent: 'flex-end',
  },
  headerText: {
    paddingBottom: 20,
    fontSize: 28,
  },
  content: {
    flex: 1,
    width: (SCREEN_WIDTH / 10) * 9.4,
    flexDirection: 'column',
    alignContent: 'center',
  },
  footer: {
    flex: 0.08,
  },
  // ------------------------------------ Header field
  phoneNumContainer: {
    height: 60,
    width: 100 + '%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normaliseH(40),
  },
  phoneNum: {
    fontSize: normalise(30),
    color: 'black',
  },
  // ------------------------------------ Credit score field
  creditScoreContainer: {
    width: 100 + '%',
    height: 320,
    justifyContent: 'space-between',
    paddingHorizontal: normaliseH(40),
  },
  creditScoreHeader: {
    fontSize: normalise(20),
    paddingTop: normaliseV(30),
    color: 'black',
  },

  creditScoreNote: {
    paddingTop: 60,
    paddingBottom: 15,
    fontSize: normalise(13),
    color: 'black',
  },

  // ------------------------------------ Loan detail field
  loanDetailContainer: {
    height: 350,
    width: 100 + '%',
    paddingHorizontal: normaliseH(40),
  },
  loanDetailHeader: {
    fontSize: normalise(20),
    paddingTop: normaliseV(30),
    color: 'black',
  },
  loanDetailResult: {
    fontSize: normalise(13),
    paddingTop: normaliseV(30),
    color: 'black',
  },

  loanType: {
    height: 50,
    marginVertical: 20,
    width: 80 + '%',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingLeft: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  loanAmount: {
    height: 50,
    marginVertical: 20,
    width: 80 + '%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 17,
    alignSelf: 'center',
  },
  buttonNext: {
    paddingHorizontal: 40,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 20,
    height: 50,
    width: 170,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'black',
    alignSelf: 'center',
    fontSize: normalise(14),
    lineHeight: 20,
    fontWeight: '600',
  },
  validationTextContainer: {
    alignItems: 'center',
  },
  validationText: {
    fontSize: normalise(14),
    color: 'rgba(242, 38, 19, 1)',
    paddingHorizontal: normaliseH(80),
    marginTop: normaliseV(-40),
    alignSelf: 'center',
  },
  // ------------------------------------ Recommend field
  recommendContainer: {
    height: 480,
    width: 100 + '%',
    paddingHorizontal: normaliseH(40),
  },
  speedometerContainer: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: normaliseV(140),
  },
  score: {
    color: 'black',
    fontSize: normalise(28),
    position: 'absolute',
    alignSelf: 'center',
    marginTop: normalise(111),
  },
  //Setting up modal
  modalBackground: {
    position: 'absolute',
    width: SCREEN_WIDTH, //////////////////////////////////////
    height: SCREEN_HEIGHT, //////////////////////////////////////
    backgroundColor: 'rgba(0, 0, 0, 0.57)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    position: 'absolute',
    width: (SCREEN_WIDTH / 10) * 7.5, ////////////////////////////
    height: (SCREEN_HEIGHT / 10) * 3, ////////////////////////////
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
    alignItems: 'center',
  },

  modalContentHeaderText: {
    fontSize: normalise(16),
    fontWeight: '600',
    color: 'black',
  },
  modalContentText: {
    fontSize: normalise(13),
    color: 'black',
  },
  informationIconContainer: {
    width: SCREEN_WIDTH / 4.5,
    height: SCREEN_HEIGHT / 8,
    borderRadius: 1000,
    backgroundColor: '#3282b8',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: normaliseV(-120),
  },
  informationIcon: {
    fontSize: normalise(40),
    color: 'white',
    fontWeight: '700',
  },
  calculateModalConfirmButton: {
    width: 90 + '%',
    height: 22 + '%',
    backgroundColor: '#3282b8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    position: 'absolute',
    bottom: normaliseV(40),
  },
  formConfirmText: {
    color: 'white',
    fontSize: normalise(16),
    fontWeight: '600',
  },
  modalText: {
    height: 38 + '%',
    marginTop: normaliseV(170),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normaliseH(40),
  },

  // Offer modal style
  offerModalConfirmButton: {
    width: 90 + '%',
    height: 22 + '%',
    backgroundColor: '#36ad51',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    position: 'absolute',
    bottom: normaliseV(40),
  },
  successIconContainer: {
    width: SCREEN_WIDTH / 4.5,
    height: SCREEN_HEIGHT / 8,
    borderRadius: 1000,
    backgroundColor: '#36ad51',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: normaliseV(-120),
  },
})
