import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronDown } from 'lucide-react-native'
import QRCode from 'react-native-qrcode-svg'
import { Picker } from '@react-native-picker/picker'
import { teacherDetails, teacherQrTokens, teacherSubjects } from '../../mocks/mockdata'
import { colors, withOpacity } from '../../constants/colors'
import Divider from '../../components/Divider'

const Qrcode = () => {
  const subjects = useMemo(
    () =>
      teacherSubjects.map((subject) => ({
        id: subject.subjectId,
        name: subject.subjectName,
      })),
    [],
  )

  const [selectedId, setSelectedId] = useState(subjects[0]?.id ?? '')
  const [showQr, setShowQr] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [tempSelectedId, setTempSelectedId] = useState(subjects[0]?.id ?? '')
  const selectedSubject = useMemo(
    () => subjects.find((subject) => subject.id === selectedId),
    [subjects, selectedId],
  )

  const qrToken = useMemo(() => {
    if (!selectedSubject) return ''
    const tokenEntry = teacherQrTokens.find((entry) => entry.subjectId === selectedSubject.id)
    return tokenEntry?.qrJwt ?? ''
  }, [selectedSubject])

  const openSubjectPicker = () => {
    if (subjects.length === 0) return
    setTempSelectedId(selectedId || subjects[0]?.id || '')
    setPickerOpen(true)
  }

  const closeSubjectPicker = () => {
    setPickerOpen(false)
  }

  const confirmSubjectPicker = () => {
    setSelectedId(tempSelectedId)
    setShowQr(false)
    setPickerOpen(false)
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerStyle={styles.content}>
        <Text className="mx-8 mb-2 mt-10 text-4xl font-bold">QR Code</Text>
        <Text className="mx-8 text-xl text-muted">
          Pick a subject to generate a QR for attendance.
        </Text>

        <View style={styles.card}>
          <Text className="text-xl font-semibold text-muted">Subject</Text>
          {Platform.OS === 'ios' ? (
            <Pressable
              onPress={openSubjectPicker}
              disabled={subjects.length === 0}
              style={[styles.dropdown, subjects.length === 0 && styles.dropdownDisabled]}
            >
              <Text className="text-muted text-base">
                {selectedSubject
                  ? `${selectedSubject.name} (${selectedSubject.id})`
                  : 'Select subject'}
              </Text>
              <ChevronDown size={18} color={colors.muted} />
            </Pressable>
          ) : (
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedId}
                onValueChange={(value) => {
                  setSelectedId(value)
                  setShowQr(false)
                }}
                style={styles.picker}
                dropdownIconColor={colors.muted}
              >
                {subjects.length === 0 && (
                  <Picker.Item label="No subjects available" value="" enabled={false} />
                )}
                {subjects.map((subject) => (
                  <Picker.Item
                    key={subject.id}
                    label={`${subject.name} (${subject.id})`}
                    value={subject.id}
                  />
                ))}
              </Picker>
            </View>
          )}

          <Divider margin={12} />

          {showQr ? (
            <TouchableOpacity
              onPress={() => setShowQr(false)}
              style={[styles.button, styles.buttonStop]}
            >
              <Text className="text-surface font-semibold text-lg">Stop QR</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setShowQr(true)}
              disabled={!selectedSubject}
              style={[styles.button, !selectedSubject && styles.buttonDisabled]}
            >
              <Text className="text-surface font-semibold text-lg">Show QR</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.card}>
          <Text className="text-xl font-semibold text-muted mb-3">Active QR</Text>
          <View style={styles.qrFrame}>
            {showQr && qrToken ? (
              <QRCode value={qrToken} size={170} color={colors.text} />
            ) : (
              <Text className="text-muted">
                {selectedSubject ? 'Tap Show QR' : 'Select a subject'}
              </Text>
            )}
          </View>
          <Divider margin={14} />
          <View className="flex-row justify-between">
            <Text className="text-muted">Teacher</Text>
            <Text className="text-muted">
              {teacherDetails.firstName} {teacherDetails.lastName}
            </Text>
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-muted">Teacher ID</Text>
            <Text className="text-muted">{teacherDetails.teacherId}</Text>
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-muted">Subject</Text>
            <Text className="text-muted">{selectedSubject ? selectedSubject.name : '-'}</Text>
          </View>
        </View>
        {Platform.OS === 'ios' && (
          <Modal
            visible={pickerOpen}
            transparent
            animationType="slide"
            onRequestClose={closeSubjectPicker}
          >
            <Pressable style={styles.modalBackdrop} onPress={closeSubjectPicker}>
              <Pressable style={styles.modalSheet} onPress={() => {}}>
                <View style={styles.modalHeader}>
                  <Pressable onPress={closeSubjectPicker}>
                    <Text className="text-muted">Cancel</Text>
                  </Pressable>
                  <Text className="text-muted font-semibold">Select subject</Text>
                  <Pressable onPress={confirmSubjectPicker}>
                    <Text className="text-muted font-semibold">Done</Text>
                  </Pressable>
                </View>
                <Picker
                  selectedValue={tempSelectedId}
                  onValueChange={(value) => setTempSelectedId(value)}
                  itemStyle={styles.pickerItem}
                >
                  {subjects.map((subject) => (
                    <Picker.Item
                      key={subject.id}
                      label={`${subject.name} (${subject.id})`}
                      value={subject.id}
                    />
                  ))}
                </Picker>
              </Pressable>
            </Pressable>
          </Modal>
        )}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Qrcode

const styles = StyleSheet.create({
  content: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 16,
    shadowColor: colors.muted,
    shadowRadius: 8,
    shadowOpacity: 0.2,
    padding: 20,
  },
  dropdown: {
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    paddingHorizontal: 14,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownDisabled: {
    opacity: 0.6,
  },
  pickerWrapper: {
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    overflow: 'hidden',
    height: 56,
    justifyContent: 'center',
  },
  picker: {
    height: 56,
    paddingVertical: 6,
    color: colors.text,
  },
  pickerItem: {
    color: colors.text,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: withOpacity(colors.text, 0.35),
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 12,
  },
  modalHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.primary,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStop: {
    backgroundColor: colors.danger,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  qrFrame: {
    height: 220,
    borderRadius: 18,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: withOpacity(colors.primary, 0.4),
    backgroundColor: withOpacity(colors.primary, 0.06),
    alignItems: 'center',
    justifyContent: 'center',
  },
})
