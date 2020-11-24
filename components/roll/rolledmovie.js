import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import MoviePageText from "./moviepagetext";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux/actions";
import Buttons from "./buttons";

const { width, height } = Dimensions.get("window");

const SPACING = 30;

const BUTTONS = [
  {
    text: "Add",
    id: "current",
  },
  {
    text: "Next",
    id: "declined",
  },
  {
    text: "Later",
    id: "later",
  },
  {
    text: "Watched",
    id: "watched",
  },
];

const RolledMovie = ({ setIsFetched, movie, roll, navigation }) => {
  const dispatch = useDispatch();

  const handler = (key) => {
    dispatch(actionCreators.addMovie(movie.Title, key));
    if (key === "current") {
      dispatch(actionCreators.setIsRolled(true));
      setIsFetched(false);
      navigation.navigate("Home");
    } else {
      roll();
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <Image
        source={{ uri: movie.Poster }}
        style={styles.image}
        resizeMode="cover"
        blurRadius={0.25}
      />
      <View style={styles.blacked} />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <FlatList
              data={BUTTONS}
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => {
                return (
                  <Buttons
                    text={item.text}
                    id={item.id}
                    handler={handler}
                    margin={
                      index % 2 === 0 && index !== BUTTONS.length - 1
                        ? SPACING / 3
                        : 0
                    }
                  />
                );
              }}
            />
          </View>
          <Text style={styles.title}>{movie.Title}</Text>
          <View style={styles.rowLine}>
            <FontAwesome name="star" size={24} color="#fcf300" />
            <Text style={[styles.details, { marginLeft: 10 }]}>
              {movie.imdbRating} {"   "} {movie.Year} {"   "} {movie.Runtime}
            </Text>
          </View>
          <Text style={[styles.details, { marginBottom: SPACING }]}>
            {movie.Genre} {"   "} {movie.Country} {"   "} Language:{" "}
            {movie.Language}
          </Text>
          <MoviePageText text={movie.Plot} title="Plot" />
          <MoviePageText text={movie.Director} title="Director" />
          <MoviePageText text={movie.Writer} title="Writer" />
          <MoviePageText text={movie.Actors} title="Actors" />
          <MoviePageText text={movie.Awards} title="Awards" />
          <MoviePageText text={movie.Production} title="Production" />
        </View>
      </ScrollView>
    </View>
  );
};

export default RolledMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING,
    elevation: 2,
    zIndex: 2,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    //elevation: 1,
    zIndex: 0,
  },
  blacked: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    elevation: 0,
    zIndex: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  rowLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING / 6,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontFamily: "RalewayBlack",
    marginBottom: SPACING / 2,
    letterSpacing: 0.5,
    paddingTop: SPACING,
  },
  details: {
    fontSize: 20,
    fontFamily: "RalewaySemiBold",
    color: "#fff",
    lineHeight: SPACING * 1,
  },
  text: {
    fontSize: 16,
    fontFamily: "RalewaySemiBold",
    color: "#fafafa",
    paddingVertical: SPACING / 2,
    lineHeight: SPACING,
    borderTopWidth: 1,
    borderColor: "#fafafa",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },

  hightlighted: {
    color: "#665DF5",
  },
});
