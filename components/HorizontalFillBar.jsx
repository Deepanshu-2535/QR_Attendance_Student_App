import {View, StyleSheet} from "react-native";

export default function HorizontalFillBar({
  fill = 0,
  height = 12,
  style,
  fillStyle,
  trackStyle,
}) {
  const clampedFill = Math.max(0, Math.min(100, Number(fill) || 0));

  return (
    <View style={[styles.track, {height}, trackStyle, style]}>
      <View style={[styles.fill, {width: `${clampedFill}%`}, fillStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: 9999,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#40a5e6",
    borderRadius: 9999,
  },
});