import { db } from "../_utils/firebase";
import {
  doc,
  addDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// find Firestore document ID by gameId & storeId
async function findGameDocId(userId, gameId, storeId) {
  const gamesRef = collection(db, "users", userId, "games");
  const q = query(
    gamesRef,
    where("gameID", "==", gameId),
    where("storeID", "==", storeId)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty ? null : querySnapshot.docs[0].id;
}

// Fetch all saved games for user
export async function getGames(userId) {
  try {
    const games = [];
    const gamesRef = collection(db, "users", userId, "games");
    const snapshot = await getDocs(gamesRef);
    snapshot.forEach((doc) => {
      games.push({ firestoreId: doc.id, ...doc.data() });
    });
    return games;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
}

// Save game to favorites
export async function addGame(userId, game) {
  try {
    const gamesRef = collection(db, "users", userId, "games");
    const snapshot = await addDoc(gamesRef, {
      ...game,
      savedAt: new Date(),
    });
    return snapshot.id;
  } catch (error) {
    console.error("Error adding game:", error);
    throw error;
  }
}

// Delete saved game
export async function deleteGame(userId, gameId, storeId) {
  try {
    const docId = await findGameDocId(userId, gameId, storeId);
    if (!docId) throw new Error("Game not found in favorites");
    await deleteDoc(doc(db, "users", userId, "games", docId));
    return true;
  } catch (error) {
    console.error("Error deleting game:", error);
    throw error;
  }
}

// Check if game is saved
export async function isSaved(userId, gameId, storeId) {
  try {
    const docId = await findGameDocId(userId, gameId, storeId);
    return docId !== null;
  } catch (error) {
    console.error("Error checking saved status:", error);
    return false;
  }
}
