import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Favorites, Home, Search} from '../../screens';
import {Image, StyleSheet} from 'react-native';
import Constants from '../../data/Constants';
import Colors from '../../data/Colors';

const HomeIcon = require('../../../assets/baseline_movie_black_24.png');
const FavoriteIcon = require('../../../assets/baseline_favorite_black_24.png');
const SearchIcon = require('../../../assets/baseline_search_black_24.png');

const Tab = createMaterialBottomTabNavigator();
export default function TabNavigator() {
  return (
    <>
      <Tab.Navigator
        initialRouteName={'Home'}
        barStyle={{backgroundColor: Colors.black}}
        shifting={true}>
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: ({color}) => (
              <Image
                source={FavoriteIcon}
                style={styles.iconStyle}
              />
            ),
            headerRight: () => (
                <Button
                  onPress={() => alert('This is a button!')}
                  title="Info"
                  color="#fff"
                />
              ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <Image
                source={HomeIcon}
                style={styles.iconStyle}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({color}) => (
              <Image
                source={SearchIcon}
                style={styles.iconStyle}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
const styles = StyleSheet.create({
  iconStyle: {
    height: Constants.TabBarIconSize,
    width: Constants.TabBarIconSize,
    tintColor: Colors.white,
  },
});
