import { collection, doc, DocumentData, getDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase.config";

const useUser = () => {
  const [user, setUser] = useState<DocumentData>();

  const usersRef = collection(db, 'users');

  (async () => {
    if(auth.currentUser){
      const usersDocRef = doc(usersRef, auth.currentUser.uid);
      
      const snapshot = await getDoc(usersDocRef)

      setUser(snapshot.data());
    }
  })()

  return user;
}

export default useUser