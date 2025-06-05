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
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {TextInput} from 'react-native-paper';
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
            <View style={styles.formContainer}>
              <Text style={styles.title}>Add Credentials</Text>
              <Text style={styles.subtitle}>
                Save your authentication details securely
              </Text>

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
                  <View style={styles.form}>
                    {/* Domain */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Domain</Text>
                      <View style={styles.inputContainer}>
                        <Icon
                          name="web"
                          size={20}
                          color={isDark ? '#888888' : '#666666'}
                          style={styles.inputIcon}
                        />
                        <TextInput
                          value={values.title}
                          onChangeText={handleChange('title')}
                          onBlur={handleBlur('title')}
                          style={styles.input}
                          mode="outlined"
                          placeholder="example.com"
                          placeholderTextColor={isDark ? '#666666' : '#999999'}
                          outlineStyle={styles.inputOutline}
                          contentStyle={styles.inputContent}
                          theme={{
                            colors: {
                              primary: isDark ? '#FFFFFF' : '#000000',
                              outline: isDark ? '#333333' : '#E0E0E0',
                              onSurfaceVariant: isDark ? '#888888' : '#666666',
                              background: 'transparent',
                            },
                          }}
                        />
                      </View>
                      {touched.title && errors.title && (
                        <Text style={styles.errorText}>{errors.title}</Text>
                      )}
                    </View>

                    {/* Username */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Username</Text>
                      <View style={styles.inputContainer}>
                        <Icon
                          name="account"
                          size={20}
                          color={isDark ? '#888888' : '#666666'}
                          style={styles.inputIcon}
                        />
                        <TextInput
                          value={values.username}
                          onChangeText={handleChange('username')}
                          onBlur={handleBlur('username')}
                          style={styles.input}
                          mode="outlined"
                          placeholder="your@email.com"
                          placeholderTextColor={isDark ? '#666666' : '#999999'}
                          outlineStyle={styles.inputOutline}
                          contentStyle={styles.inputContent}
                          theme={{
                            colors: {
                              primary: isDark ? '#FFFFFF' : '#000000',
                              outline: isDark ? '#333333' : '#E0E0E0',
                              onSurfaceVariant: isDark ? '#888888' : '#666666',
                              background: 'transparent',
                            },
                          }}
                        />
                      </View>
                      {touched.username && errors.username && (
                        <Text style={styles.errorText}>{errors.username}</Text>
                      )}
                    </View>

                    {/* Password */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Password</Text>
                      <View style={styles.inputContainer}>
                        <Icon
                          name="lock"
                          size={20}
                          color={isDark ? '#888888' : '#666666'}
                          style={styles.inputIcon}
                        />
                        <View style={styles.passwordInputWrapper}>
                          <TextInput
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            secureTextEntry={!showPassword}
                            style={styles.input}
                            mode="outlined"
                            placeholder="Enter password"
                            placeholderTextColor={
                              isDark ? '#666666' : '#999999'
                            }
                            outlineStyle={styles.inputOutline}
                            contentStyle={styles.inputContent}
                            theme={{
                              colors: {
                                primary: isDark ? '#FFFFFF' : '#000000',
                                outline: isDark ? '#333333' : '#E0E0E0',
                                onSurfaceVariant: isDark
                                  ? '#888888'
                                  : '#666666',
                                background: 'transparent',
                              },
                            }}
                          />
                          <Pressable
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeIconContainer}>
                            <Icon
                              name={showPassword ? 'eye-off' : 'eye'}
                              size={20}
                              color={isDark ? '#888888' : '#666666'}
                            />
                          </Pressable>
                        </View>
                      </View>
                      {touched.password && errors.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      )}
                    </View>

                    {/* Category Dropdown */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Category</Text>
                      <View>
                        <Icon
                          name="view-list"
                          size={20}
                          color={isDark ? '#888888' : '#666666'}
                          style={[styles.inputIcon, {marginTop: 18}]}
                        />
                        <Dropdown
                          data={categories}
                          labelField="label"
                          valueField="value"
                          placeholder="Select category"
                          searchPlaceholder="Search..."
                          value={values.category}
                          onChange={item =>
                            setFieldValue('category', item.value)
                          }
                          style={styles.dropdown}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          itemContainerStyle={{
                            backgroundColor: isDark ? '#000000' : '#FFFFFF',
                            borderRadius: 0,
                            borderColor: isDark ? '#2A2A2A' : '#E0E0E0',
                          }}
                          activeColor="grey"
                        />
                        {touched.category && errors.category && (
                          <Text style={styles.errorText}>
                            {errors.category}
                          </Text>
                        )}
                      </View>
                    </View>

                    {/* Submit Button */}
                    <Pressable
                      onPress={handleSubmit}
                      style={({pressed}) => [
                        styles.button,
                        pressed && styles.buttonPressed,
                      ]}>
                      <Icon
                        name="content-save"
                        size={20}
                        color={isDark ? '#000000' : '#FFFFFF'}
                        style={styles.buttonIcon}
                      />
                      <Text style={styles.buttonText}>Save Credentials</Text>
                    </Pressable>
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
