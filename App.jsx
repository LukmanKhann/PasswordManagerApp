import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigator from './src/Navigations/AppNavigator';
import {PaperProvider} from 'react-native-paper';
import {PasswordProvider} from './src/screens/PasswordContext/PasswordContext';
import {collection, addDoc, getDocs} from 'firebase/firestore';

// try {
//   const docRef = await addDoc(collection(db, 'users'), {
//     first: 'Ada',
//     last: 'Lovelace',
//     born: 1815,
//   });
//   console.log('Document written with ID: ', docRef.id);
// } catch (e) {
//   console.error('Error adding document: ', e);
// }

// try {
//   const docRef = await addDoc(collection(db, 'users'), {
//     first: 'Alan',
//     middle: 'Mathison',
//     last: 'Turing',
//     born: 1912,
//   });

//   console.log('Document written with ID: ', docRef.id);
// } catch (e) {
//   console.error('Error adding document: ', e);
// }

// const querySnapshot = await getDocs(collection(db, 'users'));
// querySnapshot.forEach(doc => {
//   console.log('Query snapshot functions::', `${doc.id} => ${doc.data()}`);
// });

const App = () => {
  return (
    <PasswordProvider>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </PasswordProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
