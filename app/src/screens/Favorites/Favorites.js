import React from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../data/Colors';
import Constants from '../../data/Constants';
import {setFavoriteMovies} from '../../redux/actions';
import {Header} from '../../shared';
import MovieCard from '../../shared/MovieCard';

export default function Favorites(props) {
  const favoriteMovies = useSelector((state) => state.favorite_movies);
  const dispatch = useDispatch();
  const { navigation } = props;
  function addMovieToFavorites(movieObject) {
    let ind = -1;
    let newFavList = [];
    favoriteMovies.map((item, index) => {
      if (item.id != movieObject.id) {
        newFavList.push(item);
      }
    });
    if (newFavList.length === favoriteMovies.length)
      newFavList.push(movieObject);

    dispatch(setFavoriteMovies(newFavList));
  }
  return (
    <>
      <SafeAreaView style={{backgroundColor: Colors.black}} />
      <View style={{flex: 1}}>
        <Header title={'Favorites'} hasFilter={false} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <FlatList
            contentContainerStyle={{
              width: Constants.ScreenWidth,
              alignItems: 'center',
            }}
            data={favoriteMovies}
            renderItem={(listObject) => (
              <MovieCard
                onPressCard={(item) =>
                  navigation.navigate('MovieDetails', {movieObject: item})
                }
                item={listObject.item}
                onTapFavoriteIcon={(movieObject) =>
                  addMovieToFavorites(movieObject)
                }
              />
            )}
            numColumns={2}
            keyExtractor={(item) => item.id}
            initialNumToRender={10}
          />
        </View>
      </View>
    </>
  );
}
