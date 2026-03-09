import { StyleSheet, Text, View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { colors } from '../constants/colors'

export default function CircularFillBar({
  fill = 0,
  size = 80,
  strokeWidth = 8,
  color = colors.primary,
  trackColor = colors.border,
  style,
  trackStyle,
  fillStyle,
  textStyle,
  showText = true,
}) {
  const clampedFill = Math.max(0, Math.min(100, Number(fill) || 0))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (clampedFill / 100) * circumference
  const labelSize = Math.max(12, Math.round(size * 0.25))

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Svg width={size} height={size} style={trackStyle}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={fillStyle}
        />
      </Svg>
      {showText ? (
        <View style={styles.labelWrap}>
          <Text style={[styles.label, { fontSize: labelSize, color }, textStyle]}>
            {Math.round(clampedFill)}%
          </Text>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelWrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '700',
  },
})
