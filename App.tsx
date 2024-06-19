import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Home from './pages/Home';
import Detail from './pages/Home/detail';

import Ctrl from './pages/Home/ctrl';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import BindList from './pages/BindList';
import ConfigMain from './pages/Config';
import My from './pages/My';
import sdk from './models/sdk';
import {THEME_COLOR} from './config/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox} from 'react-native';
import inputWifi from './pages/Config/inputWifi';
import SelectDevice from './pages/Config/SelectDevice';
import ConfigLoading from './pages/Config/ConfigLoading';
import Login from './pages/My/Login';
import Register from './pages/My/Register';
import Forgot from './pages/My/Forgot';
import UserDetail from './pages/My/UserDetail';
import ChangePassword from './pages/My/ChangePassword';

LogBox.ignoreLogs([
  "lace the following in 'screenOptions' in your code to keep current",
]);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: THEME_COLOR,
      headerTitleStyle: {color: '#000'},
    }}>
    {/* 在这里定义 Stack 路由的屏幕 */}
    <Stack.Screen name="设备" component={Home} />
    <Stack.Screen name="设备详情" component={Detail} />
    <Stack.Screen name="设备控制" component={Ctrl} />
  </Stack.Navigator>
);

const ConfigStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: THEME_COLOR,
      headerTitleStyle: {color: '#000'},
    }}>
    {/* 在这里定义 Stack 路由的屏幕 */}
    <Stack.Screen name="配网" component={ConfigMain} />
    <Stack.Screen name="输入Wi-Fi" component={inputWifi} />
    <Stack.Screen name="选择设备" component={SelectDevice} />
    <Stack.Screen name="配置设备" component={ConfigLoading} />
  </Stack.Navigator>
);

const MyStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: THEME_COLOR,
      headerTitleStyle: {color: '#000'},
    }}>
    {/* 在这里定义 Stack 路由的屏幕 */}
    <Stack.Screen name="我的" component={My} />
    <Stack.Screen name="登录" component={Login} />
    <Stack.Screen name="注册" component={Register} />
    <Stack.Screen name="忘记密码" component={Forgot} />
    <Stack.Screen name="用户详情" component={UserDetail} />
    <Stack.Screen name="修改密码" component={ChangePassword} />
  </Stack.Navigator>
);
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
      }}
      tabBarOptions={{
        activeTintColor: THEME_COLOR, // 选中标签的文本和图标颜色
        inactiveTintColor: 'gray', // 未选中标签的文本和图标颜色
        labelStyle: {
          fontSize: 14, // 标签文本的字体大小
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="box" size={15} color={color} />
          ),
          headerShown: false,
        }}
        name="Device"
        component={HomeStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="list" size={15} color={color} />
          ),
        }}
        name="绑定列表"
        component={BindList}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="tools" size={15} color={color} />
          ),
          headerShown: false,
        }}
        name="Config"
        component={ConfigStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="user" size={15} color={color} />
          ),
          headerShown: false,
        }}
        name="我的"
        component={MyStackScreen}
      />
    </Tab.Navigator>
  );
}

function App(): JSX.Element {
  useEffect(() => {
    sdk.initSDK().then(_ => {
      setTimeout(() => {
        sdk.getDevices();
      }, 1000);
    });
  });

  return (
    <AlertNotificationRoot>
      <NavigationContainer>{MyTabs()}</NavigationContainer>
    </AlertNotificationRoot>
  );
}

export default App;
