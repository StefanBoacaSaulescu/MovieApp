import React from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../data/Colors';
import Constants from '../data/Constants';

export default function Header(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: Colors.black,
        width: Constants.ScreenWidth,
        height: Constants.HeaderHeight,
        padding: 10,
      }}>
      <Text
        style={{
          color: Colors.white,
          fontSize: 20,
          fontWeight: '600',
          paddingHorizontal: 10,
        }}>
        {props.title}
      </Text>
      {props.hasFilter ? (
        <View style={{flex: 1}}>
          <TouchableOpacity style={{alignSelf: 'flex-end',marginHorizontal:5}}>
            <Image
              source={require('../../assets/baseline_sort_black_24.png')}
              style={{
                width: Constants.TabBarIconSize,
                height: Constants.TabBarIconSize,
              }}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
