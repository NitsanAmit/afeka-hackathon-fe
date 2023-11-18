import React, { useMemo, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { Artist } from './Artist';
import { FirebaseContext } from './FirebaseContext';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  /**
   * Find in the firebase console
   */
};


function App() {
  const app = useMemo(() => initializeApp(firebaseConfig), []);
  const [firestore] = useState(getFirestore(app));
  const [functions] = useState(getFunctions(app));
  return (
    <FirebaseContext.Provider value={{ firestore, functions }}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index Component={Home}/>
            <Route path="artist/:id" Component={Artist}/>
            <Route/>
          </Route>
        </Routes>
      </BrowserRouter>
    </FirebaseContext.Provider>
  );
}

export default App;
