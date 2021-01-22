import React, {useState} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import {Searchbar} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../data/Colors';
import Constants from '../../data/Constants';
import { setFavoriteMovies } from '../../redux/actions';
import MainService from '../../services/MainService';
import MovieCard from '../../shared/MovieCard';

export default function Search(props) {
  const favoriteMovies = useSelector((state) => state.favorite_movies);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const { navigation } = props;

  React.useEffect(() => {}, []);
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
  function searchMovie(query) {
    setSearchValue(query);
    MainService.searchMovie(JSON.stringify(query)).then((response) => {
      console.log(response);
      setSearchResult(response.data.results);
      //   if (response && response.data && response.data.results)
      // setSearchResult(response.data.results);
    });
  }
  return (
    <>
      <SafeAreaView style={{backgroundColor: Colors.black}} />
      <View style={{flex: 1}}>
        <Searchbar
          placeholder="Search"
          placeholderTextColor="#FFFFFF"
          underlineColorAndroid="transparent"
          iconColor={Colors.black}
          style={{
            width: '90%',
            alignSelf: 'center',
            elevation: 0,
            backgroundColor: Colors.grey,
            height: 40,
            margin: 10,
          }}
          onChangeText={(query) => {
            searchMovie(query);
          }}
          value={searchValue}
          theme={{colors: {text: '#FFFFFF'}}}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <FlatList
            contentContainerStyle={{
              width: Constants.ScreenWidth,
              alignItems: 'center',
            }}
            data={searchResult}
            renderItem={(listObject) => (
              <MovieCard
                item={listObject.item}
                onPressCard={(item) =>
                  navigation.navigate('MovieDetails', {movieObject: item})
                }
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
