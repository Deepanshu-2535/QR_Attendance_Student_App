import {ScrollView, Text, View, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {colors} from "../constants/colors";

export default function About() {
  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 min-w-full"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mx-8 mb-3 mt-10 text-4xl font-bold">About App</Text>
        <Text className="mx-8 text-xl text-muted">
          QR Attendance helps students and faculty track class attendance
          quickly and accurately.
        </Text>

        <View style={styles.card}>
          <Text className="text-2xl font-semibold mb-2">What It Does</Text>
          <Text className="text-muted text-base leading-6">
            Scan QR codes to mark attendance, view overall progress, and check
            subject-wise breakdowns in one place.
          </Text>
        </View>

        <View style={styles.card}>
          <Text className="text-2xl font-semibold mb-2">Key Features</Text>
          <Text className="text-muted text-base leading-6">
            Fast check-in, clean dashboards, and subject summaries that help you
            stay on top of your semester.
          </Text>
        </View>

        <View style={styles.card}>
          <Text className="text-2xl font-semibold mb-2">Data & Privacy</Text>
          <Text className="text-muted text-base leading-6">
            Attendance data is stored securely within the app and is only used
            for your academic tracking.
          </Text>
        </View>

        <View style={styles.card}>
          <Text className="text-2xl font-semibold mb-2">Support</Text>
          <Text className="text-muted text-base leading-6">
            For help, contact your department or the campus admin team.
          </Text>
        </View>

        <View style={styles.card}>
          <Text className="text-2xl font-semibold mb-2">Version</Text>
          <Text className="text-muted text-base leading-6">1.0.0</Text>
        </View>

        <View style={{height: 60}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 12,
    shadowColor: colors.muted,
    shadowRadius: 8,
    shadowOpacity: 0.2,
    padding: 20,
  },
});
