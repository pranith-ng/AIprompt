import { setDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '@/app/firebase/firebase'
import React, { useContext } from 'react'
import { GlobalContext } from '@/Contexts/Context'



export async function firestoredatastorage() {
    try {
        const dataref = doc(db, "aiprompt", "userdata")

        await setDoc(dataref, {

            data:[{ userid : "authuser.uid",
                userName : "authuser.displayName",
                userEmail : "authuser.email",
                question : "question",}]
               
        })
    }
    catch(err) {
        console.error(err)
    }

}


export async function createfirestorepath(authuser, question) {

    try {
        const dataRef = doc(db, "aiprompt", "userdata");
        const olddata = await getDoc(dataRef)
        const olddataobject = olddata.data()?.data || []
        const newdata = 
            [...olddataobject , {
                userid : authuser.uid,
                userEmail : authuser.email || "email",
                question : question,
            }  
            ]
        
        await setDoc(dataRef,
            {
                data : newdata
            }
        )
    }
    catch (err) {
        console.error(err)
    }
}

