import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../Theme/ThemeProvider';
import {FIREBASE_AUTH} from '../../Firebase/FirebaseConfig';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {theme} = useContext(ThemeContext);

  const isDark = theme === 'dark';

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#ffffff',
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 50,
    },
    logoIcon: {
      marginBottom: 20,
    },
    logoText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#cccccc' : '#666666',
      textAlign: 'center',
    },
    formContainer: {
      marginBottom: 30,
    },
    inputContainer: {
      marginBottom: 20,
      position: 'relative',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: isDark ? '#333333' : '#e0e0e0',
      borderRadius: 12,
      backgroundColor: isDark ? '#111111' : '#f8f8f8',
      paddingHorizontal: 15,
      height: 55,
    },
    inputWrapperFocused: {
      borderColor: isDark ? '#ffffff' : '#000000',
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
    },
    inputIcon: {
      marginRight: 12,
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      color: isDark ? '#ffffff' : '#000000',
    },
    eyeIcon: {
      padding: 5,
    },
    loginButton: {
      backgroundColor: isDark ? '#ffffff' : '#000000',
      borderRadius: 12,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: isDark ? '#ffffff' : '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    loginButtonText: {
      color: isDark ? '#000000' : '#ffffff',
      fontSize: 18,
      fontWeight: '600',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: isDark ? '#333333' : '#e0e0e0',
    },
    dividerText: {
      marginHorizontal: 16,
      color: isDark ? '#cccccc' : '#666666',
      fontSize: 14,
    },
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    signupText: {
      color: isDark ? '#cccccc' : '#666666',
      fontSize: 16,
    },
    signupLink: {
      color: isDark ? '#ffffff' : '#000000',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 5,
    },
    forgotPassword: {
      alignSelf: 'center',
      marginBottom: 30,
    },
    forgotPasswordText: {
      color: isDark ? '#cccccc' : '#666666',
      fontSize: 14,
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons
            name="shield-lock"
            size={80}
            color={isDark ? '#ffffff' : '#000000'}
            style={styles.logoIcon}
          />
          <Text style={styles.logoText}>SecureVault</Text>
          <Text style={styles.subtitle}>Your passwords, protected</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color={isDark ? '#cccccc' : '#666666'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Email address"
                placeholderTextColor={isDark ? '#666666' : '#999999'}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={24}
                color={isDark ? '#cccccc' : '#666666'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor={isDark ? '#666666' : '#999999'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}>
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={isDark ? '#cccccc' : '#666666'}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}>
            <Text style={styles.loginButtonText}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
