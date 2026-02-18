import {Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {CameraView, useCameraPermissions} from "expo-camera";
import {ScanQrCode} from "lucide-react-native";
import React from "react";

const Scan = () => {
  const [permission, requestPermission] = useCameraPermissions();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <Text className="mx-8 mb-2 mt-10 text-4xl font-bold">Scan</Text>
        <Text className="mx-8 text-xl text-gray-500">
          Align the QR code within the frame to mark attendance.
        </Text>

        {!permission?.granted ? (
          <View style={styles.card} className="items-center justify-center">
            <View className="bg-gray-600/10 h-20 w-20 rounded-full items-center justify-center mb-4">
              <ScanQrCode size={36} color="#666666" />
            </View>
            <Text className="text-xl font-semibold mb-2">Camera Access</Text>
            <Text className="text-gray-500 text-center mb-4">
              Allow camera access to start scanning QR codes.
            </Text>
            <Pressable
              onPress={requestPermission}
              style={styles.button}
            >
              <Text className="text-white font-semibold text-lg">Enable Camera</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.cameraCard}>
            <CameraView style={StyleSheet.absoluteFill} facing="back" />
            <View style={styles.overlay}>
              <View style={styles.scanFrame} />
              <Text style={styles.overlayText}>
                Keep the code centered
              </Text>
            </View>
          </View>
        )}

        <View style={styles.infoCard}>
          <Text className="text-2xl font-semibold mb-2">Tips</Text>
          <Text className="text-gray-600 text-base leading-6">
            1. Make sure the QR code is well lit.
          </Text>
          <Text className="text-gray-600 text-base leading-6">
            2. Hold your phone steady until it detects.
          </Text>
          <Text className="text-gray-600 text-base leading-6">
            3. If it fails, move slightly closer.
          </Text>
        </View>

        <View style={{height: 40}} />
      </View>
    </SafeAreaView>
  );
};

export default Scan;

const styles = StyleSheet.create({
  cameraCard: {
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    height: 360,
    overflow: "hidden",
    shadowColor: "gray",
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  scanFrame: {
    width: 220,
    height: 220,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.9)",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  overlayText: {
    marginTop: 16,
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: "gray",
    shadowRadius: 8,
    shadowOpacity: 0.2,
    padding: 24,
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 16,
    shadowColor: "gray",
    shadowRadius: 8,
    shadowOpacity: 0.2,
    padding: 20,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
});
