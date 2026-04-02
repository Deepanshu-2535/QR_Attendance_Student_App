import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { colors } from '../constants/colors'

const Loading = ({
  message = 'Loading...',
  showMessage = true,
  size = 'large',
  color = colors.primary,
  fullScreen = true,
  style
}) => {
  return (
    <View style={[fullScreen ? styles.fullScreen : styles.inline, style]}>
      <ActivityIndicator size={size} color={color} />
      {showMessage ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background
  },
  inline: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    marginTop: 12,
    color: colors.muted,
    fontSize: 16,
    fontWeight: '600'
  }
})
