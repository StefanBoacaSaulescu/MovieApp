import React, {useState} from 'react';
import {View, Text, SafeAreaView, StatusBar, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../../data/Colors';
import Constants from '../../data/Constants';
import MainService from '../../services/MainService';
import {Header, ListHorizontalScroll} from '../../shared';
import MovieCard from '../../shared/MovieCard';

export default function Home() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

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
            contentContainerStyle={{width:Constants.ScreenWidth,alignItems:'center'}}
            data={movies}
            renderItem={(listObject) => <MovieCard item={listObject.item}/>}
            numColumns={2}
            keyExtractor={(item) => item.id}
            initialNumToRender={10}
          />
        </View>
      </View>
    </>
  );
}
