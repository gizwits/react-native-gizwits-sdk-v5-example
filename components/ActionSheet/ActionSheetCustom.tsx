import React from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Animated,
  ScrollView,
  Easing,
  Modal,
} from 'react-native';
import * as utils from './utils';
import styles2 from './styles';
// import { ThemeCompetent } from '../../utils/DarkMode';

const WARN_COLOR = '#FF3B30';
const MAX_HEIGHT = Dimensions.get('window').height * 0.7;

interface IState {
  visible: boolean;
  sheetAnim: any;
}

interface IProps {
  styles?: any;
  onPress?: (index: number) => void;
  cancelButtonIndex?: any;
  title?: string;
  message?: string;
  options: any;
  tintColor?: string;
  buttonUnderlayColor?: string;
  destructiveButtonIndex?: any;
}

// @ThemeCompetent
class ActionSheet extends React.Component<IProps, IState> {
  static defaultProps = {
    tintColor: '#007AFF',
    buttonUnderlayColor: '#F4F4F4',
    onPress: () => {},
    styles: {},
  };

  translateY: number;

  scrollEnabled: boolean;

  constructor(props: IProps) {
    super(props);
    this.scrollEnabled = false;
    this.translateY = this._calculateHeight(props);
    this.state = {
      visible: false,
      sheetAnim: new Animated.Value(this.translateY),
    };
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.translateY = this._calculateHeight(nextProps);
  }

  get styles() {
    const {styles} = this.props;
    const obj: any = {};
    const ds: any = styles2;
    Object.keys(ds).forEach(key => {
      const arr = [ds[key]];
      if (styles[key]) {
        arr.push(styles[key]);
      }
      obj[key] = arr;
    });
    return obj;
  }

  show = () => {
    this.setState({visible: true}, () => {
      this.showSheet();
    });
  };

  hide = (index: number) => {
    const {onPress} = this.props;
    this._hideSheet(() => {
      this.setState({visible: false}, () => {
        onPress && onPress(index);
      });
    });
  };

  cancel = () => {
    const {cancelButtonIndex} = this.props;
    // 保持和 ActionSheetIOS 一致，
    // 未设置 cancelButtonIndex 时，点击背景不隐藏 ActionSheet
    if (utils.isset(cancelButtonIndex)) {
      this.hide(cancelButtonIndex);
    }
  };

  showSheet = () => {
    const {sheetAnim} = this.state;
    Animated.timing(sheetAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  _hideSheet(callback: any) {
    const {sheetAnim} = this.state;
    Animated.timing(sheetAnim, {
      toValue: this.translateY,
      duration: 200,
      useNativeDriver: true,
    }).start(callback);
  }

  /**
   * elements: titleBox, messageBox, buttonBox, cancelButtonBox
   * box size: height, marginTop, marginBottom
   */
  _calculateHeight(props: IProps) {
    const {styles} = this;

    const getHeight = (name: any) => {
      const style = styles[name][styles[name].length - 1];
      let h = 0;
      ['height', 'marginTop', 'marginBottom'].forEach(attrName => {
        if (typeof style[attrName] !== 'undefined') {
          h += style[attrName];
        }
      });
      return h;
    };

    let height = 0;
    if (props.title) {
      height += getHeight('titleBox');
    }
    if (props.message) {
      height += getHeight('messageBox');
    }
    if (utils.isset(props.cancelButtonIndex)) {
      height += getHeight('cancelButtonBox');
      height += (props.options.length - 1) * getHeight('buttonBox');
    } else {
      height += props.options.length * getHeight('buttonBox');
    }

    if (height > MAX_HEIGHT) {
      this.scrollEnabled = true;
      height = MAX_HEIGHT;
    } else {
      this.scrollEnabled = false;
    }

    return height;
  }

  _renderTitle() {
    const {title} = this.props;
    const {styles} = this;
    if (!title) {
      return null;
    }
    return (
      <View style={styles.titleBox}>
        {React.isValidElement(title) ? (
          title
        ) : (
          <Text style={styles.titleText}>{title}</Text>
        )}
      </View>
    );
  }

  _renderMessage() {
    const {message} = this.props;
    const {styles} = this;
    if (!message) {
      return null;
    }
    return (
      <View style={styles.messageBox}>
        {React.isValidElement(message) ? (
          message
        ) : (
          <Text style={styles.messageText}>{message}</Text>
        )}
      </View>
    );
  }

  _renderCancelButton() {
    const {options, cancelButtonIndex} = this.props;
    if (!utils.isset(cancelButtonIndex)) {
      return null;
    }
    return this._createButton(options[cancelButtonIndex], cancelButtonIndex);
  }

  _createButton(title: string, index: any) {
    const {styles} = this;
    const {
      // buttonUnderlayColor,
      cancelButtonIndex,
      destructiveButtonIndex,
      tintColor,
      options,
    } = this.props;
    const fontColor = destructiveButtonIndex === index ? WARN_COLOR : tintColor;
    const buttonBoxStyle =
      cancelButtonIndex === index ? styles.cancelButtonBox : styles.buttonBox;
    return (
      <TouchableHighlight
        key={index}
        activeOpacity={1}
        underlayColor={'#fff'}
        style={[
          buttonBoxStyle,
          index === 0
            ? {borderTopLeftRadius: 14, borderTopRightRadius: 14}
            : {},
          options.length - 2 === index
            ? {
                borderBottomLeftRadius: 14,
                borderBottomRightRadius: 14,
              }
            : {},
        ]}
        onPress={() => this.hide(index)}>
        {React.isValidElement(title) ? (
          title
        ) : (
          <Text style={[styles.buttonText, {color: fontColor}]}>{title}</Text>
        )}
      </TouchableHighlight>
    );
  }

  _renderOptions() {
    const {cancelButtonIndex, options} = this.props;
    return options.map((title: string, index: any) => {
      return cancelButtonIndex === index
        ? null
        : this._createButton(title, index);
    });
  }

  render() {
    const {styles} = this;
    const {visible, sheetAnim} = this.state;
    return (
      <Modal
        visible={visible}
        animationType="none"
        transparent
        onRequestClose={this.cancel}>
        <View style={[styles.wrapper]}>
          <Text style={[styles.overlay]} onPress={this.cancel} />
          <Animated.View
            style={[
              styles.body,
              {
                height: this.translateY,
                transform: [{translateY: sheetAnim}],
              },
            ]}>
            {this._renderTitle()}
            {this._renderMessage()}
            <ScrollView scrollEnabled={this.scrollEnabled}>
              {this._renderOptions()}
            </ScrollView>
            {this._renderCancelButton()}
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

export default ActionSheet;
