import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import Slider from '@react-native-community/slider';
import {THEME_COLOR} from '../../../config/color';
import CollapsibleCard from '../../../components/CollapsibleCard';
import {RoundButton} from '../../../components/Button';
import InfoItem from '../../../components/InfoItem';
import WriteItemEnum from '../../../components/WriteItemEnum';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  wapper: {
    height: 300,
  },
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
    fontSize: 14,
  },
  numberItem: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
const WriteItemNumber = ({
  name,
  dataKey,
  step = 1,
  min = 0,
  max = 100,
  value = 0,
  onChange = () => {},
}: any) => {
  return (
    <View style={[styles.item, {flexDirection: 'column'}]}>
      <View style={styles.numberItem}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Slider
        style={{width: '100%', height: 40}}
        minimumValue={min}
        maximumValue={max}
        value={value}
        thumbTintColor={THEME_COLOR}
        minimumTrackTintColor={THEME_COLOR}
        step={step}
        onValueChange={v => {
          onChange({
            [dataKey]: v,
          });
        }}
      />
    </View>
  );
};

const WriteItemBool = ({
  name,
  dataKey,
  value = false,
  onChange = () => {},
}: any) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Switch
        value={value}
        trackColor={{
          false: '#ddd',
          true: THEME_COLOR,
        }}
        thumbColor={Platform.OS === 'android' ? '#fff' : undefined}
        onChange={() => {
          onChange({
            [dataKey]: !value,
          });
        }}
      />
    </View>
  );
};
const WriteItemRaw = ({name, dataKey, value, onChange}: any) => {
  return <View />;
};

export default ({
  config,
  deviceData = {},
  onSend,
  onGetDp,
}: {
  config: any;
  deviceData: any;
  onSend: any;
  onGetDp: any;
}) => {
  const [data, setData] = useState<any>({});
  const keysRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    setData(deviceData);
  }, [deviceData]);
  const send = useCallback(() => {
    const cmd: any = {};
    Array.from(keysRef.current).map(item => {
      cmd[item] = data[item];
    });
    if (Object.keys(cmd).length > 0) {
      onSend(cmd);
    }
    keysRef.current.clear();
  }, [data, onSend]);
  return (
    <CollapsibleCard
      right={
        <View style={{flexDirection: 'row', paddingRight: 10}}>
          <RoundButton icon="spinner" onPress={onGetDp} />
          <RoundButton icon="paper-plane" onPress={send} />
        </View>
      }
      title="设备控制">
      <View style={styles.wapper}>
        <ScrollView nestedScrollEnabled style={styles.container}>
          {config.map((item: any) => {
            const dataKey = item.key.replace('entity0.', '');
            const name = item.title;
            switch (item.type) {
              case 'QMultilineElement': {
                return (
                  <WriteItemRaw
                    key={dataKey}
                    dataKey={dataKey}
                    onChange={(v: any) => {
                      setData({...data, ...v});
                      keysRef.current.add(Object.keys(v)[0]);
                    }}
                    name={name}
                    value={data[dataKey]}
                  />
                );
              }
              case 'QBooleanElement': {
                return (
                  <WriteItemBool
                    key={dataKey}
                    onChange={(v: any) => {
                      setData({...data, ...v});
                      keysRef.current.add(Object.keys(v)[0]);
                    }}
                    dataKey={dataKey}
                    name={name}
                    value={data[dataKey]}
                  />
                );
              }
              case 'QLabelElement': {
                return (
                  <InfoItem key={dataKey} name={name} value={data[dataKey]} />
                );
              }
              case 'QRadioElement': {
                return (
                  <WriteItemEnum
                    key={dataKey}
                    options={item.items}
                    onChange={(v: any) => {
                      setData({...data, ...v});
                      keysRef.current.add(Object.keys(v)[0]);
                    }}
                    dataKey={dataKey}
                    name={name}
                    value={data[dataKey]}
                  />
                );
              }
              case 'QFloatElement': {
                const uintSpec = item.object.uint_spec;
                return (
                  <WriteItemNumber
                    key={dataKey}
                    min={uintSpec.min}
                    max={uintSpec.max}
                    step={uintSpec.step}
                    onChange={(v: any) => {
                      setData({...data, ...v});
                      keysRef.current.add(Object.keys(v)[0]);
                    }}
                    dataKey={dataKey}
                    name={name}
                    value={data[dataKey]}
                  />
                );
              }
            }
          })}
        </ScrollView>
      </View>
    </CollapsibleCard>
  );
};
