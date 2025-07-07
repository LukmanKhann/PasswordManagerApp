import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const createStyles = isDark => ({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.9,
    maxWidth: 400,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  containerLight: {
    backgroundColor: '#ffffff',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerIconLight: {
    backgroundColor: '#ffebee',
  },
  headerIconDark: {
    backgroundColor: '#2a1a1a',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  titleLight: {
    color: '#000000',
  },
  titleDark: {
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  subtitleLight: {
    color: '#666666',
  },
  subtitleDark: {
    color: '#cccccc',
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  passwordDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    borderWidth: 2,
  },
  passwordDotLight: {
    borderColor: '#e0e0e0',
    backgroundColor: '#f5f5f5',
  },
  passwordDotDark: {
    borderColor: '#404040',
    backgroundColor: '#2a2a2a',
  },
  passwordDotFilled: {
    backgroundColor: '#ff1744',
    borderColor: '#ff1744',
  },
  keypad: {
    marginBottom: 24,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  numberButtonContainer: {
    width: (width * 0.9 - 48 - 32) / 3,
    maxWidth: 80,
    aspectRatio: 1,
  },
  numberButton: {
    flex: 1,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  numberButtonLight: {
    backgroundColor: '#ffffff',
    borderColor: '#f0f0f0',
  },
  numberButtonDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#404040',
  },
  numberText: {
    fontSize: 24,
    fontWeight: '600',
  },
  numberTextLight: {
    color: '#000000',
  },
  numberTextDark: {
    color: '#ffffff',
  },
  actionButton: {
    width: (width * 0.9 - 48 - 32) / 3,
    maxWidth: 80,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  biometricButton: {
    backgroundColor: '#ffebee',
  },
  backspaceButton: {
    backgroundColor: 'transparent',
  },
  footer: {
    alignItems: 'center',
    minHeight: 40,
  },
  forgotButton: {
    paddingVertical: 8,
  },
  forgotText: {
    fontSize: 16,
    fontWeight: '500',
  },
  forgotTextLight: {
    color: '#ff1744',
  },
  forgotTextDark: {
    color: '#ff1744',
  },
  attemptsText: {
    fontSize: 14,
    marginTop: 8,
  },
  attemptsTextLight: {
    color: '#666666',
  },
  attemptsTextDark: {
    color: '#cccccc',
  },
});
