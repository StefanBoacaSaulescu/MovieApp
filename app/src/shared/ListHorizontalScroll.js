import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../data/Colors';
import Constants from '../data/Constants';

export default function ListHorizontalScroll(props) {
  return (
    <View
      style={{
        backgroundColor: Colors.black,
        height:Constants.HorizontalScrollBarHeight,
        alignItems: 'center',
      }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {props.scrollBar.map((type, i) => (
          <TouchableOpacity
            style={[
              styles.renderButtons,
              {
                borderBottomColor:
                  props.selectedIndex === i ? Colors.white : Colors.transparent,
              },
            ]}
            key={i}
            onPress={() => {
              props.updateIndex(i);
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              <Text
                style={{
                  fontSize: 14,
                  color: props.selectedIndex === i ? Colors.white : Colors.grey,
                }}>
                {type}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: Constants.ScreenWidth,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  clickedSelectedButton: {
    height: 18,
    width: 18,
    backgroundColor: 'white',
    marginLeft: 5,
    borderRadius: 10,
    justifyContent: 'center',
  },
  renderButtons: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    borderBottomWidth: 3,
  },
});
