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

// Helper function to find Firestore document ID by gameID
async function findGameDocId(userId, gameId) {
  const gamesRef = collection(db, "users", userId, "games");
  const q = query(gamesRef, where("gameID", "==", gameId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty ? null : querySnapshot.docs[0].id;
}

// Fetch all saved games for a user
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
    const docRef = await addDoc(gamesRef, {
      ...game,
      savedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding game:", error);
    throw error;
  }
}

// Delete saved game
export async function deleteGame(userId, gameId) {
  try {
    const docId = await findGameDocId(userId, gameId);
    if (!docId) throw new Error("Game not found in favorites");

    await deleteDoc(doc(db, "users", userId, "games", docId));
    return true;
  } catch (error) {
    console.error("Error deleting game:", error);
    throw error;
  }
}

// Check if game is saved
export async function isSaved(userId, gameId) {
  try {
    const docId = await findGameDocId(userId, gameId);
    return docId !== null;
  } catch (error) {
    console.error("Error checking saved status:", error);
    return false;
  }
}
