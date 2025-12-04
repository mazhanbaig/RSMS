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
    <div className="animate-pulse p-6 min-h-screen flex justify-center items-center text-center">
      Loading…
    </div>
  );
}
