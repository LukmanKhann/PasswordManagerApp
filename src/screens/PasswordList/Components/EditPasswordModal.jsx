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
import {Dropdown} from 'react-native-element-dropdown';
import {validationSchema} from '../utils/passwordListHelpers';

const EditPasswordModal = ({
  visible,
  onDismiss,
  onSave,
  title,
  username,
  password,
  category,
  passwordVisible,
  onTogglePasswordVisibility,
  isDark,
  loading,
  styles,
}) => {
  // Define available categories to match AddPasswordScreen
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
          initialValues={{
            title,
            username,
            password,
            category: category || 'others',
          }}
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
            setFieldValue,
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

              {/* Category Dropdown */}
              <View style={styles.inputContainer}>
                <Text
                  style={[
                    styles.inputLabel,
                    {color: isDark ? '#cccccc' : '#666666'},
                  ]}>
                  Category
                </Text>
                <View style={styles.dropdownContainer}>
                  <Icon
                    name="category"
                    size={20}
                    color={isDark ? '#888888' : '#666666'}
                    style={styles.dropdownIcon}
                  />
                  <Dropdown
                    data={categories}
                    labelField="label"
                    valueField="value"
                    placeholder="Select category"
                    searchPlaceholder="Search..."
                    value={values.category}
                    onChange={item => setFieldValue('category', item.value)}
                    style={[
                      styles.dropdown,
                      {
                        backgroundColor: isDark ? 'transparent' : 'transparent',
                        borderColor: isDark ? '#333333' : '#e0e0e0',
                        borderWidth: 1,
                        borderRadius: 4,
                      },
                    ]}
                    placeholderStyle={[
                      styles.placeholderStyle,
                      {color: isDark ? '#666666' : '#999999'},
                    ]}
                    selectedTextStyle={[
                      styles.selectedTextStyle,
                      {color: isDark ? '#ffffff' : '#000000'},
                    ]}
                    inputSearchStyle={[
                      styles.inputSearchStyle,
                      {
                        backgroundColor: isDark ? '#333333' : '#f0f0f0',
                        color: isDark ? '#ffffff' : '#000000',
                      },
                    ]}
                    iconStyle={styles.iconStyle}
                    itemContainerStyle={{
                      backgroundColor: isDark ? '#333333' : '#ffffff',
                      borderBottomColor: isDark ? '#555555' : '#e0e0e0',
                    }}
                    itemTextStyle={{
                      color: isDark ? '#ffffff' : '#000000',
                    }}
                    activeColor={isDark ? '#555555' : '#f0f0f0'}
                    disabled={loading}
                  />
                </View>
                {touched.category && errors.category && (
                  <Text style={styles.errorText}>{errors.category}</Text>
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
