import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";

export const setItem = async (id, item) => {
  if (item.image instanceof File) {
    const path = `images/${item.image.name}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, item);
    const downloadUrl = await getDownloadURL(storageRef);
    item.image = downloadUrl;
    item.imagePath = path;
  }

  const file = doc(db, "items", id);
  await setDoc(file, item);
};
