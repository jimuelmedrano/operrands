import moment from "moment";
import { db } from "./config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ErrandItemProps } from "../interface";
import { getDefaultTime } from "../utils";

export async function addDefaultErrands(email: string | null) {
  try {
    await addDoc(collection(db, "errands"), {
      user: email,
      addedDate: new Date(),
      title: "Create new errand",
      notes: "Click the add button to create a new errand",
      status: "todo",
      category: "To do",
      startDate: moment().toISOString().split("T")[0],
      repeat: "None",
      repeatDayOfWeek: ["Mon"],
      repeatDayOfMonth: [1],
    });
    await addDoc(collection(db, "errands"), {
      user: email,
      addedDate: new Date(),
      title: "Check Daily errands",
      notes: "Click the Daily errands category button",
      status: "todo",
      category: "To do",
      startDate: moment().toISOString().split("T")[0],
      repeat: "None",
      repeatDayOfWeek: ["Mon"],
      repeatDayOfMonth: [1],
    });
    await addDoc(collection(db, "errands"), {
      user: email,
      addedDate: new Date(),
      title: "Sample errand",
      notes: "Edit or delete this errand by clicking on it",
      status: "todo",
      category: "Daily",
      startDate: moment().toISOString().split("T")[0],
      repeat: "Daily",
      repeatDayOfWeek: ["Mon"],
      repeatDayOfMonth: [1],
    });
  } catch (error) {
    console.log(error);
  }
}

// CREATE
export async function addNewErrand(errandData: ErrandItemProps) {
  try {
    await addDoc(collection(db, "errands"), errandData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// READ (Home errands and All errands)
export function getAllErrands(
  user: string,
  setErrandsData: (errands: Object[]) => void
) {
  const q = query(collection(db, "errands"), where("user", "==", user));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let errandsList: Object[] = [];
    querySnapshot.forEach((doc) => {
      errandsList.push({
        id: doc.id,
        title: doc.data().title,
        notes: doc.data().notes,
        status: doc.data().status,
        category: doc.data().category,
        startDate: doc.data().startDate,
        repeat: doc.data().repeat,
        repeatDayOfWeek: doc.data().repeatDayOfWeek,
        repeatDayOfMonth: doc.data().repeatDayOfMonth,
        dueDate: doc.data().dueDate,
        addedDate: doc.data().addedDate.toDate(),
        user: doc.data().user,
      });
    });
    setErrandsData(errandsList);
  });
  return () => unsubscribe();
}

export async function getHomeErrands(
  user: string,
  setErrandsData: (errands: Object[]) => void
) {
  const q = query(
    collection(db, "errands"),
    where("user", "==", user),
    where("status", "==", "todo"),
    orderBy("addedDate", "desc")
  );

  const defTime = getDefaultTime();

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let errandsList: Object[] = [];
    querySnapshot.forEach((doc) => {
      let defaultTime;
      if (doc.data().time === "" || doc.data().time === undefined) {
        defaultTime = defTime;
      } else {
        defaultTime = doc.data().time;
      }
      errandsList.push({
        id: doc.id,
        title: doc.data().title,
        notes: doc.data().notes,
        status: doc.data().status,
        category: doc.data().category,
        startDate: doc.data().startDate,
        repeat: doc.data().repeat,
        repeatDayOfWeek: doc.data().repeatDayOfWeek,
        repeatDayOfMonth: doc.data().repeatDayOfMonth,
        dueDate: doc.data().dueDate,
        time: defaultTime,
        addedDate: doc.data().addedDate.toDate(),
        user: doc.data().user,
      });
    });
    setErrandsData(errandsList);
  });
  return () => unsubscribe();
}

// UPDATE
export async function editErrand(errandData: ErrandItemProps) {
  const docRef = doc(db, "errands", errandData.id);
  try {
    await updateDoc(docRef, {
      title: errandData.title,
      notes: errandData.notes,
      status: errandData.status,
      category: errandData.category,
      startDate: errandData.startDate,
      repeat: errandData.repeat,
      repeatDayOfWeek: errandData.repeatDayOfWeek,
      repeatDayOfMonth: errandData.repeatDayOfMonth,
      dueDate: errandData.dueDate,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// DELETE
export async function deleteErrand(errandId: string) {
  try {
    await deleteDoc(doc(db, "errands", errandId));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
