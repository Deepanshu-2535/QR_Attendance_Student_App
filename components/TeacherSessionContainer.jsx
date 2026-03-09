import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, withOpacity } from '../constants/colors'
import { ChevronRight } from 'lucide-react-native'
import { router } from 'expo-router'

const TeacherSessionContainer = ({ sessionId, subjectName, sessionDate, present, absent }) => {
  const total = present + absent
  const presentPercent = total > 0 ? (present / total) * 100 : 0
  const absentPercent = total > 0 ? (absent / total) * 100 : 0

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        router.push(`/TeacherDetails/${sessionId}`)
      }}
    >
      <View style={styles.topRow}>
        <View>
          <Text className="text-2xl font-bold">{subjectName}</Text>
          <Text style={styles.date}>{sessionDate}</Text>
        </View>
        <View style={styles.rightSide}>
          <View style={styles.rightStats}>
            <View style={styles.statRow}>
              <View style={[styles.dot, { backgroundColor: colors.success }]} />
              <Text style={styles.statText}>{present} Present</Text>
            </View>
            <View style={styles.statRow}>
              <View style={[styles.dot, { backgroundColor: colors.danger }]} />
              <Text style={styles.statTextDanger}>{absent} Absent</Text>
            </View>
          </View>
          <View style={styles.chevron}>
            <ChevronRight color={colors.muted} size={18} />
          </View>
        </View>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressPresent, { width: `${presentPercent}%` }]} />
        <View style={[styles.progressAbsent, { width: `${absentPercent}%` }]} />
      </View>
    </TouchableOpacity>
  )
}
export default TeacherSessionContainer
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    shadowColor: withOpacity(colors.text, 0.12),
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  date: {
    marginTop: 4,
    fontSize: 12,
    color: colors.muted,
  },
  rightStats: {
    alignItems: 'flex-start',
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    marginLeft: 8,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statText: {
    fontSize: 14,
    color: colors.text,
  },
  statTextDanger: {
    fontSize: 14,
    color: colors.danger,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  progressTrack: {
    marginTop: 10,
    height: 8,
    borderRadius: 6,
    backgroundColor: withOpacity(colors.border, 0.6),
    overflow: 'hidden',
    flexDirection: 'row',
  },
  progressPresent: {
    height: '100%',
    backgroundColor: withOpacity(colors.success, 0.8),
  },
  progressAbsent: {
    height: '100%',
    backgroundColor: withOpacity(colors.danger, 0.8),
  },
  bottomRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
