'use client'

import { auth, getData } from "@/FBConfig/fbFunctions";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface UserInfo{
  email:string,
  uid:string
}

export default function Page() {

  const router = useRouter();
  const [authUser, setAuthUser] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Check Firebase authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        setLoading(false);
      } else {
        let userInfo:any=localStorage.getItem('userInfo');
        userInfo=JSON.parse(userInfo)

        getData(`users/${userInfo.uid}`)
        .then((res:any)=>{

          
          router.replace(`/realstate/${res.name}`)
        })
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );
}
