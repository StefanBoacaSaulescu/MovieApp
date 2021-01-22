import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../data/Colors';
import Constants from '../../data/Constants';
import { setFavoriteMovies } from '../../redux/actions';
import {EndPoints} from '../../services/EndPoints';
import MainService from '../../services/MainService';

export default function MovieDetails(props) {
  const favoriteMovies = useSelector((state) => state.favorite_movies);
  const [movieDetails, setMovieDetails] = useState({});
  const {navigation, route} = props;
  const {movieObject} = route.params;
  const backdropImage = EndPoints.imageBaseURL + movieObject.backdrop_path;
  const imageSource = EndPoints.imageBaseURL + movieObject.poster_path;
  const dispatch = useDispatch();
  React.useEffect(() => {
    getMovieDetails(movieObject.id);
  }, []);
  function getMovieDetails(movieID) {
    MainService.getMovies(movieID).then((response) => {
      setMovieDetails(response.data);
      console.log(movieDetails);
    });
  }
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
        <ImageBackground
          source={{uri: backdropImage}}
          style={{
            width: Constants.ScreenWidth,
            height: Constants.ScreenHeight * 0.3,
          }}>
          <TouchableOpacity
            style={{margin: 10}}
            onPress={() => navigation.pop()}>
            <Text
              style={{color: Colors.white, fontWeight: '900', fontSize: 22}}>
              X
            </Text>
          </TouchableOpacity>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 15,
            borderBottomColor: '#3333',
            borderBottomWidth: 0.5,
            marginHorizontal: 10,
          }}>
          <Image
            source={{uri: imageSource}}
            style={{
              width: Constants.MovieCardWidth,
              height: Constants.ScreenHeight * 0.3,
              resizeMode: 'stretch',
            }}
          />
          <View style={{flex: 1}}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', marginHorizontal: 10}}>
              {movieDetails.original_title}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                margin: 10,
                color: '#333333',
              }}>
              {movieDetails.tagline}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                margin: 10,
                color: '#000000',
              }}>
              {`Released in ${parseInt(movieDetails.release_date)}`}
            </Text>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Image
                source={require('../../../assets/baseline_star_black_18.png')}
                style={{width: 20, height: 20, marginHorizontal: 10}}
              />
              <Text style={{textAlign: 'center'}}>
                {movieDetails.vote_average} / 10 ({movieDetails.vote_count})
              </Text>
            </View>
            <TouchableOpacity
              style={{flex: 1, alignItems: 'center',alignSelf:'flex-end',justifyContent:'flex-end'}}
              onPress={() => addMovieToFavorites(movieObject)}>
              <Image
                source={
                  favoriteMovies.includes(movieObject)
                    ? require('../../../assets/baseline_favorite_black_18.png')
                    : require('../../../assets/baseline_favorite_border_black_18.png')
                }
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', margin: 10}}>
            Overview
          </Text>
          <Text
            style={{fontSize: 16, marginHorizontal: 15, textAlign: 'justify'}}>
            {movieDetails.overview}
          </Text>
        </View>
      </View>
    </>
  );
}
