import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const SPACING = 30;
const { width } = Dimensions.get("window");

export default function Buttons({ handler, id, text, margin }) {
  return (
    <TouchableOpacity
      onPress={() => handler(id)}
      style={[styles.button, { marginHorizontal: margin }]}
    >
      <Text style={styles.buttonTet}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: SPACING * 1.2,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: SPACING / 2,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#665DF5",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  buttonTet: {
    fontSize: 18,
    fontFamily: "RalewayBold",
    color: "#665DF5",
  },
});
