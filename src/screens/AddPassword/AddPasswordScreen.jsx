import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-element-dropdown';

import PasswordContext from '../../context/PasswordContext/PasswordContext';
import {ThemeContext} from '../../Theme/ThemeProvider';
import {getStyles} from './styles';
import {usePasswordList} from '../PasswordList/hooks/usePasswordList';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Domain is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  category: Yup.string().required('Category is required'),
});

export default function AddPasswordScreen({navigation}) {
  const {addPassword} = useContext(PasswordContext);
  const {theme} = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const styles = getStyles(theme);
  const isDark = theme === 'dark';

  const categories = [
    {label: 'Social', value: 'social'},
    {label: 'Work', value: 'work'},
    {label: 'Finance', value: 'finance'},
    {label: 'Games', value: 'games'},
    {label: 'Personal', value: 'personal'},
    {label: 'Shopping', value: 'shopping'},
    {label: 'Entertainment', value: 'entertainment'},
    {label: 'Others', value: 'others'},
  ];

  const {showSnackbar} = usePasswordList();

  const handleSave = values => {
    addPassword(
      values.title,
      values.username,
      values.password,
      values.category,
    );
    showSnackbar('Credentials saved successfully', 'success');
    navigation.navigate('Passwords');
  };

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#000000' : '#FFFFFF'}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {/* Header Section */}
            <View style={styles.headerSection}>
              <View style={styles.headerIconContainer}>
                <Icon
                  name="shield-plus"
                  size={32}
                  color={isDark ? '#FFFFFF' : '#000000'}
                />
              </View>
              <Text style={styles.title}>Add New Credential</Text>
              <Text style={styles.subtitle}>
                Secure your digital identity with encrypted storage
              </Text>
            </View>

            <Formik
              initialValues={{
                title: '',
                username: '',
                password: '',
                category: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values, {resetForm}) => {
                handleSave(values);
                resetForm();
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.formContainer}>
                  {/* Domain Input */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Domain</Text>
                    <View
                      style={[
                        styles.inputContainer,
                        focusedField === 'title' &&
                          styles.inputContainerFocused,
                        touched.title &&
                          errors.title &&
                          styles.inputContainerError,
                      ]}>
                      <View style={styles.inputIconContainer}>
                        <Icon
                          name="web"
                          size={20}
                          color={
                            focusedField === 'title'
                              ? isDark
                                ? '#FFFFFF'
                                : '#000000'
                              : isDark
                              ? '#666666'
                              : '#999999'
                          }
                        />
                      </View>
                      <TextInput
                        value={values.title}
                        onChangeText={handleChange('title')}
                        onBlur={e => {
                          handleBlur('title')(e);
                          setFocusedField(null);
                        }}
                        onFocus={() => setFocusedField('title')}
                        style={styles.textInput}
                        placeholder="Enter domain (e.g., google.com)"
                        placeholderTextColor={isDark ? '#666666' : '#999999'}
                      />
                    </View>
                    {touched.title && errors.title && (
                      <View style={styles.errorContainer}>
                        <Icon name="alert-circle" size={12} color="#FF4444" />
                        <Text style={styles.errorText}>{errors.title}</Text>
                      </View>
                    )}
                  </View>

                  {/* Username Input */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <View
                      style={[
                        styles.inputContainer,
                        focusedField === 'username' &&
                          styles.inputContainerFocused,
                        touched.username &&
                          errors.username &&
                          styles.inputContainerError,
                      ]}>
                      <View style={styles.inputIconContainer}>
                        <Icon
                          name="account"
                          size={20}
                          color={
                            focusedField === 'username'
                              ? isDark
                                ? '#FFFFFF'
                                : '#000000'
                              : isDark
                              ? '#666666'
                              : '#999999'
                          }
                        />
                      </View>
                      <TextInput
                        value={values.username}
                        onChangeText={handleChange('username')}
                        onBlur={e => {
                          handleBlur('username')(e);
                          setFocusedField(null);
                        }}
                        onFocus={() => setFocusedField('username')}
                        style={styles.textInput}
                        placeholder="Enter username or email"
                        placeholderTextColor={isDark ? '#666666' : '#999999'}
                        autoCapitalize="none"
                        keyboardType="email-address"
                      />
                    </View>
                    {touched.username && errors.username && (
                      <View style={styles.errorContainer}>
                        <Icon name="alert-circle" size={12} color="#FF4444" />
                        <Text style={styles.errorText}>{errors.username}</Text>
                      </View>
                    )}
                  </View>

                  {/* Password Input */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View
                      style={[
                        styles.inputContainer,
                        focusedField === 'password' &&
                          styles.inputContainerFocused,
                        touched.password &&
                          errors.password &&
                          styles.inputContainerError,
                      ]}>
                      <View style={styles.inputIconContainer}>
                        <Icon
                          name="lock"
                          size={20}
                          color={
                            focusedField === 'password'
                              ? isDark
                                ? '#FFFFFF'
                                : '#000000'
                              : isDark
                              ? '#666666'
                              : '#999999'
                          }
                        />
                      </View>
                      <TextInput
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={e => {
                          handleBlur('password')(e);
                          setFocusedField(null);
                        }}
                        onFocus={() => setFocusedField('password')}
                        style={styles.textInput}
                        placeholder="Enter password"
                        placeholderTextColor={isDark ? '#666666' : '#999999'}
                        secureTextEntry={!showPassword}
                      />
                      <Pressable
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIconContainer}>
                        <Icon
                          name={showPassword ? 'eye-off' : 'eye'}
                          size={20}
                          color={isDark ? '#666666' : '#999999'}
                        />
                      </Pressable>
                    </View>
                    {touched.password && errors.password && (
                      <View style={styles.errorContainer}>
                        <Icon name="alert-circle" size={12} color="#FF4444" />
                        <Text style={styles.errorText}>{errors.password}</Text>
                      </View>
                    )}
                  </View>

                  {/* Category Dropdown */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Category</Text>
                    <View
                      style={[
                        styles.inputContainer,
                        touched.category &&
                          errors.category &&
                          styles.inputContainerError,
                      ]}>
                      <View style={styles.inputIconContainer}>
                        <Icon
                          name="folder"
                          size={20}
                          color={isDark ? '#666666' : '#999999'}
                        />
                      </View>
                      <Dropdown
                        data={categories}
                        labelField="label"
                        valueField="value"
                        placeholder="Select category"
                        searchPlaceholder="Search categories..."
                        value={values.category}
                        onChange={item => setFieldValue('category', item.value)}
                        style={styles.dropdown}
                        placeholderStyle={styles.dropdownPlaceholder}
                        selectedTextStyle={styles.dropdownSelectedText}
                        inputSearchStyle={styles.dropdownSearch}
                        iconStyle={styles.dropdownIcon}
                        containerStyle={styles.dropdownContainer}
                        itemTextStyle={styles.dropdownItemText}
                        activeColor={isDark ? '#333333' : '#F5F5F5'}
                      />
                    </View>
                    {touched.category && errors.category && (
                      <View style={styles.errorContainer}>
                        <Icon name="alert-circle" size={12} color="#FF4444" />
                        <Text style={styles.errorText}>{errors.category}</Text>
                      </View>
                    )}
                  </View>

                  {/* Submit Button */}
                  <View style={styles.buttonContainer}>
                    <Pressable
                      onPress={handleSubmit}
                      style={({pressed}) => [
                        styles.submitButton,
                        pressed && styles.submitButtonPressed,
                      ]}>
                      <Icon
                        name="shield-check"
                        size={20}
                        color={isDark ? '#000000' : '#FFFFFF'}
                      />
                      <Text style={styles.submitButtonText}>
                        Save Credential
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
