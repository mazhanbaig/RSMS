'use client'

import { auth } from "@/FBConfig/fbFunctions";
import { onAuthStateChanged } from "firebase/auth";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";

export default function Page() {
  const router = useRouter();
  const userInfo = useContext(UserContext);

  const [authUser, setAuthUser] = useState(null);

  // 1️⃣ Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setAuthUser(user); // store authenticated user
      }
    });

    return () => unsubscribe();
  }, []);

  // 2️⃣ When userInfo loads, redirect
  useEffect(() => {
    if (authUser && userInfo) {
      router.push(`/realstate/${userInfo.name}`);
    }
  }, [authUser, userInfo]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50">
      loading...
    </div>
  );
}
