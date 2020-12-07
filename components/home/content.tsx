import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Roll from "./roll";
import CurrentMovie from "./currentmovie";
import MovieCategory from "./moviecategory";
import { Initial, Movies } from "../../redux/types";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../style/fonts";
import colors from "../../style/colors";

const SPACING = 30;

const Content = ({}) => {
  const navigation = useNavigation();
  const isRolled: boolean = useSelector(
    (state: Initial) => state.user.isRolled
  );
  const movies: Movies = useSelector((state: Initial) => state.movies);

  const roll = () => {
    navigation.navigate("Roll");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <Text style={styles.title}>Rolled Movie</Text>
      {!isRolled ? (
        <Roll roll={roll} />
      ) : (
        <CurrentMovie current={movies.current} />
      )}
      <MovieCategory title="Your last movies" type="watched" />
      <MovieCategory title="I'll watch later" type="later" />
      <MovieCategory title="Movies you have declined" type="declined" />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SPACING * 3,
  },
  title: {
    fontSize: fonts.text32,
    color: colors.white,
    fontFamily: "RalewayBlack",
    letterSpacing: 1,
    paddingLeft: SPACING,
  },
});
