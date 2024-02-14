import {initializeApp} from 'firebase/app';
import { NextOrObserver,User,onAuthStateChanged, getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { QueryDocumentSnapshot,getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'
import { Category } from '../../store/categories/category.types';


const firebaseConfig = {
    apiKey: "AIzaSyAXTlGx0e3afcyTr6gIr2WzJ8L6PALR4xw",
    authDomain: "crwn-clothing-db-bb352.firebaseapp.com",
    projectId: "crwn-clothing-db-bb352",
    storageBucket: "crwn-clothing-db-bb352.appspot.com",
    messagingSenderId: "755448336992",
    appId: "1:755448336992:web:7b10ea41190a35b4942905" 
};

const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export type ObjectToAdd = {
    title: string;

}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
    console.log("done");
} 



export const getCategoiresAndDocuemnts = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);

};

export const db = getFirestore();

export type AdditionalInformation={
    displayName?: string
}

export type UserData = {
    createAt: Date,
    dsiplayName: string,
    email: string,
}

export async function createUserDocumentFromAuth(userAuth: User, additionalInformation = {} as AdditionalInformation): Promise<void | QueryDocumentSnapshot<UserData>>{
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
           await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
           }) 
        }catch (error){
            console.log('error creating the user', error);
        }

    }

    return userSnapshot as QueryDocumentSnapshot<UserData>;
}



export async function createAuthUserWithEmailAndPassword(email: string, password: string){
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);

}

export async function signInAuthUserWithEmailAndPassword (email: string, password: string){
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth , email, password);
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>{
    onAuthStateChanged(auth, callback);

}

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) =>{
        const unsubscribe = onAuthStateChanged(
            auth, 
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}