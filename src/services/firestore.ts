import {getStorage} from 'firebase/storage';
import admin, { ServiceAccount } from 'firebase-admin'
import {getFirestore} from 'firebase-admin/firestore'
import serviceAccount = require('./utils/ServiceAccountKey.json')

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
})

export const db = getFirestore(app);