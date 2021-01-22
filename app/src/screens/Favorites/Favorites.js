import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Colors from '../../data/Colors';
import {Header} from '../../shared';

export default function Favorites() {
  return (
    <>
      <SafeAreaView style={{backgroundColor: Colors.black}} />
      <View style={{flex: 1}}>
        <Header title={'Favorites'} hasFilter={false} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Favorites</Text>
        </View>
      </View>
    </>
  );
}
