import React, {useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ActionSheetCustom} from './ActionSheet';

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: '#333',
    fontSize: 16,
  },
  value: {
    color: '#666',
    fontSize: 16,
    marginRight: 10,
  },
  optionValue: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const WriteItemEnum = ({name, dataKey, options, value, onChange}: any) => {
  const actionSheetRef = useRef<any>(null);
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <TouchableOpacity
        style={styles.optionValue}
        onPress={() => {
          actionSheetRef.current.show();
        }}>
        <Text style={styles.value}>{options[value]}</Text>
        <Icon name="chevron-down" color={'#999'} />
      </TouchableOpacity>
      <ActionSheetCustom
        ref={actionSheetRef}
        options={[...options, '取消']}
        cancelButtonIndex={options.length}
        onPress={v => {
          console.log('ActionSheetCustom', v);
          onChange({[dataKey]: v});
        }}
      />
    </View>
  );
};
export default WriteItemEnum;
