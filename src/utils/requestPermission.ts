import { PermissionsAndroid, Permission } from "react-native"


type PermissionType = 'READ_CALENDAR'
  | 'WRITE_CALENDAR'
  | 'CAMERA'
  | 'READ_CONTACTS'
  | 'WRITE_CONTACTS'
  | 'GET_ACCOUNTS'
  | 'ACCESS_BACKGROUND_LOCATION'
  | 'ACCESS_FINE_LOCATION'
  | 'ACCESS_COARSE_LOCATION'
  | 'RECORD_AUDIO'
  | 'READ_PHONE_STATE'
  | 'CALL_PHONE'
  | 'READ_CALL_LOG'
  | 'WRITE_CALL_LOG'
  | 'ADD_VOICEMAIL'
  | 'READ_VOICEMAIL'
  | 'WRITE_VOICEMAIL'
  | 'USE_SIP'
  | 'PROCESS_OUTGOING_CALLS'
  | 'BODY_SENSORS'
  | 'BODY_SENSORS_BACKGROUND'
  | 'SEND_SMS'
  | 'RECEIVE_SMS'
  | 'READ_SMS'
  | 'RECEIVE_WAP_PUSH'
  | 'RECEIVE_MMS'
  | 'READ_EXTERNAL_STORAGE'
  | 'READ_MEDIA_IMAGES'
  | 'READ_MEDIA_VIDEO'
  | 'READ_MEDIA_AUDIO'
  | 'WRITE_EXTERNAL_STORAGE'
  | 'BLUETOOTH_CONNECT'
  | 'BLUETOOTH_SCAN'
  | 'BLUETOOTH_ADVERTISE'
  | 'ACCESS_MEDIA_LOCATION'
  | 'ACCEPT_HANDOVER'
  | 'ACTIVITY_RECOGNITION'
  | 'ANSWER_PHONE_CALLS'
  | 'READ_PHONE_NUMBERS'
  | 'UWB_RANGING'
  | 'POST_NOTIFICATIONS'
  | 'NEARBY_WIFI_DEVICES'

const RESULTS = {
  DENIED: "denied",
  GRANTED: "granted",
  NEVER_ASK_AGAIN: "never_ask_again"
}


type AndroidPermission = {
  'READ_CALENDAR': Permission
  'WRITE_CALENDAR': Permission
  'CAMERA': Permission
  'READ_CONTACTS': Permission
  'WRITE_CONTACTS': Permission
  'GET_ACCOUNTS': Permission
  'ACCESS_BACKGROUND_LOCATION': Permission
  'ACCESS_FINE_LOCATION': Permission
  'ACCESS_COARSE_LOCATION': Permission
  'RECORD_AUDIO': Permission
  'READ_PHONE_STATE': Permission
  'CALL_PHONE': Permission
  'READ_CALL_LOG': Permission
  'WRITE_CALL_LOG': Permission
  'ADD_VOICEMAIL': Permission
  'READ_VOICEMAIL': Permission
  'WRITE_VOICEMAIL': Permission
  'USE_SIP': Permission
  'PROCESS_OUTGOING_CALLS': Permission
  'BODY_SENSORS': Permission
  'BODY_SENSORS_BACKGROUND': Permission
  'SEND_SMS': Permission
  'RECEIVE_SMS': Permission
  'READ_SMS': Permission
  'RECEIVE_WAP_PUSH': Permission
  'RECEIVE_MMS': Permission
  'READ_EXTERNAL_STORAGE': Permission
  'READ_MEDIA_IMAGES': Permission
  'READ_MEDIA_VIDEO': Permission
  'READ_MEDIA_AUDIO': Permission
  'WRITE_EXTERNAL_STORAGE': Permission
  'BLUETOOTH_CONNECT': Permission
  'BLUETOOTH_SCAN': Permission
  'BLUETOOTH_ADVERTISE': Permission
  'ACCESS_MEDIA_LOCATION': Permission
  'ACCEPT_HANDOVER': Permission
  'ACTIVITY_RECOGNITION': Permission
  'ANSWER_PHONE_CALLS': Permission
  'READ_PHONE_NUMBERS': Permission
  'UWB_RANGING': Permission
  'POST_NOTIFICATIONS': Permission
  'NEARBY_WIFI_DEVICES': Permission
}

