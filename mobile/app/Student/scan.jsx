import {Alert, Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {CameraView, useCameraPermissions} from "expo-camera";
import {ScanQrCode} from "lucide-react-native";
import React, {useRef, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import {colors, withOpacity} from "../../constants/colors";
import api from '../../util/apiClient'
import { ENDPOINTS } from '../../constants/api'
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'
import AttendanceSuccessModal from '../../components/AttendanceSuccessModal'

const Scan = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const isFocused = useIsFocused();
  const [scanned,setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const isProcessing = useRef(false);
  const router = useRouter();
  async function handleScanQrCode({type,data}) {
    if (isProcessing.current) return;
    isProcessing.current = true;
    setScanned(true);
    try {
      const responseData = await api.post(ENDPOINTS.STUDENT.SCAN, {
        token: `${data}`
      })
      setModalVisible(true);
    } catch (error) {
      Toast.show({ type: "error", text1: "Error marking attendance", text2: error.message });
      setTimeout(() => {
        isProcessing.current = false;
        setScanned(false);
      }, 2000)
    }
  }

  const handleModalDismiss = () => {
    setModalVisible(false);
    router.replace("/Student");
    isProcessing.current = false;
    setScanned(false);
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <Text className="mx-8 mb-2 mt-10 text-4xl font-bold">Scan</Text>
        <Text className="mx-8 text-xl text-muted">
          Align the QR code within the frame to mark attendance.
        </Text>

        {!permission?.granted ? (
          <View style={styles.card} className="items-center justify-center">
            <View className="bg-muted/10 h-20 w-20 rounded-full items-center justify-center mb-4">
              <ScanQrCode size={36} color={colors.muted} />
            </View>
            <Text className="text-xl font-semibold mb-2">Camera Access</Text>
            <Text className="text-muted text-center mb-4">
              Allow camera access to start scanning QR codes.
            </Text>
            <Pressable
              onPress={requestPermission}
              style={styles.button}
            >
              <Text className="text-surface font-semibold text-lg">Enable Camera</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.cameraCard}>
            {isFocused ? (
              <CameraView style={StyleSheet.absoluteFill} facing="back" onBarcodeScanned={scanned?undefined:handleScanQrCode} barcodeScannerSettings={{barcodeTypes:['qr']}} />
            ) : (
              <View style={[StyleSheet.absoluteFill, styles.cameraPaused]} />
            )}
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
          <Text className="text-muted text-base leading-6">
            1. Make sure the QR code is well lit.
          </Text>
          <Text className="text-muted text-base leading-6">
            2. Hold your phone steady until it detects.
          </Text>
          <Text className="text-muted text-base leading-6">
            3. If it fails, move slightly closer.
          </Text>
        </View>

        <View style={{height: 40}} />
        <AttendanceSuccessModal
          visible={modalVisible}
          onDismiss={handleModalDismiss}
        />
      </View>
    </SafeAreaView>
  );
};

export default Scan;

const styles = StyleSheet.create({
  cameraCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    height: 360,
    overflow: "hidden",
    shadowColor: colors.muted,
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  cameraPaused: {
    backgroundColor: colors.text,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: withOpacity(colors.text, 0.2),
  },
  scanFrame: {
    width: 220,
    height: 220,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: withOpacity(colors.surface, 0.9),
    backgroundColor: withOpacity(colors.surface, 0.05),
  },
  overlayText: {
    marginTop: 16,
    color: colors.surface,
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: colors.muted,
    shadowRadius: 8,
    shadowOpacity: 0.2,
    padding: 24,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 16,
    shadowColor: colors.muted,
    shadowRadius: 8,
    shadowOpacity: 0.2,
    padding: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
});
