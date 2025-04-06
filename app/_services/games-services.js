// Firestore CRUD
import { db } from "../_utils/firebase";
import {
  doc,
  addDoc,
  deleteDoc,
  collection,
  getDocs,
  getDoc,
} from "firebase/firestore";

// Fetch saved games
export async function getGames(userId) {
  try {
    const games = [];
    const gamesCollectionRef = collection(db, "users", userId, "games");
    const gamesCollectionSnapshot = await getDocs(gamesCollectionRef);
    gamesCollectionSnapshot.forEach((doc) => {
      games.push({ id: doc.id, ...doc.data() });
    });
    return games;
  } catch (error) {
    console.error("Error fetching games: ", error);
    return [];
  }
}

// Save game to favorites
export async function addGame(userId, game) {
  try {
    const gamesCollectionRef = collection(db, "users", userId, "games");
    const docRef = await addDoc(gamesCollectionRef, {
      ...game,
      savedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding game: ", error);
    throw new Error("Failed to save game");
  }
}

// Delete saved game
export async function deleteGame(userId, gameId) {
  try {
    const gameDocRef = doc(db, "users", userId, "games", gameId);
    await deleteDoc(gameDocRef);
    return true;
  } catch (error) {
    console.error("Error deleting game: ", error);
    throw new Error("Failed to remove game");
  }
}

// Check if game is saved
export async function isSaved(userId, gameId) {
  try {
    const docRef = doc(db, "users", userId, "games", gameId);
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.exists();
  } catch (error) {
    console.error("Error checking if game is saved: ", error);
    return false;
  }
}
