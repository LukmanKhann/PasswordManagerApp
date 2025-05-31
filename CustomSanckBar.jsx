import React from 'react';
import Snackbar from 'react-native-snackbar';

const CustomSnackbar = {
  show: (message) => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      action: {
        text: 'Close',
        onPress: Snackbar.dismiss,
      },
    });
  },
};

export default CustomSnackbar;
