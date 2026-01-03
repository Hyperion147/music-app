import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const ensureUserDoc = async (uid) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, { favorites: [] });
  }

  return ref;
};

export const addFavorite = async (songId) => {
  const user = auth.currentUser;
  if (!user) return;

  const ref = await ensureUserDoc(user.uid);

  await updateDoc(ref, {
    favorites: arrayUnion(songId),
  });
};

export const removeFavorite = async (songId) => {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid);

  await updateDoc(ref, {
    favorites: arrayRemove(songId),
  });
};

export const getFavorites = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return [];

  return snap.data().favorites || [];
};
