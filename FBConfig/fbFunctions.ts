import api from "./api"

interface PaymentData {
  pp_Version: string;
  pp_TxnType: string;
  pp_Language: string;
  pp_MerchantID: string;
  pp_Password: string;
  pp_TxnRefNo: string;
  pp_Amount: string;
  pp_TxnCurrency: string;
  pp_TxnDateTime: string;
  pp_BillReference: string;
  pp_Description: string;
  pp_ReturnURL: string;
  pp_SecureHash: string;
}

import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { app } from "./config";
export const auth = getAuth(app);

const FIREBASE_DB_URL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

// export const loginWithGoogle = async () => {
//   try {
//     // 1. Sign in with Google
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;
    
//     // 3. Send user data to your backend API
//      await api.post("/api/auth", {
//       uid: user.uid,
//       name: user.displayName,
//       email: user.email,
//       picture: user.photoURL,
//      });
    
//     return {
//       user: {
//       uid: user.uid,
//       name: user.displayName,
//       email: user.email,
//       picture: user.photoURL,
//       }
//     };
    
//   } catch (error) {
//     throw error;
//   }
// };

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Send to your backend
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




// Get public data - NO LOGIN REQUIRED
export const getPublicData = async (path: string) => {
  try {
    const response = await fetch(`${FIREBASE_DB_URL}/${path}.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching public data:", error);
    return null;
  }
};

// Update public data - NO LOGIN REQUIRED
export const updatePublicData = async (path: string, data: any) => {
  try {
    const response = await fetch(`${FIREBASE_DB_URL}/${path}.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error updating public data:", error);
    return null;
  }
};

// export const getPublicData = async (path: string) => {
//   try {
//     // Direct fetch to Firebase REST API
//     const response = await api.get(`/api/data?path=${path}`);
//     return res.data.data;
//   } catch (err) {
//     console.error(err);
    
// };

// // Update public data (for view counts, etc.) - still no auth required if rules allow
// export const updatePublicData = async (path: string, data: any) => {
//   try {
//     const res = await  api.post(`/api/data/`, { path, data });
//      console.log(res);
//     return res.data.data;
    
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };



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


// ---------------- CREATE PAYMENT ----------------
export const createJazzCashPayment = async (amount: string, email: string, selectedPayment:string): Promise<PaymentData> => {
  try {
    const res = await api.post("/api/payment/create-payment", { amount, email,selectedPayment });
    
    if (res.data.success) {
      return res.data.data; // contains all JazzCash payment fields + pp_SecureHash
    } else {
      throw new Error(res.data.message || "Payment creation failed");
    }
  } catch (err) {
    console.error("Failed to create JazzCash payment:", err);
    throw err;
  }
};




// // fbFunctions.ts
// import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
// import api from "./api"
// import axios from "axios";
// import { auth } from "./config";

// // Keep your existing imports and functions...

// // NEW: Direct Firebase REST API access (bypasses your backend)
// const FIREBASE_DB_URL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

// // Public data access - NO AUTH REQUIRED
// export const getPublicData = async (path: string) => {
//   try {
//     // Direct fetch to Firebase REST API
//     const response = await fetch(`${FIREBASE_DB_URL}/${path}.json`);
    
//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}`);
//     }
    
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching public data:", error);
//     return null;
//   }
// };

// // Update public data (for view counts, etc.) - still no auth required if rules allow
// export const updatePublicData = async (path: string, data: any) => {
//   try {
//     const response = await fetch(`${FIREBASE_DB_URL}/${path}.json`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data)
//     });
    
//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}`);
//     }
    
//     return await response.json();
//   } catch (error) {
//     console.error("Error updating public data:", error);
//     return null;
//   }
// };


// export const loginWithGoogle = async () => {
//   try {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;
    
//     // Send to your backend
//     await api.post("/api/auth", {
//       uid: user.uid,
//       name: user.displayName,
//       email: user.email,
//       picture: user.photoURL,
//     });
    
//     return {
//       user: {
//         uid: user.uid,
//         name: user.displayName,
//         email: user.email,
//         picture: user.photoURL,
//       }
//     };
//   } catch (error) {
//     throw error;
//   }
// };


// // ---------------- LOGOUT ----------------
// export const logout = async () => {
//   try {
//     await signOut(auth);
//     localStorage.removeItem('userInfo');
//   } catch (error) {
//     throw error;
//   }
// };


// export const checkUserSession = () => {
//   return new Promise((resolve) => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is logged in
//         const userInfo = {
//           uid: user.uid,
//           name: user.displayName,
//           email: user.email,
//           photoURL: user.photoURL
//         };
//         resolve(userInfo);
//       } else {
//         // User is logged out
//         resolve(null);
//       }
//     });
//   });
// };

// // Your existing authenticated functions (require login)
// export const getData = async (path: string) => {
//   try {
//     const res = await api.get(`/api/data?path=${path}`);
//     return res.data.data;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };

// export const saveData = async (path: string, data: any) => {
//   try {
//     const res = await api.post(`/api/data/`, { path, data });
//     console.log(res);
//     return res.data.data;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };

// export const updateData = async (path: string, data: any) => {
//   try {
//     await api.put(`/api/data/`, { path, data });
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };

// export const deleleData = async (path: string) => {
//   try {
//     await api.delete(`/api/data/`, { data: { path } });
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };

// // Rest of your functions (uploadImages, deleteImageFromCloudinary, createJazzCashPayment) remain the same
// export const uploadImages = async (files: any) => {
//   try {
//     const formData = new FormData();
//     for (let i = 0; i < files.length; i++) {
//       formData.append("images", files[i]);
//     }
//     const res = await api.post(`/api/images/addimages`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const deleteImageFromCloudinary = async (public_id: string) => {
//   try {
//     const res = await api.delete(`/api/images/deleteimage/${public_id}`);
//     return res.data;
//   } catch (err) {
//     console.error("Failed to delete image from Cloudinary:", err);
//     return null;
//   }
// };

// export const createJazzCashPayment = async (amount: string, email: string, selectedPayment: string): Promise<any> => {
//   try {
//     const res = await api.post("/api/payment/create-payment", { amount, email, selectedPayment });
//     if (res.data.success) {
//       return res.data.data;
//     } else {
//       throw new Error(res.data.message || "Payment creation failed");
//     }
//   } catch (err) {
//     console.error("Failed to create JazzCash payment:", err);
//     throw err;
//   }
// };