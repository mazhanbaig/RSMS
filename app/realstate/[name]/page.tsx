'use client'

import Header from "@/components/Header"
import Hero from "@/components/Hero"
import { auth } from "@/FBConfig/fbFunctions";
import { onAuthStateChanged } from "firebase/auth";
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react";

export default function RealStatePortal() {
    let { name } = useParams();
    let route=useRouter();
    
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                route.push('/login')
            }
        })
    },[])

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50">
            <Header name={name} />
            <Hero name={name} />
        </div>
    )
}