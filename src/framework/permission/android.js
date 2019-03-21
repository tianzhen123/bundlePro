import {PermissionsAndroid} from 'react-native';
const permissionType = {
    READ_CALENDAR: '读取日程',
    WRITE_CALENDAR: '写入日程',
    CAMERA: '摄像头',
    READ_CONTACTS: '访问联系人',
    WRITE_CONTACTS: '写入联系人',
    GET_ACCOUNTS: '访问GMail账户',
    ACCESS_FINE_LOCATION: 'GPS定位',
    ACCESS_COARSE_LOCATION: 'WiFi或移动基站定位',
    RECORD_AUDIO: '录音或麦克风',
    READ_PHONE_STATE: '访问电话状态',
    CALL_PHONE: '拨号器',
    READ_CALL_LOG: '读取通话记录',
    WRITE_CALL_LOG: '写入通话记录',
    ADD_VOICEMAIL: '添加语音邮件',
    USE_SIP: '使用SIP视频服务',
    PROCESS_OUTGOING_CALLS: '允许应用程序监视、修改、忽略拨出的电话',
    BODY_SENSORS: '人体传感器',
    SEND_SMS: '发送短信',
    RECEIVE_SMS: '接收短信',
    READ_SMS: '读取短信内容',
    RECEIVE_WAP_PUSH: '接收WAP PUSH信息',
    RECEIVE_MMS: '接收彩信',
    READ_EXTERNAL_STORAGE: '读外部存储',
    WRITE_EXTERNAL_STORAGE: '写外部存储'
}
async function requestPermission(type) {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS[type],
            {
                title: '申请'+permissionType.type+'权限',
                message:
                    '是否同意获取权限',
                buttonNeutral: '稍后再询问',
                buttonNegative: '否',
                buttonPositive: '是',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('获取成功！');
        } else {
            console.log('获取失败！');
        }
    } catch (err) {
        console.warn(err);
    }
}

export default requestPermission;