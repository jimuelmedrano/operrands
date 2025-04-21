import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./config";

// READ
export function getCategoryList(
  email: string,
  setCategories: (category: string[]) => void,
  setCategoryId?: (categoryId: string) => void
) {
  const q = query(collection(db, "users"), where("email", "==", email));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      setCategoryId && setCategoryId(doc.id);
      setCategories(doc.data().categories);
    });
  });
  return () => unsubscribe();
}
