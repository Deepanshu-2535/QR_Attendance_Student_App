import {StyleSheet, View} from "react-native";
import {colors} from "../constants/colors";

export default function Divider({
  orientation = "horizontal",
  color = colors.border,
  thickness = 1,
  length = "100%",
  margin = 12,
  style,
}) {
  const isHorizontal = orientation === "horizontal";

  return (
    <View
      style={[
        styles.base,
        {backgroundColor: color},
        isHorizontal
          ? {height: thickness, width: length, marginVertical: margin}
          : {width: thickness, height: length, marginHorizontal: margin},
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: "center",
  },
});
