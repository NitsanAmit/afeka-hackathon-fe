import { createContext } from 'react';
import { Firestore } from '@firebase/firestore';
import { Functions } from '@firebase/functions';

interface FirebaseContextType {
  firestore: Firestore;
  functions: Functions;
}

export const FirebaseContext = createContext<FirebaseContextType | null>(null);
