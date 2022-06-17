import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAul-IcZtmL1-iHLYhmUOqVyMsbiF9hHkU',
	authDomain: 'todoapp-21c6a.firebaseapp.com',
	projectId: 'todoapp-21c6a',
	storageBucket: 'todoapp-21c6a.appspot.com',
	messagingSenderId: '776048101146',
	appId: '1:776048101146:web:2f32f50484076da64acea3',
	measurementId: 'G-MHE91BDY5V',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
