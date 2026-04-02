import { Animated, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import * as Haptics from 'expo-haptics'
import LottieView from 'lottie-react-native'

const { width } = Dimensions.get('window');

const AttendanceSuccessModal = ({ visible, onDismiss }) => {
  const backdropOpacity = useRef(new Animated.Value(0)).current
  const cardScale = useRef(new Animated.Value(0.8)).current
  const cardOpacity = useRef(new Animated.Value(0)).current
  useEffect(() => {
    if (visible) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true
        }),
        Animated.spring(cardScale, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true
        }),
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        })
      ]).start()

      const timer = setTimeout(() => {
        handleDismiss()
      }, 3000)
      return () => {
        clearTimeout(timer)
      }

    }
  }, [visible])

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(() => {
      cardScale.setValue(0.8)
      onDismiss()
    })
  }
  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={handleDismiss}>
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
        <TouchableOpacity style={styles.backdropTouchable} activeOpacity={1} onPress={handleDismiss} />
      </Animated.View>

      <Animated.View
        style={[
          styles.card,
          { opacity: cardOpacity, transform: [{ scale: cardScale }] }
        ]}
        pointerEvents="box-none"
      >
        <LottieView
          source={require('../assets/animations/success.json')}
          autoPlay
          loop={false}
          style={styles.lottie}
        />

        <Text style={styles.title}>Attendance Marked!</Text>

        <Text style={styles.subtitle}>Your attendance has been recorded successfully.</Text>

        <TouchableOpacity style={styles.button} onPress={handleDismiss}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  )
}

export default AttendanceSuccessModal

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  backdropTouchable: {
    flex: 1
  },
  card: {
    position: 'absolute',
    alignSelf: 'center',
    top: '25%',
    width: width * 0.82,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 36,
    paddingHorizontal: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10
  },
  lottie: {
    width: 130,
    height: 130
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20
  },
  button: {
    marginTop: 24,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 50
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600'
  }
})