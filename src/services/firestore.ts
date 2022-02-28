
import admin, { ServiceAccount } from 'firebase-admin'
import {getFirestore} from 'firebase-admin/firestore'
import serviceAccount = require('./utils/ServiceAccountKey.json')

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
})

const db = getFirestore(app);

db.settings({ ignoreUndefinedProperties: true })

export {db}