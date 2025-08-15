import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Wishlist: undefined;
  Profile: undefined;
}

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  Tabs: NavigatorScreenParams<BottomTabParamList>;
  Movie: { movieId: string, title: string, image: any };
  Review: { movieId: string, title: string, image: any};

}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

   export type HomeTabScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
