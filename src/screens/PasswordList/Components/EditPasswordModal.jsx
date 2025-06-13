import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import {Modal, Portal, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {validationSchema} from '../utils/passwordListHelpers';

const EditPasswordModal = ({
  visible,
  onDismiss,
  onSave,
  title,
  username,
  password,
  passwordVisible,
  onTogglePasswordVisibility,
  isDark,
  loading,
  styles,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Edit Credentials</Text>
        </View>

        <Formik
          enableReinitialize
          initialValues={{title, username, password}}
          validationSchema={validationSchema}
          onSubmit={onSave}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <ScrollView style={styles.modalForm}>
              <View style={styles.inputContainer}>
                <TextInput
                  label="Domain"
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  style={styles.input}
                  mode="outlined"
                  outlineColor={isDark ? '#333333' : '#e0e0e0'}
                  activeOutlineColor={isDark ? '#ffffff' : '#000000'}
                  textColor={isDark ? '#ffffff' : '#000000'}
                  disabled={loading || isSubmitting}
                  theme={{
                    colors: {
                      onSurfaceVariant: isDark ? '#cccccc' : '#666666',
                      background: 'transparent',
                    },
                  }}
                />
                {touched.title && errors.title && (
                  <Text style={styles.errorText}>{errors.title}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Username"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  style={styles.input}
                  mode="outlined"
                  outlineColor={isDark ? '#333333' : '#e0e0e0'}
                  activeOutlineColor={isDark ? '#ffffff' : '#000000'}
                  textColor={isDark ? '#ffffff' : '#000000'}
                  disabled={loading || isSubmitting}
                  theme={{
                    colors: {
                      onSurfaceVariant: isDark ? '#cccccc' : '#666666',
                      background: 'transparent',
                    },
                  }}
                />
                {touched.username && errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    label="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry={!passwordVisible}
                    style={[styles.input, styles.passwordInput]}
                    mode="outlined"
                    outlineColor={isDark ? '#333333' : '#e0e0e0'}
                    activeOutlineColor={isDark ? '#ffffff' : '#000000'}
                    textColor={isDark ? '#ffffff' : '#000000'}
                    disabled={loading || isSubmitting}
                    theme={{
                      colors: {
                        onSurfaceVariant: isDark ? '#cccccc' : '#666666',
                        background: 'transparent',
                      },
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => onTogglePasswordVisibility(!passwordVisible)}
                    style={styles.passwordToggle}
                    disabled={loading || isSubmitting}>
                    <Icon
                      name={passwordVisible ? 'visibility' : 'visibility-off'}
                      size={20}
                      color={isDark ? '#ffffff' : '#000000'}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              <View style={styles.modalButtons}>
                <Pressable
                  onPress={onDismiss}
                  style={[styles.modalButton, styles.cancelButton]}
                  disabled={loading || isSubmitting}
                  android_ripple={{
                    color: isDark ? '#333333' : '#f0f0f0',
                    borderless: false,
                  }}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>

                <Pressable
                  onPress={handleSubmit}
                  style={[
                    styles.modalButton,
                    styles.saveButton,
                    (loading || isSubmitting) && styles.disabledButton,
                  ]}
                  disabled={loading || isSubmitting}
                  android_ripple={{
                    color: '#cc3a47',
                    borderless: false,
                  }}>
                  <Text style={styles.saveButtonText}>
                    {loading || isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          )}
        </Formik>
      </Modal>
    </Portal>
  );
};

export default EditPasswordModal;
