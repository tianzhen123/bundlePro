import {
    BackHandler,
    ToastAndroid
} from 'react-native'

let lastTime = 0;

let handler = null;

/**
 * android 返回键退出
 * @param msg 提示信息
 * @param exitMills 间隔时间 毫秒
 */
const bindBackExitApp = ({msg = '再按一次退出应用', exitMills = 2000}) => {
    handler = BackHandler.addEventListener('hardwareBackPress', () => {
        let time = Date.now();
        if (time - lastTime <= exitMills) {
            BackHandler.exitApp();
            return false;
        } else {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
            lastTime = time;
            return true;
        }
    })
};

const removeBackExitApp = () => {
    handler && handler.remove()
};

export {
    bindBackExitApp,
    removeBackExitApp
}