// import { app } from '@/FBConfig/config'
// import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
// import { getDatabase, ref, set, get, remove, update } from "firebase/database";

// export const auth = getAuth(app);
// const db = getDatabase(app);

// // ---------------- GOOGLE SIGN-IN ----------------

// const signInWithGoogle = () => {
//   return new Promise((resolve, reject) => {
//     const provider = new GoogleAuthProvider();

//     signInWithPopup(auth, provider)
//       .then((result) => {
//         const user = result.user;

//         set(ref(db, 'users/' + user.uid), {
//           uid: user.uid,
//           name: user.displayName,
//           email: user.email,
//           photoURL: user.photoURL,
//           provider: 'google',
//           createdAt: new Date().toISOString()
//         })
//           .then(() => resolve(result))
//           .catch((err) => reject(err));
//       })
//       .catch((err) => reject(err));
//   });
// };

// // ---------------- LOGOUT ----------------

// let logout = () => {
//   return signOut(auth);
// };

// const checkUserSession = () => {
//   return new Promise((resolve) => {
//     onAuthStateChanged(auth, (user) => {
//       resolve(user ? user : null);
//     });
//   });
// };

// // ---------------- GET DATA ----------------

// const getData = (path: string) => {
//   return new Promise((resolve, reject) => {
//     const dbRef = ref(db, path);
//     get(dbRef)
//       .then((snapshot) => resolve(snapshot.exists() ? snapshot.val() : null))
//       .catch((err) => reject(err));
//   });
// };

// // ---------------- SAVE DATA ----------------

// const saveData = (path: string, data: any) => {
//   return new Promise((resolve, reject) => {
//     set(ref(db, path), data)
//       .then((res) => resolve(res))
//       .catch((err) => reject(err));
//   });
// };

// // ---------------- DELETE DATA ----------------

// const deleleData = (path: string) => {
//   return new Promise((resolve, reject) => {
//     remove(ref(db, path))
//       .then((res) => resolve(res))
//       .catch((err) => reject(err));
//   });
// };

// // ---------------- UPDATE DATA ----------------

// const updateData = (path: string, data: any) => {
//   return new Promise((resolve, reject) => {
//     update(ref(db, path), data)
//       .then((res) => resolve(res))
//       .catch((err) => reject(err));
//   });
// };

// // ---------------- UPLOAD IMAGE (Cloudinary) ----------------

// const uploadImage = async (file: File) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "ImagesOfProperties");

//   const url = "https://api.cloudinary.com/v1_1/dwtvol0ha/image/upload";

//   try {
//     const res = await fetch(url, { method: "POST", body: formData });
//     const data = await res.json();
//     return data.secure_url;
//   } catch (err) {
//     console.error("Upload error:", err);
//     return null;
//   }
// };

// const uploadImagesToCloudinary = async (files: File[]) => {
//   const urls: string[] = [];
//   for (let file of files) {
//     const url = await uploadImage(file);
//     if (url) urls.push(url);
//   }
//   return urls;
// };

// export {
//   signInWithGoogle,
//   logout,
//   checkUserSession,
//   getData,
//   saveData,
//   deleleData,
//   updateData,
//   uploadImage,
//   uploadImagesToCloudinary
// };


import axios from "axios";
import api from "./api"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config";

const BASE_URL=''
const handleGoogleLogin = async () => {
  const result:any = await signInWithGoogle(); 
  const user = result.user;

  await saveUser({
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    provider: "google"
  });
};

const logoutUser = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return;
    await axios.post(`${BASE_URL}/api/auth/logout`, {
      uid:user.uid
    });
    await signOut(auth);
  } catch (err) {
  }
};

export const checkUserSession = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user ? user : null);
    });
  });
};

// ---------------- GET DATA ----------------
export const getData = async (path: string) => {
  try {
    const res = await api.get(`${BASE_URL}/api/data?path=${path}`);
    return res.data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// ---------------- SAVE DATA ----------------
export const saveData = async (path: string, data: any) => {
  try {
      const res = await api.post(`${BASE_URL}/api/data/`, { path, data });
      return res.data;
    } catch (err) {
    console.error(err);
    return null;
  }
};

// ---------------- UPDATE DATA ----------------
export const updateData = async (path: string, data: any) => {
  try {
    const res = await api.put(`${BASE_URL}/api/data/`, { path, data });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// ---------------- DELETE DATA ----------------
export const deleteData = async (path: string) => {
  try {
    const res = await api.delete(`${BASE_URL}/api/data/`, { data: { path } });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const uploadImages = async (files:any) => {
  try {
    const formData = new FormData();

    // append multiple files
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]); // must match upload.array('images')
    }

    const res = await axios.post(
      `${BASE_URL}/api/images/addimage`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ---------------- SAVE USER (Google Sign-In) ----------------
export const saveUser = async (user: any) => {
  try {
    const res = await api.post(`${BASE_URL}/api/auth/`, user);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
function signInWithGoogle() {
  throw new Error("Function not implemented.");
}

