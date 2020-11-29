import {takeLatest, put, all, call} from 'redux-saga/effects';
import userActionTypes from './user.type';

import {auth, googleProvider, createUserProfileDocument} from '../../firebase/firebase.utils';

import {signInFailure, signInSuccess} from './user.actions'


export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapShot = yield userRef.get();

        yield put(signInSuccess({id: userSnapShot.id, ...userSnapShot.data()}))

    } catch(error) {

        yield put(signInFailure(error))


    }
}

export function* onGoogleSigninStart() {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)

}

export function* userSaga() {
    yield all ([call(onGoogleSigninStart)])
}
