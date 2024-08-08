import React from 'react'
import { useState } from 'react'
import { auth, googleProvider } from '../config/firebase.js'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

export const UserAuth = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    console.log(auth?.currentUser?.email)
    console.log(auth?.currentUser?.photoURL)
    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
            setInputs({ email: '', password: '' })
        } catch (error) {
            console.error(error)
        }
    }
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error(error)
        }
    }
    const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div className='flex flex-col w-80'>
                <input className='border-2 m-2 border-black p-1' type="text" onChange={handleChange} name='email' placeholder='Email...' />
                <input className='border-2 m-2 border-black p-1' type="text" onChange={handleChange} name='password' placeholder='Password...' />
                <button className='bg-red-500 m-2 p-2 rounded-lg text-white' onClick={signIn}>Sign In</button>
            </div>
            <div className='w-80'>
                <button onClick={signInWithGoogle} className='bg-sky-500 text-lg m-2 p-3 rounded-lg text-white'>Sign In With Google</button>
            </div>
            <div className="w-80">
                <button onClick={logout} className='bg-black text-lg m-2 p-3 rounded-lg text-white'>Logout</button>
            </div>
        </>
    )
}

