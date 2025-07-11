import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const createStyles = isDark => ({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
  },
  container: {
    width: width * 0.9,
    maxWidth: 400,
    borderRadius: 20,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 25,
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
    paddingVertical: 20,
    paddingHorizontal: 20,
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
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  titleLight: {
    color: '#000000',
  },
  titleDark: {
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
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
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginVertical: 10,
    gap: 20,
  },
  passwordDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: isDark ? '#4a4a4a' : '#d0d0d0',
    backgroundColor: 'transparent',
  },
  passwordDotDark: {
    borderColor: '#4a4a4a',
  },
  passwordDotLight: {
    borderColor: '#d0d0d0',
  },
  passwordDotFilled: {
    backgroundColor: '#ff1744',
    borderColor: '#ff1744',
  },
  // Visible input for keyboard interaction
  visibleInput: {
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: isDark ? '#ff1744' : '#ff5252',
    backgroundColor: isDark ? '#23232b' : '#fff0f0',
    paddingHorizontal: 20,
    fontSize: 14,
    color: isDark ? '#fff' : '#222',
    textAlign: 'center',
  },
  // Clean, modern action buttons
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  biometricButton: {
    backgroundColor: isDark ? '#1a1a2e' : '#fff5f5',
    borderColor: '#ff1744',
  },
  backspaceButton: {
    backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5',
    borderColor: isDark ? '#404040' : '#e0e0e0',
  },
  tapToEnterButton: {
    backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5',
    borderColor: isDark ? '#404040' : '#e0e0e0',
  },
  footer: {
    alignItems: 'center',
    minHeight: 40,
    paddingHorizontal: 20,
  },
  forgotButton: {
    paddingVertical: 8,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: isDark ? '#ff1744' : '#ff5252',
    textDecorationColor: isDark ? '#ff1744' : '#ff5252',
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
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
    left: -1000,
  },
});
