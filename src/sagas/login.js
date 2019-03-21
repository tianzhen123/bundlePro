import {call, put} from 'redux-saga/effects';
import {Actions} from 'react-native-router-flux';
import Api from '../service/Api';
import {Toast} from '../components/Toast';
import {Loading} from '../components/Loading';
import deviceStorage from '../framework/storage/deviceStorage';

/**
 * 用户登录
 * @param action
 * @returns {IterableIterator<CallEffect>}
 */
export function* login(action) {
    try {
        Loading.show('登录中, 请稍后');
        const response = yield call(Api.login, action.data.account, action.data.password);
        Loading.hidden();
        Toast.show('登录成功');
        // 储存user对象
        deviceStorage.save('user', response.data);
        Actions.tabbar({type: 'reset'});
    } catch (e) {
        Loading.hidden();
        console.log(e);
        Toast.show(e);
    }
}