import React from 'react';
import {Text} from 'react-native';

const SectionHeader = ({title, styles}) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

export default SectionHeader;
