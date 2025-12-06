import {app} from '@/FBConfig/config'
import { rejects } from 'assert';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set,get, remove, update, } from "firebase/database";
import { resolve } from 'path';
export const auth = getAuth(app);
const db=getDatabase(app)

// const signUpUser=({email,name,password}:any)=>{
//     return new Promise((resolve,reject)=>{
//         createUserWithEmailAndPassword(auth, email, password)
//         .then((res) => {
//         const user = res.user;
//         set(ref(db, 'users/' + user.uid), {
//           uid: user.uid,
//           name: name,
//           email: email,
//           createdAt: new Date().toISOString()
//         })
//         .then(() => {
//           resolve(res); // resolve after saving data
//         })
//         .catch((err) => {
//           reject(err);
//         });
//       })
//         .catch((err)=>{
//             reject(err)
//         })
//     })
// }

// const loginUser = ({ email, password }: any) => {
//   return new Promise((resolve, reject) => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((user) => resolve(user))
//       .catch((err) => reject(err));
//   });
// };


const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        
        // Save user data to database if it's their first time
        set(ref(db, 'users/' + user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          provider: 'google',
          createdAt: new Date().toISOString()
        })
        .then(() => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};



let logout=()=>{
    signOut(auth).then(() => {
    }).catch((error) => {
    });
}

const getData = (path: string) => {
  return new Promise((resolve, reject) => {
    const dbRef = ref(db, path);
    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          resolve(snapshot.val());
        } else {
          resolve(null); // no data
        }
      })
      .catch((err) => reject(err));
  });
}

const saveData=(path:string,data:any)=>{
  return new Promise((resolve,reject)=>{
    let dataRef=ref(db,path)
    set(dataRef,data)
    .then((res)=>{
      resolve(res)
    })
    .catch((err)=>{
      reject(err)
    })
  })
}

const deleleData = (path: string) => {
    return new Promise((resolve,reject)=>{
      remove(ref(db,path))
      .then((res)=>{
        resolve(res);
      })
      .catch((err)=>{
        reject(err)
      })
    })
};

const updateData = (path: string, data: any) => {
  return new Promise((resolve, reject) => {
    let dataRef = ref(db, path)
    update(dataRef, data)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}



export {signInWithGoogle,logout,getData,saveData,deleleData,updateData}