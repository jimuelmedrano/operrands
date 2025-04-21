import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";
import { addDefaultErrands } from "./errands";

export async function onSignInUserInfo(
  displayName: string | null,
  email: string | null
) {
  const q = query(collection(db, "users"), where("email", "==", email));

  const querySnapshot = await getDocs(q);

  const userExists = querySnapshot.docs.length > 0;
  if (displayName === null) {
    displayName = email!.split("@")[0];
  }

  if (!userExists) {
    await addUser(displayName, email);
    await addDefaultErrands(email);
  }
}

// Adding single data to firestore
async function addUser(displayName: string | null, email: string | null) {
  try {
    await addDoc(collection(db, "users"), {
      displayName: displayName,
      email: email,
      categories: ["To do", "Daily", "Weekly", "Monthly"],
      dateCreated: new Date(),
    });
  } catch (error) {
    console.log(error);
  }
}
