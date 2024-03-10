import {StyleSheet} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';

export const {hairlineWidth} = StyleSheet;
const buttonBg = '#fff';
const borderColor = '#ddd';
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.4,
    backgroundColor: '#000',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  body: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0)',
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleBox: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: buttonBg,
  },
  titleText: {
    color: '#757575',
    fontSize: 14,
  },
  messageBox: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: buttonBg,
  },
  messageText: {
    color: '#9a9a9a',
    fontSize: 12,
  },
  buttonBox: {
    height: 60,
    borderBottomWidth: 1,
    borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: buttonBg,
  },
  buttonText: {
    fontSize: 18,
  },
  cancelButtonBox: {
    height: 60,
    marginTop: 10,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: buttonBg,
    ...ifIphoneX(
      {
        marginBottom: 30,
      },
      {
        marginBottom: 10,
      },
    ),
  },
});
export default styles;
