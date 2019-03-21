import {takeEvery, takeLatest} from 'redux-saga/effects';
import {login} from './login';

export const USER_LOGIN_REQUEST = 'user_login_request';

function* mySaga() {
    yield takeLatest(USER_LOGIN_REQUEST, login);
}

export default mySaga;
