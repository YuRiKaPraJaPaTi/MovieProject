import { NavigatorScreenParams } from "@react-navigation/native";


export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Wishlist: undefined;
  Profile: undefined;
}

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<BottomTabParamList>;
  Movie: { movieId: string };
  Review: { movieId: string};

}