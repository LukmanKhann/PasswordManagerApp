import * as React from 'react';
import {StyleSheet} from 'react-native';
import {FAB, Portal} from 'react-native-paper';

const CustomFabGroup = () => {
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  return (
    <Portal>
      <FAB.Group
        style={styles.fab}
        open={open}
        visible
        icon={open ? 'calendar-today' : 'plus'}
        color='#ffffff'
        actions={[
          {icon: 'plus', onPress: () => console.log('Pressed add')},
          {
            icon: 'star',
            label: 'Star',
            onPress: () => console.log('Pressed star'),
          },
          {
            icon: 'email',
            label: 'Email',
            onPress: () => console.log('Pressed email'),
          },
          {
            icon: 'bell',
            label: 'Remind',
            onPress: () => console.log('Pressed notifications'),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 60,
  },
});

export default CustomFabGroup;
