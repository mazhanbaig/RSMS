import { app } from '@/FBConfig/config'
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, get, remove, update } from "firebase/database";

export const auth = getAuth(app);
const db = getDatabase(app);

// ---------------- GOOGLE SIGN-IN ----------------

const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        set(ref(db, 'users/' + user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          provider: 'google',
          createdAt: new Date().toISOString()
        })
          .then(() => resolve(result))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};

// ---------------- LOGOUT ----------------

let logout = () => {
  return signOut(auth);
};

// ---------------- GET DATA ----------------

const getData = (path: string) => {
  return new Promise((resolve, reject) => {
    const dbRef = ref(db, path);
    get(dbRef)
      .then((snapshot) => resolve(snapshot.exists() ? snapshot.val() : null))
      .catch((err) => reject(err));
  });
};

// ---------------- SAVE DATA ----------------

const saveData = (path: string, data: any) => {
  return new Promise((resolve, reject) => {
    set(ref(db, path), data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

// ---------------- DELETE DATA ----------------

const deleleData = (path: string) => {
  return new Promise((resolve, reject) => {
    remove(ref(db, path))
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

// ---------------- UPDATE DATA ----------------

const updateData = (path: string, data: any) => {
  return new Promise((resolve, reject) => {
    update(ref(db, path), data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

// ---------------- UPLOAD IMAGE (Cloudinary) ----------------

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ImagesOfProperties");

  const url = "https://api.cloudinary.com/v1_1/dwtvol0ha/image/upload";

  try {
    const res = await fetch(url, { method: "POST", body: formData });
    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
};

const uploadImagesToCloudinary = async (files: File[]) => {
  const urls: string[] = [];
  for (let file of files) {
    const url = await uploadImage(file);
    if (url) urls.push(url);
  }
  return urls;
};

export {
  signInWithGoogle,
  logout,
  getData,
  saveData,
  deleleData,
  updateData,
  uploadImage,
  uploadImagesToCloudinary
};
