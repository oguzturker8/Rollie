import React from "react";
import { StyleSheet, View } from "react-native";
import MovieList from "../components/shared/movielist";

const LaterMovies = () => {
  return (
    <View style={styles.container}>
      <MovieList name="later" />
    </View>
  );
};

export default LaterMovies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
