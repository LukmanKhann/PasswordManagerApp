import React from 'react';
import Snackbar from 'react-native-snackbar';

const CustomSnackbar = {
  show: ({
    message,
    duration = Snackbar.LENGTH_SHORT,
    backgroundColor = '#2E3440',
    textColor = '#ECEFF4',
    actionText = 'Close',
    onActionPress = Snackbar.dismiss,
  }) => {
    Snackbar.show({
      text: message,
      duration,
      backgroundColor,
      textColor,
      action: {
        text: actionText,
        textColor: '#000000',
        onPress: onActionPress,
      },
    });
  },

  success: (message, options = {}) => {
    CustomSnackbar.show({
      message,
      backgroundColor: '#A3BE8C',
      textColor: '#2E3440',
      actionText: 'Done',
      ...options,
    });
  },

  error: (message, options = {}) => {
    CustomSnackbar.show({
      message,
      backgroundColor: '#BF616A',
      textColor: '#ECEFF4',
      actionText: 'Dismiss',
      duration: Snackbar.LENGTH_LONG,
      ...options,
    });
  },

  warning: (message, options = {}) => {
    CustomSnackbar.show({
      message,
      backgroundColor: '#EBCB8B',
      textColor: '#2E3440',
      actionText: 'OK',
      ...options,
    });
  },

  info: (message, options = {}) => {
    CustomSnackbar.show({
      message,
      backgroundColor: '#5E81AC',
      textColor: '#ECEFF4',
      actionText: 'Got it',
      ...options,
    });
  },
};

export default CustomSnackbar;
