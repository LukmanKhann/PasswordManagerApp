import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {TextInput, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import PasswordContext from '../PasswordContext/PasswordContext';
import {ThemeContext} from '../../Theme/ThemeProvider';
import {getStyles} from './styles';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Domain is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export default function AddPasswordScreen({navigation}) {
  const {addPassword} = useContext(PasswordContext);
  const {theme} = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);
  
  const styles = getStyles(theme);
  const isDark = theme === 'dark';

  const handleSave = values => {
    addPassword(values.title, values.username, values.password);
    navigation.navigate('Passwords');
  };

  return (
    <>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'} 
        backgroundColor={isDark ? '#000000' : '#FFFFFF'} 
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
    
            <Title style={styles.title}>Add Credentials</Title>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.formContainer}>
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
                <View style={styles.form}>
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

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputContainer}>
                      <Icon 
                        name="lock" 
                        size={20} 
                        color={isDark ? '#888888' : '#666666'} 
                        style={styles.inputIcon} 
                      />
                      <TextInput
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        secureTextEntry={!showPassword}
                        style={styles.input}
                        mode="outlined"
                        placeholder="Enter password"
                        placeholderTextColor={isDark ? '#666666' : '#999999'}
                        outlineStyle={styles.inputOutline}
                        contentStyle={styles.inputContent}
                        right={
                          <TextInput.Icon
                            icon={showPassword ? 'eye-off' : 'eye'}
                            iconColor={isDark ? '#888888' : '#666666'}
                            onPress={() => setShowPassword(!showPassword)}
                          />
                        }
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
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>

                  <Pressable
                    onPress={handleSubmit}
                    style={({pressed}) => [
                      styles.button,
                      pressed && styles.buttonPressed
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
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}