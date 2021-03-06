import React, { Ref, RefObject, useCallback, useRef, useState } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux/actions";
import colors from "../../style/colors";
import fonts from "../../style/fonts";

const SPACING = 30;

interface Props {
  placeholder: string;
  id: string;
  maxLength: number;
  ref: RefObject<TextInput>;
  nextHandler?: () => void;
  isPassword?: boolean;
  setter?: React.Dispatch<React.SetStateAction<string>>;
}

const Input = React.forwardRef<TextInput, Props>(
  (
    { placeholder, id, maxLength, nextHandler, isPassword, setter },
    ref: Ref<TextInput>
  ) => {
    const dispatch = useDispatch();
    const [isFocused, setIsFocused] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const opacity = useRef(new Animated.Value(0)).current;
    const animatedColor = useRef(new Animated.Value(0)).current;
    const animatedPlaceholder = useRef(new Animated.Value(0)).current;

    const onChangeHandler = (text: string) => {
      inputAnimations(text);
      dispatch(actionCreators.editUserByKey(text, id));
    };

    function onChangeHandlerState(text: string) {
      inputAnimations(text);
      if (setter) {
        setter(text);
      }
    }

    function inputAnimations(text: string) {
      if (text.length === 0) {
        placeholderAnimation(0);
      } else {
        placeholderAnimation(1);
      }
      if (validateText(text)) {
        greenTextColor(1, true);
      } else {
        greenTextColor(0, false);
      }
    }

    const onFocus = () => {
      if (!isFocused) {
        startTextOpacity();
        placeholderAnimation(1);
      }
    };

    const greenTextColor = useCallback((toValue: number, isRight: boolean) => {
      setIsRight(isRight);
      Animated.timing(animatedColor, {
        toValue,
        duration: 222,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }, []);

    const startTextOpacity = () => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 222,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => setIsFocused(true));
    };

    const placeholderAnimation = useCallback((toValue: number) => {
      Animated.timing(animatedPlaceholder, {
        toValue,
        duration: 222,
        easing: Easing.cubic,
        useNativeDriver: true,
      }).start();
    }, []);

    const validateText = (text: string) => {
      //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      if (id === "mail") {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(text).toLowerCase());
      }
      return text.length >= 3;
    };

    const translateY = animatedPlaceholder.interpolate({
      inputRange: [0, 1],
      outputRange: [5, 0],
    });
    const translateX = animatedPlaceholder.interpolate({
      inputRange: [0, 1],
      outputRange: [5, 0],
    });

    const placeholderOpacity = animatedPlaceholder.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const color = animatedColor.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.red, colors.green],
    });

    return (
      <View style={styles.container}>
        <Animated.Text style={[styles.error, { opacity, color }]}>
          {!isRight
            ? id !== "mail"
              ? "Must be between 3-" + maxLength + " characters"
              : "Wrong E-mail entry"
            : "Correct"}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.placeholder,
            {
              opacity: placeholderOpacity,
              transform: [{ translateX }, { translateY }],
            },
          ]}
        >
          {placeholder}
        </Animated.Text>
        <TextInput
          ref={ref}
          placeholder={placeholder}
          onChangeText={(text) =>
            setter !== undefined
              ? onChangeHandlerState(text)
              : onChangeHandler(text)
          }
          maxLength={maxLength}
          onFocus={onFocus}
          onSubmitEditing={nextHandler}
          autoCapitalize="none"
          secureTextEntry={isPassword}
          blurOnSubmit={id === "username" ? false : true}
          keyboardType={id === "mail" ? "email-address" : "default"}
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholderTextColor={colors.white}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING / 6,
  },
  input: {
    fontFamily: "RalewaySemiBold",
    paddingVertical: SPACING / 6,
    paddingLeft: 2,
    fontSize: fonts.text20,
    color: colors.white,
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderRadius: 2,
    borderColor: colors.gray,
  },
  placeholder: {
    fontSize: fonts.text14,
    fontFamily: "RalewayBold",
    color: colors.gray,
    position: "absolute",
    right: 0,
    top: 0,
  },
  error: {
    fontSize: fonts.text12,
    fontFamily: "RalewayBold",
  },
});

export default Input;
