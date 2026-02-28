import {View, StyleSheet} from "react-native";
import {colors} from "../constants/colors";

export default function HorizontalFillBar({
  fill = 0,
  height = 12,
  style,
  fillStyle,
  trackStyle,
  color = colors.primary,
  trackColor = colors.border,
}) {
  const clampedFill = Math.max(0, Math.min(100, Number(fill) || 0));

  return (
    <View style={[styles.track, {height, backgroundColor: trackColor}, trackStyle, style]}>
      <View
        style={[
          styles.fill,
          {width: `${clampedFill}%`, backgroundColor: color},
          fillStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    borderRadius: 9999,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 9999,
  },
});
