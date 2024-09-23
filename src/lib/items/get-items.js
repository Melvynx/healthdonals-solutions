import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const q = query(collection(db, "cities"), where("capital", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});

export const getItems = async () => {
  const itemsCollections = collection(db, "items");

  const itemsResult = await getDocs(itemsCollections);

  const data = [];

  itemsResult.forEach((item) => {
    data.push({
      id: item.id,
      ...item.data(),
    });
  });

  return data;
};
