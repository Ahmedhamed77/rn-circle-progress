/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ProgressCircle} from './circle-progress';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <ProgressCircle />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
