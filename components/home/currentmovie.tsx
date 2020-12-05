import React, { FC } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux/actions";
import { FontAwesome } from "@expo/vector-icons";
import Buttons from "./buttons";
import { Movie } from "../../redux/types";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../style/fonts";
import colors from "../../style/colors";
import GradientColored from "../shared/gradientcolored";

const { width } = Dimensions.get("window"),
  SPACING = 30;

const BUTTONS = [
  {
    text: "check",
    id: "watched",
  },
  {
    text: "x",
    id: "declined",
  },
  {
    text: "clock",
    id: "later",
  },
];

interface Props {
  current: Movie;
}

const CurrentMovie: FC<Props> = ({ current }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const buttonHandler = (key: string) => {
    dispatch(actionCreators.addMovie(current, key));
    dispatch(actionCreators.setCurrentMovie({}));
    dispatch(actionCreators.editUserByKey(false, "isRolled"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{current.Title}</Text>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MoviePage", {
              movie: current,
            })
          }
          style={{
            padding: 2,
          }}
        >
          <GradientColored />
          <Image style={styles.image} source={{ uri: current.Poster }} />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.topDetails}>
              <FontAwesome name="star" size={16} color={colors.yellow} />
              {"  "}
              {current.imdbRating} {"  "}
              {current.Year}
            </Text>
            <Text style={styles.details}>
              {current.Runtime} {current.Genre}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "space-evenly",
            }}
          >
            {BUTTONS.map((item) => {
              return (
                <Buttons
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  handler={buttonHandler}
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CurrentMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING,
  },
  header: {
    fontSize: fonts.text20,
    fontFamily: "RalewaySemiBold",
    color: colors.pink,
    letterSpacing: 0.5,
    marginBottom: SPACING / 3,
  },
  image: {
    width: width * 0.4,
    height: width * 0.4 * 1.48,
    backgroundColor: "gray",
    borderRadius: 4,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: SPACING * 0.5,
    height: width * 0.4 * 1.48,
  },
  topDetails: {
    fontSize: fonts.text16,
    fontFamily: "RalewaySemiBold",
    color: colors.white,
  },
  details: {
    fontSize: fonts.text14,
    marginVertical: 5,
    fontFamily: "RalewaySemiBold",
    color: colors.gray,
  },
});
