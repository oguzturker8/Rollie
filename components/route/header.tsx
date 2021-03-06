import MaskedView from "@react-native-community/masked-view";
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import colors from "../../style/colors";
import fonts from "../../style/fonts";
import GradientHorizontal from "../shared/gradienthorizontal";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native-gesture-handler";

const scrollY = new Animated.Value(0);

const animateHeader = (toValue: number) => {
  Animated.spring(scrollY, {
    toValue,
    friction: 15,
    useNativeDriver: true,
  }).start();
};

const Header = ({}) => {
  const navigation = useNavigation();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const translateY = Animated.diffClamp(scrollY, 0, 60).interpolate({
    inputRange: [0, 60],
    outputRange: [0, -60],
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <GradientHorizontal />
      <TouchableHighlight style={{ height: 60 }} onPress={toggleDrawer}>
        <View style={styles.wrapper}>
          <MaskedView
            style={{ flex: 1, flexDirection: "row", height: "100%" }}
            maskElement={
              <View style={styles.masked}>
                <View style={styles.icon}>
                  <MaterialIcons name="menu" size={24} color="black" />
                </View>

                <Text style={styles.title}>Rollie</Text>
              </View>
            }
          >
            <GradientHorizontal />
          </MaskedView>
        </View>
      </TouchableHighlight>
    </Animated.View>
  );
};

export default Header;
export { scrollY, animateHeader };

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: 60,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.dark,
    marginBottom: 1,
  },
  title: {
    fontSize: fonts.text32,
    color: colors.pink,
    fontFamily: "RalewayBold",
    letterSpacing: 5,
    textTransform: "uppercase",
  },
  masked: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    position: "absolute",
    left: 25,
  },
});
