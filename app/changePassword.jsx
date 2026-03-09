import { ScrollView, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LockKeyhole } from 'lucide-react-native'
import { colors } from '../constants/colors'

export default function ChangePassword() {
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: 'transparent ' }}>
      <ScrollView
        className="flex-1 min-w-full"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ minHeight: 40 }}></View>
        <Text className="mx-8 mb-3 mt-10 text-4xl font-bold">Change Password</Text>
        <Text className="mx-8 text-xl text-muted">
          Update your account password to keep your profile secure.
        </Text>

        <View style={styles.card}>
          <View className="flex-row items-center mb-4">
            <LockKeyhole color={colors.muted} size={22} />
            <Text className="ml-2 text-2xl font-semibold">Password Details</Text>
          </View>

          <Text className="text-muted font-semibold mb-2">Current Password</Text>
          <TextInput
            placeholder="Enter current password"
            secureTextEntry
            className="bg-background rounded-xl px-4 py-3 text-base text-text"
          />

          <Text className="text-muted font-semibold mt-4 mb-2">New Password</Text>
          <TextInput
            placeholder="Enter new password"
            secureTextEntry
            className="bg-background rounded-xl px-4 py-3 text-base text-text"
          />

          <Text className="text-muted font-semibold mt-4 mb-2">Confirm New Password</Text>
          <TextInput
            placeholder="Re-enter new password"
            secureTextEntry
            className="bg-background rounded-xl px-4 py-3 text-base text-text"
          />
        </View>

        <View style={styles.notice}>
          <Text className="text-muted text-base leading-6">
            Use at least 8 characters, including a mix of letters and numbers.
          </Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text className="text-surface font-semibold text-xl">Update Password</Text>
        </TouchableOpacity>
        <View style={{ height: 200 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 0,
    marginVertical: 16,
    shadowColor: colors.muted,
    shadowRadius: 8,
    shadowOpacity: 0.2,
    padding: 20,
  },
  notice: {
    marginHorizontal: 8,
    shadowColor: colors.muted,
    shadowRadius: 8,
    shadowOpacity: 0.2,
    padding: 20,
  },
  button: {
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    marginTop: 16,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
