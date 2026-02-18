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
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { app } from "./config";
export const auth = getAuth(app);

export const loginWithGoogle = async () => {
  try {
    // 1. Sign in with Google
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // 3. Send user data to your backend API
     await api.post("/api/auth", {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      picture: user.photoURL,
    });
    
    return {
      user: {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      picture: user.photoURL,
      }
    };
    
  } catch (error) {
    throw error;
  }
};

// ---------------- LOGOUT ----------------
export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('userInfo');
  } catch (error) {
    throw error;
  }
};

// ---------------- CHECK SESSION ----------------
export const checkUserSession = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        const userInfo = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        };
        resolve(userInfo);
      } else {
        // User is logged out
        resolve(null);
      }
    });
  });
};

// ---------------- GET DATA ----------------
export const getData = async (path: string) => {
  try {
    const res = await api.get(`/api/data?path=${path}`);
    return res.data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// ---------------- SAVE DATA ----------------
export const saveData = async (path: string, data: any) => {
  try {
    const res = await api.post(`/api/data/`, { path, data });
    console.log(res);
    return res.data.data;
    
  } catch (err) {
    console.error(err);
    return null;
  }
};

// ---------------- UPDATE DATA ----------------
export const updateData = async (path: string, data: any) => {
  try {
     await api.put(`/api/data/`, { path, data });
  } catch (err) {
    console.error(err);
    return null;
  }
};

// ---------------- DELETE DATA ----------------
export const deleleData = async (path: string) => {
  try {
     await api.delete(`/api/data/`, { data: { path } });
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const uploadImages = async (files:any) => {
  try {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    const res = await api.post(`/api/images/addimages`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteImageFromCloudinary = async (public_id: string) => {
  try {
    const res = await api.delete(`/api/images/deleteimage/${public_id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to delete image from Cloudinary:", err);
    return null;
  }
};