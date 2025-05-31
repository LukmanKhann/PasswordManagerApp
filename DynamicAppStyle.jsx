const lightColorSet = {
  mainThemeBackgroundColor: '#f5f5f5',
  backgroungShadowColor: '#000000',
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  contentTextColor: '#66665e',
  backgroundListItemColor: '#ffffff',
  placeHolderTextColor: '#888888',
  buttonBackgroundColor: '#000000',
  buttonTextColor: '#ffffff',
};

const darkColorSet = {
  mainThemeBackgroundColor: '#000000',
  backgroungShadowColor: '#ffffff',
  backgroundColor: '#000000',
  textColor: '#FFFFFF',
  buttonTextColor: '#000000',
  contentTextColor: '#e0eae8',
  buttonBackgroundColor: '#ffffff',
};
const iconSet ={
  profileIcon: require('../assets/IconImage/profileImage.jpg'),
}

const colorSet = {
  ...lightColorSet,
  light: lightColorSet,
  dark: darkColorSet,
};
const DynamicThemeStyle = {
  colorSet,
  iconSet,
};
export default DynamicThemeStyle;
