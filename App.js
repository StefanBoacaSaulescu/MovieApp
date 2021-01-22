import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './app/src/navigation/tabNavigator/TabNavigator';
import {persistor, store} from './app/src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import StackNavigator from './app/src/navigation/stackNavigator/StackNavigator';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}  loading={console.log("loadiing")}>
          <NavigationContainer>
              <StackNavigator/>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
