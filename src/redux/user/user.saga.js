import {takeLatest, put, all, call} from 'redux-saga/effects';
import userActionTypes from './user.type';

import {auth, googleProvider, createUserProfileDocument} from '../../firebase/firebase.utils';

import {signInFailure, signInSuccess} from './user.actions';


export function* getSnapshotsFromUserAuth(userAuth) {

try {

    const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapShot = yield userRef.get();

        yield put(signInSuccess({id: userSnapShot.id, ...userSnapShot.data()}));

}catch(error) {
    yield put(signInFailure(error));
}

}


export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotsFromUserAuth(user);
        

    } catch(error) {

        yield put(signInFailure(error));


    }
}


export function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotsFromUserAuth(user);


    } catch(error) {

        yield put(signInFailure(error));
    }
    

 
}
export function* ongoogleSigninStart() {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)

}


export function* onemailSigninStart() {
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}
export function* userSaga() {
    yield all ([call(ongoogleSigninStart), call(onemailSigninStart)])
}

