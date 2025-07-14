import React from 'react';
import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Minimum 4 characters required')
    .max(32, 'Maximum 32 characters allowed')
    .required('Password length is required'),
});

const PasswordForm = ({
  styles,
  isDark,
  sliderValue,
  setSliderValue,
  useSlider,
  setUseSlider,
  lowerCase,
  setLowerCase,
  upperCase,
  setUpperCase,
  numbers,
  setNumbers,
  symbols,
  setSymbols,
  onSubmit,
  onReset,
}) => {
  return (
    <Formik
      initialValues={{
        passwordLength: useSlider ? sliderValue.toString() : '',
      }}
      validationSchema={passwordSchema}
      onSubmit={values => {
        const length = useSlider ? sliderValue : Number(values.passwordLength);
        onSubmit(length);
      }}>
      {({
        values,
        errors,
        touched,
        isValid,
        handleChange,
        handleSubmit,
        handleReset,
        setFieldTouched,
        setFieldValue,
      }) => (
        <>
          {/* Password Length Input */}
          <View style={styles.inputSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Password Length</Text>
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => {
                  setUseSlider(!useSlider);
                  if (!useSlider) {
                    // Switching to slider, set form value to slider value
                    setFieldValue('passwordLength', sliderValue.toString());
                  } else {
                    // Switching to text input, keep current value or set to slider value
                    const currentValue =
                      values.passwordLength || sliderValue.toString();
                    setSliderValue(
                      Math.min(32, Math.max(4, Number(currentValue) || 8)),
                    );
                  }
                }}
                activeOpacity={0.7}>
                <Icon
                  name={useSlider ? 'text-fields' : 'tune'}
                  size={18}
                  color={isDark ? '#ffffff' : '#000000'}
                />
                <Text style={styles.toggleButtonText}>
                  {useSlider ? 'Text' : 'Slider'}
                </Text>
              </TouchableOpacity>
            </View>

            {useSlider ? (
              <View style={styles.sliderContainer}>
                <View style={styles.sliderHeader}>
                  <Text style={styles.sliderLabel}>Length: {sliderValue}</Text>
                  <View style={styles.sliderRange}>
                    <Text style={styles.sliderRangeText}>4</Text>
                    <Text style={styles.sliderRangeText}>32</Text>
                  </View>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={4}
                  maximumValue={32}
                  value={sliderValue}
                  onValueChange={value => {
                    const roundedValue = Math.round(value);
                    setSliderValue(roundedValue);
                    setFieldValue('passwordLength', roundedValue.toString());
                  }}
                  minimumTrackTintColor={isDark ? '#ffffff' : '#000000'}
                  maximumTrackTintColor={isDark ? '#444444' : '#cccccc'}
                  thumbStyle={styles.sliderThumb}
                  trackStyle={styles.sliderTrack}
                  step={1}
                />
              </View>
            ) : (
              <View style={styles.inputContainer}>
                <Icon
                  name="straighten"
                  size={20}
                  color={isDark ? '#666666' : '#999999'}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  value={values.passwordLength}
                  onChangeText={text => {
                    handleChange('passwordLength')(text);
                    const numValue = Number(text);
                    if (numValue >= 4 && numValue <= 32) {
                      setSliderValue(numValue);
                    }
                  }}
                  placeholder="Enter length (4-32)"
                  placeholderTextColor={isDark ? '#666666' : '#999999'}
                  keyboardType="numeric"
                  onBlur={() => setFieldTouched('passwordLength')}
                  maxLength={2}
                />
              </View>
            )}

            {touched.passwordLength && errors.passwordLength && (
              <View style={styles.errorContainer}>
                <Icon name="error-outline" size={16} color="#ff4444" />
                <Text style={styles.errorText}>{errors.passwordLength}</Text>
              </View>
            )}
          </View>

          {/* Character Options */}
          <View style={styles.optionsSection}>
            <Text style={styles.sectionTitle}>Character Types</Text>

            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => setLowerCase(!lowerCase)}
              activeOpacity={0.7}>
              <View style={styles.optionLabel}>
                <Icon
                  name="text-fields"
                  size={20}
                  color={isDark ? '#ffffff' : '#000000'}
                />
                <Text style={styles.optionText}>Lowercase Letters</Text>
              </View>
              <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                  size={20}
                  fillColor={isDark ? '#ffffff' : '#000000'}
                  unfillColor="transparent"
                  iconStyle={{
                    borderColor: isDark ? '#ffffff' : '#000000',
                  }}
                  disableBuiltInState
                  isChecked={lowerCase}
                  onPress={() => setLowerCase(!lowerCase)}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => setUpperCase(!upperCase)}
              activeOpacity={0.7}>
              <View style={styles.optionLabel}>
                <Icon
                  name="format-size"
                  size={20}
                  color={isDark ? '#ffffff' : '#000000'}
                />
                <Text style={styles.optionText}>Uppercase Letters</Text>
              </View>
              <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                  size={20}
                  fillColor={isDark ? '#ffffff' : '#000000'}
                  unfillColor="transparent"
                  iconStyle={{
                    borderColor: isDark ? '#ffffff' : '#000000',
                  }}
                  disableBuiltInState
                  isChecked={upperCase}
                  onPress={() => setUpperCase(!upperCase)}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => setNumbers(!numbers)}
              activeOpacity={0.7}>
              <View style={styles.optionLabel}>
                <Icon
                  name="tag"
                  size={20}
                  color={isDark ? '#ffffff' : '#000000'}
                />
                <Text style={styles.optionText}>Numbers</Text>
              </View>
              <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                  size={20}
                  fillColor={isDark ? '#ffffff' : '#000000'}
                  unfillColor="transparent"
                  iconStyle={{
                    borderColor: isDark ? '#ffffff' : '#000000',
                  }}
                  disableBuiltInState
                  isChecked={numbers}
                  onPress={() => setNumbers(!numbers)}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => setSymbols(!symbols)}
              activeOpacity={0.7}>
              <View style={styles.optionLabel}>
                <Icon
                  name="code"
                  size={20}
                  color={isDark ? '#ffffff' : '#000000'}
                />
                <Text style={styles.optionText}>Special Characters</Text>
              </View>
              <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                  size={20}
                  fillColor={isDark ? '#ffffff' : '#000000'}
                  unfillColor="transparent"
                  iconStyle={{
                    borderColor: isDark ? '#ffffff' : '#000000',
                  }}
                  disableBuiltInState
                  isChecked={symbols}
                  onPress={() => setSymbols(!symbols)}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.primaryButton, !isValid && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={!isValid}
              activeOpacity={0.8}>
              <Icon
                name="vpn-key"
                size={20}
                color={!isValid ? '#666666' : isDark ? '#000000' : '#ffffff'}
              />
              <Text
                style={[
                  styles.primaryButtonText,
                  !isValid && styles.disabledButtonText,
                ]}>
                Generate Password
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                handleReset();
                onReset();
              }}
              activeOpacity={0.8}>
              <Icon
                name="refresh"
                size={20}
                color={isDark ? '#ffffff' : '#000000'}
              />
              <Text style={styles.secondaryButtonText}>Reset All</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Formik>
  );
};

export default PasswordForm;
