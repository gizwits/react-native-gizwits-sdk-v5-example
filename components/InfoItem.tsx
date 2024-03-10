import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
    fontSize: 12,
    paddingLeft: 10,
    flex: 1,
    textAlign: 'right',
  },
});
const InfoItem = ({name, value}: any) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};
export default InfoItem;
