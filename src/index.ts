import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import config from './config';

export const firebaseApp = firebase.apps.length ? firebase.apps[0] : firebase.initializeApp(config);
export const firebaseAuth = firebaseApp.auth();
export const db = firebaseApp.firestore();
export const storage = firebaseApp.storage();
export const firAuth = firebase.auth;

export const { Timestamp } = firebase.firestore;
export type TimestampType = firebase.firestore.Timestamp;

firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
