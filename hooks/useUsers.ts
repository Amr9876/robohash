import { collection, DocumentData, getDocs, QueryDocumentSnapshot } from "firebase/firestore"
import { useState } from "react";
import { db } from "../firebase.config";

const useUsers = () => {
  const [users, setUsers] = useState<QueryDocumentSnapshot<DocumentData>[]>();

  (async () => {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef)

    setUsers(snapshot.docs);

  })()

  return users;
}

export default useUsers