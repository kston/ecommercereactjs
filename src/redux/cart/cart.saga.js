import {takeLatest, put, all, call} from 'redux-saga/effects';
import {clearCart} from './cart.actions';
import userActionTypes from '../user/user.type';

export function* clearCartOnSignOut() {
    yield put (clearCart())
}

export function* onSignOutSuccess() {
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSaga() {
    yield all([call(onSignOutSuccess)])
}