const PERMISSIONS: AndroidPermission = {
  'READ_CALENDAR': 'android.permission.READ_CALENDAR',
  'WRITE_CALENDAR': 'android.permission.WRITE_CALENDAR',
  'CAMERA': 'android.permission.CAMERA',
  'READ_CONTACTS': 'android.permission.READ_CONTACTS',
  'WRITE_CONTACTS': 'android.permission.WRITE_CONTACTS',
  'GET_ACCOUNTS': 'android.permission.GET_ACCOUNTS',
  'ACCESS_BACKGROUND_LOCATION': 'android.permission.ACCESS_BACKGROUND_LOCATION',
  'ACCESS_FINE_LOCATION': 'android.permission.ACCESS_FINE_LOCATION',
  'ACCESS_COARSE_LOCATION': 'android.permission.ACCESS_COARSE_LOCATION',
  'RECORD_AUDIO': 'android.permission.RECORD_AUDIO',
  'READ_PHONE_STATE': 'android.permission.READ_PHONE_STATE',
  'CALL_PHONE': 'android.permission.CALL_PHONE',
  'READ_CALL_LOG': 'android.permission.READ_CALL_LOG',
  'WRITE_CALL_LOG': 'android.permission.WRITE_CALL_LOG',
  'ADD_VOICEMAIL': 'com.android.voicemail.permission.ADD_VOICEMAIL',
  'READ_VOICEMAIL': 'com.android.voicemail.permission.READ_VOICEMAIL',
  'WRITE_VOICEMAIL': 'com.android.voicemail.permission.WRITE_VOICEMAIL',
  'USE_SIP': 'android.permission.USE_SIP',
  'PROCESS_OUTGOING_CALLS': 'android.permission.PROCESS_OUTGOING_CALLS',
  'BODY_SENSORS': 'android.permission.BODY_SENSORS',
  'BODY_SENSORS_BACKGROUND': 'android.permission.BODY_SENSORS_BACKGROUND',
  'SEND_SMS': 'android.permission.SEND_SMS',
  'RECEIVE_SMS': 'android.permission.RECEIVE_SMS',
  'READ_SMS': 'android.permission.READ_SMS',
  'RECEIVE_WAP_PUSH': 'android.permission.RECEIVE_WAP_PUSH',
  'RECEIVE_MMS': 'android.permission.RECEIVE_MMS',
  'READ_EXTERNAL_STORAGE': 'android.permission.READ_EXTERNAL_STORAGE',
  'READ_MEDIA_IMAGES': 'android.permission.READ_MEDIA_IMAGES',
  'READ_MEDIA_VIDEO': 'android.permission.READ_MEDIA_VIDEO',
  'READ_MEDIA_AUDIO': 'android.permission.READ_MEDIA_AUDIO',
  'WRITE_EXTERNAL_STORAGE': 'android.permission.WRITE_EXTERNAL_STORAGE',
  'BLUETOOTH_CONNECT': 'android.permission.BLUETOOTH_CONNECT',
  'BLUETOOTH_SCAN': 'android.permission.BLUETOOTH_SCAN',
  'BLUETOOTH_ADVERTISE': 'android.permission.BLUETOOTH_ADVERTISE',
  'ACCESS_MEDIA_LOCATION': 'android.permission.ACCESS_MEDIA_LOCATION',
  'ACCEPT_HANDOVER': 'android.permission.ACCEPT_HANDOVER',
  'ACTIVITY_RECOGNITION': 'android.permission.ACTIVITY_RECOGNITION',
  'ANSWER_PHONE_CALLS': 'android.permission.ANSWER_PHONE_CALLS',
  'READ_PHONE_NUMBERS': 'android.permission.READ_PHONE_NUMBERS',
  'UWB_RANGING': 'android.permission.UWB_RANGING',
  'POST_NOTIFICATIONS': 'android.permission.POST_NOTIFICATIONS',
  'NEARBY_WIFI_DEVICES': 'android.permission.NEARBY_WIFI_DEVICES',
}

export const requestPermission = async (permission: PermissionType) => {
  const result = await PermissionsAndroid.request(PERMISSIONS[permission])

  return result === RESULTS.GRANTED
}


export const requestMultiplePermissions = async (permissions: PermissionType[]) => {
  const selectedPermission = permissions.map(permission => PERMISSIONS[permission])
  console.log({ selectedPermission })
  const result = await PermissionsAndroid.requestMultiple(selectedPermission)
  console.log({ result })

  const hasNotAllowedPermission =
    Object.keys(result)
      .some((value: string) => {
        const key = value as Permission
        return result[key] !== 'granted'
      })

  return !hasNotAllowedPermission
}
