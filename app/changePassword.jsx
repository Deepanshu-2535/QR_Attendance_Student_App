import {ScrollView, Text, TextInput, View, StyleSheet, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {LockKeyhole} from "lucide-react-native";

export default function ChangePassword() {
  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 min-w-full"
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
      >
        <Text className="mx-8 mb-3 mt-10 text-4xl font-bold">Change Password</Text>
        <Text className="mx-8 text-xl text-gray-500">
          Update your account password to keep your profile secure.
        </Text>

        <View style={styles.card}>
          <View className="flex-row items-center mb-4">
            <LockKeyhole color="#666666" size={22} />
            <Text className="ml-2 text-2xl font-semibold">Password Details</Text>
          </View>

          <Text className="text-gray-500 font-semibold mb-2">Current Password</Text>
          <TextInput
            placeholder="Enter current password"
            secureTextEntry
            className="bg-gray-100 rounded-xl px-4 py-3 text-base text-gray-700"
          />

          <Text className="text-gray-500 font-semibold mt-4 mb-2">New Password</Text>
          <TextInput
            placeholder="Enter new password"
            secureTextEntry
            className="bg-gray-100 rounded-xl px-4 py-3 text-base text-gray-700"
          />

          <Text className="text-gray-500 font-semibold mt-4 mb-2">Confirm New Password</Text>
          <TextInput
            placeholder="Re-enter new password"
            secureTextEntry
            className="bg-gray-100 rounded-xl px-4 py-3 text-base text-gray-700"
          />
        </View>

        <View style={styles.notice}>
          <Text className="text-gray-600 text-base leading-6">
            Use at least 8 characters, including a mix of letters and numbers.
          </Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text className="text-white font-semibold text-xl">Update Password</Text>
        </TouchableOpacity>
        <View style={{height: 200}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 0,
    marginVertical: 16,
    shadowColor: "gray",
    shadowRadius: 8,
    shadowOpacity: 0.2,
    padding: 20,
  },
  notice: {
    marginHorizontal: 8,
    shadowColor: "gray",
    shadowRadius: 8,
    shadowOpacity: 0.2,
    padding: 20,
  },
  button: {
    backgroundColor: "#2563eb",
    marginHorizontal: 20,
    marginTop: 16,
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
