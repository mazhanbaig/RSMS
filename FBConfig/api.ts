// import axios from "axios";
// import { auth } from "./config";
// import { getIdToken } from "firebase/auth";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
// });

// api.interceptors.request.use(async (config) => {
//   const user = auth.currentUser;

//   if (user) {
//     const token = await getIdToken(user, true); // force refresh if needed
//     config.headers.Authorization = `Bearer ${token}`;
//   } else {
//     console.warn("No user logged in");
//   }

//   return config;
// });

// export default api;


import axios from "axios";
import { auth } from "./config";

const api = axios.create({
  baseURL: "https://zstate-backend.vercel.app",
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;