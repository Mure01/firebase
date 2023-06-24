import React, { useEffect, useState } from 'react'
import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import Chat from './chat'

const Login = () => {

    const [value, setValue] = useState();
    const [user, setUser] = useState();
    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.email)
            setUser(data.user)
            
            console.log(user)
            localStorage.setItem('user.email', data.user.email)
        })

    };

    useEffect(() => {
        setValue(localStorage.getItem('user.email'));
    })

  return (
    <div
    className='p-5  flex flex-col text-[#fff] text-center text-2xl rounded-xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 '
    >
        <h1
        className='p-5 text-[#000] text-2xl rounded-xl'

        >Bolnica Jagomir</h1>
        {
        value? <Chat props={user}/> : 
        <button onClick={handleClick}
        className='p-5  bg-green-700 text-[#fff] text-2xl rounded-xl'
        >Sign in with Google</button>
        }

    </div>
  )
}

export default Login
