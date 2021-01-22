import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Constants {
  static ScreenWidth = wp(100);
  static ScreenHeight = hp(100);
  static HeaderHeight = hp(6);
  static HorizontalScrollBarHeight = hp(4);
  static TabBarIconSize = hp(3);
  static MovieCardWidth = wp(45)
}
