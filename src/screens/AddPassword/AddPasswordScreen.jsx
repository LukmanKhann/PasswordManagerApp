import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {TextInput, Title} from 'react-native-paper';
import PasswordContext from '../PasswordContext/PasswordContext';
import {ThemeContext} from '../../Theme/ThemeProvider';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Domain is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export default function AddPasswordScreen({navigation}) {
  const {addPassword} = useContext(PasswordContext);
  const {theme} = useContext(ThemeContext);

  const handleSave = values => {
    addPassword(values.title, values.username, values.password);
    navigation.navigate('Passwords');
  };

  const styles = getStyles(theme);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Title style={styles.title}>Add New Credentials</Title>
        <Formik
          initialValues={{title: '', username: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={values => handleSave(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                label="Domain"
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                style={styles.input}
                mode="outlined"
                theme={{
                  colors: {
                    primary: theme === 'dark' ? '#ffffff' : '#121212',
                    background: theme === 'dark' ? '#121212' : '#F3F4F9',
                  },
                }}
              />
              {touched.title && errors.title && (
                <Text style={styles.errorText}>{errors.title}</Text>
              )}

              <TextInput
                label="Username"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                style={styles.input}
                mode="outlined"
                theme={{
                  colors: {
                    primary: theme === 'dark' ? '#ffffff' : '#121212',
                    background: theme === 'dark' ? '#121212' : '#F3F4F9',
                  },
                }}
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              <TextInput
                label="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                style={styles.input}
                mode="outlined"
                theme={{
                  colors: {
                    primary: theme === 'dark' ? '#ffffff' : '#121212',
                    background: theme === 'dark' ? '#121212' : '#F3F4F9',
                  },
                }}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <Pressable
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}>
                <Text style={styles.buttonText}>Save Password</Text>
              </Pressable>
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 24,
      backgroundColor: theme === 'dark' ? '#121212' : '#f5f5f5',
    },
    title: {
      fontSize: 24,
      marginBottom: 24,
      alignSelf: 'center',
      color: theme === 'dark' ? '#ffffff' : '#370100',
      fontWeight: '500',
    },
    input: {
      marginBottom: 5,
      backgroundColor: theme === 'dark' ? '#121212' : '#F3F4F9',
      borderRadius: 8,
    },
    button: {
      marginTop: 24,
      paddingVertical: 12,
      borderRadius: 25,
      backgroundColor: theme === 'dark' ? '#ffffff' : '#121212',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
    },
    buttonText: {
      color: theme === 'dark' ? '#121212' : '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    errorText: {
      fontSize: 12,
      color: 'red',
    },
  });
