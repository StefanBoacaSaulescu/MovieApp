import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import Constants from '../data/Constants';
import {EndPoints} from '../services/EndPoints';

export default function MovieCard(props) {
  const favoriteMovies = useSelector((state) => state.favorite_movies);
  const imageSource = EndPoints.imageBaseURL + props.item.poster_path;
  return (
    <View
      style={{
        margin: 6,
        width: Constants.MovieCardWidth,
        zIndex: 10,
        borderRadius: 10,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 5,
      }}>
      <TouchableOpacity
        onPress={()=>props.onPressCard(props.item)}
        style={{
          width: '100%',
        }}>
        <Image
          source={{uri: imageSource}}
          style={{
            width: '100%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            height: Constants.ScreenHeight * 0.3,
            resizeMode: 'stretch',
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          backgroundColor: 'white',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        <Text style={{flex: 1, textAlign: 'center'}}>
          {parseInt(props.item.release_date)}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../assets/baseline_star_black_18.png')}
            style={{width: 20, height: 20}}
          />
          <Text style={{flex: 1, textAlign: 'center'}}>
            {props.item.vote_average}
          </Text>
        </View>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center'}}
          onPress={() => props.onTapFavoriteIcon(props.item)}>
          <Image
            source={
              favoriteMovies.includes(props.item)
                ? require('../../assets/baseline_favorite_black_18.png')
                : require('../../assets/baseline_favorite_border_black_18.png')
            }
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
