import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronDown } from 'lucide-react-native'
import QRCode from 'react-native-qrcode-svg'
import { Picker } from '@react-native-picker/picker'
import { colors, withOpacity } from '../../constants/colors'
import Divider from '../../components/Divider'
import api from '../../util/apiClient'
import { ENDPOINTS } from '../../constants/api'
import Loading from '../../components/Loading'
import Toast from 'react-native-toast-message'

const Qrcode = () => {
  const [subjects, setSubjects] = useState([])
  const [subjectsLoading, setSubjectsLoading] = useState(true)
  const [subjectsError, setSubjectsError] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [showQr, setShowQr] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [token, setToken] = useState('')
  const [tokenLoading, setTokenLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [tempSelectedId, setTempSelectedId] = useState('')
  const tokenTimerRef = useRef(null)
  const [teacherDetails, setTeacherDetails] = useState({
    firstName: '',
    lastName: '',
    teacherId: ''
  })
  const [teacherId, setTeacherId] = useState('')
  const selectedSubject = useMemo(
    () => subjects.find((subject) => subject.subjectCode === selectedId),
    [subjects, selectedId]
  )

  useEffect(() => {
    async function loadSubjects() {
      setSubjectsLoading(true)
      setSubjectsError('')
      try {
        const data = await api.get(ENDPOINTS.TEACHER.SUBJECTS)
        setSubjects(data)
        setSelectedId(data[0]?.subjectCode || '')
        setTempSelectedId(data[0]?.subjectCode || '')
      } catch (error) {
        setSubjectsError(error.message || 'Failed to load subjects')
        Toast.show({type:'error',text1:'Cannot load subjects',text2:error.message});
      } finally {
        setSubjectsLoading(false)
      }
    }

    async function loadTeacherProfile() {
      try {
        const data = await api.get(ENDPOINTS.TEACHER.PROFILE)
        if (data) {
          const resolvedTeacherId = data.teacherId
          setTeacherDetails({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            teacherId: resolvedTeacherId
          })
          setTeacherId(resolvedTeacherId)
        }
      } catch (error) {
        Toast.show({type:'error',text1:'Cannot load Teacher',text2:error.message});
      }
    }

    loadSubjects()
    loadTeacherProfile()
  }, [])

  useEffect(() => {
    return () => {
      if (tokenTimerRef.current) clearInterval(tokenTimerRef.current)
    }
  }, [])

  const openSubjectPicker = () => {
    if (subjects.length === 0) return
    setTempSelectedId(selectedId || subjects[0]?.subjectCode || '')
    setPickerOpen(true)
  }

  const closeSubjectPicker = () => {
    setPickerOpen(false)
  }

  const confirmSubjectPicker = () => {
    if (sessionId) stopSession()
    const nextSelectedId = tempSelectedId || selectedId || subjects[0]?.subjectCode || ''
    setSelectedId(nextSelectedId)
    setPickerOpen(false)
  }

  const fetchToken = async (id) => {
    setTokenLoading(true)
    try {
      const data = await api.get(ENDPOINTS.TEACHER.SESSIONS.TOKEN(id))
      setToken(data.token)
    } catch (error) {
      Toast.show({type:"error", text1:"Cannot fetch token",text2:error.message});
      setToken('')
    } finally {
      setTokenLoading(false)
    }
  }

  const startSession = async () => {
    if (!selectedId || actionLoading) return
    setActionLoading(true)
    try {
      if (!teacherId) {
        setShowQr(false)
        return
      }
      const data = await api.post(ENDPOINTS.TEACHER.SESSIONS.START, {
        teacherId,
        subjectCode: selectedId
      })
      const id = data.sessionId;
      if (!id) {
        setShowQr(false)
        return
      }
      setSessionId(id)
      setShowQr(true)
      await fetchToken(id)
      if (tokenTimerRef.current) clearInterval(tokenTimerRef.current)
      tokenTimerRef.current = setInterval(() => fetchToken(id), 10000)
    } catch (error) {
      Toast.show({type:'error', text1:'Cannot Start Session',text2:error.message});
      setShowQr(false)
    } finally {
      setActionLoading(false)
    }
  }

  const stopSession = async () => {
    if (!sessionId || actionLoading) return
    setActionLoading(true)
    try {
      await api.patch(ENDPOINTS.TEACHER.SESSIONS.STOP(sessionId))
    } catch (error) {
    } finally {
      if (tokenTimerRef.current) clearInterval(tokenTimerRef.current)
      tokenTimerRef.current = null
      setToken('')
      setSessionId('')
      setShowQr(false)
      setActionLoading(false)
    }
  }

  const handleSubjectChange = (value) => {
    if (sessionId) stopSession()
    setSelectedId(value)
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
          {subjectsLoading ? (
            <View style={styles.loadingRow}>
              <Loading fullScreen={false} showMessage={false} size="small" />
              <Text className="text-muted ml-3">Loading subjects...</Text>
            </View>
          ) : subjectsError ? (
            <Text className="text-danger mt-2">{subjectsError}</Text>
          ) : null}
          {Platform.OS === 'ios' ? (
            <Pressable
              onPress={openSubjectPicker}
              disabled={subjects.length === 0}
              style={[styles.dropdown, subjects.length === 0 && styles.dropdownDisabled]}
            >
              <Text className="text-muted text-base">
                {selectedSubject
                  ? `${selectedSubject.subjectName} (${selectedSubject.subjectCode})`
                  : 'Select subject'}
              </Text>
              <ChevronDown size={18} color={colors.muted} />
            </Pressable>
          ) : (
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedId}
                onValueChange={(value) => {
                  handleSubjectChange(value)
                }}
                style={styles.picker}
                dropdownIconColor={colors.muted}
              >
                {subjects.length === 0 && (
                  <Picker.Item label="No subjects available" value="" enabled={false} />
                )}
                {subjects.map((subject) => (
                  <Picker.Item
                    key={subject.subjectCode}
                    label={`${subject.subjectName} (${subject.subjectCode})`}
                    value={subject.subjectCode}
                  />
                ))}
              </Picker>
            </View>
          )}

          <Divider margin={12} />

          {showQr ? (
            <TouchableOpacity
              onPress={stopSession}
              style={[styles.button, styles.buttonStop]}
              disabled={actionLoading}
            >
              <Text className="text-surface font-semibold text-lg">
                {actionLoading ? 'Stopping...' : 'Stop QR'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={startSession}
              disabled={!selectedSubject || subjectsLoading}
              style={[styles.button, !selectedSubject && styles.buttonDisabled]}
            >
              <Text className="text-surface font-semibold text-lg">
                {actionLoading ? 'Starting...' : 'Show QR'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.card}>
          <Text className="text-xl font-semibold text-muted mb-3">Active QR</Text>
          <View style={styles.qrFrame}>
            {showQr && token ? (
              <QRCode value={token} size={170} color={colors.text} />
            ) : tokenLoading ? (
              <Loading fullScreen={false} showMessage={false} size="small" />
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
              {teacherDetails.firstName || teacherDetails.lastName
                ? `${teacherDetails.firstName} ${teacherDetails.lastName}`.trim()
                : '-'}
            </Text>
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-muted">Teacher ID</Text>
            <Text className="text-muted">{teacherDetails.teacherId || '-'}</Text>
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-muted">Subject</Text>
            <Text className="text-muted">{selectedSubject ? selectedSubject.subjectName : '-'}</Text>
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
              <Pressable style={styles.modalSheet} onPress={() => {
              }}>
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
                      key={subject.subjectCode}
                      label={`${subject.subjectName} (${subject.subjectCode})`}
                      value={subject.subjectCode}
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
    paddingBottom: 24
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 16,
    shadowColor: colors.muted,
    shadowRadius: 8,
    shadowOpacity: 0.2,
    padding: 20
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
    justifyContent: 'space-between'
  },
  dropdownDisabled: {
    opacity: 0.6
  },
  pickerWrapper: {
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    overflow: 'hidden',
    height: 56,
    justifyContent: 'center'
  },
  picker: {
    height: 56,
    paddingVertical: 6,
    color: colors.text
  },
  pickerItem: {
    color: colors.text
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: withOpacity(colors.text, 0.35),
    justifyContent: 'flex-end'
  },
  modalSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 12
  },
  modalHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: colors.primary,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStop: {
    backgroundColor: colors.danger
  },
  buttonDisabled: {
    opacity: 0.5
  },
  loadingRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  qrFrame: {
    height: 220,
    borderRadius: 18,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: withOpacity(colors.primary, 0.4),
    backgroundColor: withOpacity(colors.primary, 0.06),
    alignItems: 'center',
    justifyContent: 'center'
  }
})
