import {Platform} from 'react-native';
import _ActionSheetIOS from './ActionSheetIOS';
import _ActionSheetCustom from './ActionSheetCustom';

export const ActionSheetCustom = _ActionSheetCustom;

let ActionSheet: any;

if (Platform.OS === 'ios') {
  ActionSheet = _ActionSheetIOS;
} else {
  ActionSheet = _ActionSheetCustom;
}

export default ActionSheet;
