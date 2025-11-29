'use client'

import { auth, getData } from "@/FBConfig/fbFunctions";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const data = await getData(`users/${user.uid}`);
                    setUserInfo(data);
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
