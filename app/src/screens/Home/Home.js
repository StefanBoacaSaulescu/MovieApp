import React, {useState} from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../data/Colors';
import Constants from '../../data/Constants';
import {setFavoriteMovies} from '../../redux/actions';
import MainService from '../../services/MainService';
import {Header, ListHorizontalScroll} from '../../shared';
import MovieCard from '../../shared/MovieCard';
export default function Home(props) {
  const favoriteMovies = useSelector((state) => state.favorite_movies);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const { navigation } = props;
  React.useEffect(() => {
    switch (selectedTabIndex) {
      case 0:
        getMovies('now_playing');
        break;
      case 1:
        getMovies('popular');
        break;
      case 2:
        getMovies('top_rated');
        break;
      case 3:
        getMovies('upcoming');
        break;
      default:
        getMovies('now_playing');
        break;
    }
  }, []);
  function getMovies(recommendation_type) {
    setLoading(true);
    MainService.getMovies(recommendation_type).then((response) => {
      //   console.log('Movieees responsee', response);
      if (response && response.data && response.data.results)
        setMovies(response.data.results);
      // dispatch(setFavoriteMovies(response.data.results))
    });
  }
  function updateMovieListBySelectedTab(index) {
    setSelectedTabIndex(index);
    switch (index) {
      case 0:
        getMovies('now_playing');
        break;
      case 1:
        getMovies('popular');
        break;
      case 2:
        getMovies('top_rated');
        break;
      case 3:
        getMovies('upcoming');
        break;
      default:
        getMovies('now_playing');
        break;
    }
  }
  //nu sunt prea mandru de metoda asta, dar am facut-o in viteza , ca nu mai aveam timp pana la trimiterea proiectului
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
        <Header title={'Home'} hasFilter={true} />
        <ListHorizontalScroll
          scrollBar={['NOW PLAYING', 'POPULAR', 'TOP RATED', 'UPCOMING']}
          updateIndex={(i) => updateMovieListBySelectedTab(i)}
          selectedIndex={selectedTabIndex}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <FlatList
            contentContainerStyle={{
              width: Constants.ScreenWidth,
              alignItems: 'center',
            }}
            data={movies}
            renderItem={(listObject) => (
              <MovieCard
                item={listObject.item}
                onPressCard = {(item)=>navigation.navigate('MovieDetails',{movieObject:item})}
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
