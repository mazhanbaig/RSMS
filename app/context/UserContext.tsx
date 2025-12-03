// 'use client'

// import { auth, getData } from "@/FBConfig/fbFunctions";
// import { onAuthStateChanged } from "firebase/auth";
// import { createContext, useEffect, useState } from "react";
// import { ReactNode } from "react";


// interface User{
//     email:string,
//     name:string,
//     uid:string
//     createdAt:string
// }

// export const UserContext = createContext<User|null>(null);

// export function UserProvider({ children }: { children: ReactNode }) {
//     const [userInfo, setUserInfo] = useState<User|null>(null);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, async (user) => {
//             if (user) {
//                 try {
//                     const data = await getData(`users/${user.uid}`);
//                     setUserInfo(data);
//                 } catch (error) {
//                     console.log("Error fetching user:", error);
//                 }
//             } else {
//                 setUserInfo(null);
//             }
//         });

//         return () => unsubscribe();
//     }, []);

//     return (
//         <UserContext.Provider value={userInfo}>
//             {children}
//         </UserContext.Provider>
//     );
// }
'use client'

import { auth, getData } from "@/FBConfig/fbFunctions";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState, ReactNode } from "react";

export interface User {
    email: string;
    name: string;
    uid: string;
    createdAt: string;
}

export const UserContext = createContext<User | null>(null);

interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [userInfo, setUserInfo] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const data = await getData(`users/${user.uid}`);
                    setUserInfo(data as User); // cast to User
                } catch (error) {
                    console.log("Error fetching user:", error);
                }
            } else {
                setUserInfo(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={userInfo}>
            {children}
        </UserContext.Provider>
    );
}
