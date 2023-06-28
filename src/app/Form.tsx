'use client'
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { guestPass, pb } from "./tools";
import { useRouter } from "next/navigation";
import Header from "./Header";

export default function Form({login = false, signup = false} : {login? : boolean, signup? : boolean}) {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const {push} = useRouter()

    const onLogin = async (event : FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      try {
        const authData = await pb.collection('users').authWithPassword(user !== '' ? user : 'guest', password !== '' ? password : guestPass);
        push('/')
      } catch (error) {
        setError(true)
        // console.error("Error in LoginPage", error)
      }
    }

    const onSignup = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userIn = user !== '' ? user : 'guest'
        const passIn = password !== '' ? password : guestPass
        const emailIn = email

        try {
            const authData = await pb.collection('users').authWithPassword(userIn, passIn);
        } catch (err) {
            try {
                const response = await pb.collection('users').create({
                    username: `${userIn}`,
                    email: `${emailIn}`,
                    emailVisibility: 'false',
                    password: `${passIn}`,
                    passwordConfirm: `${[passIn]}`
                })
                push('/')
            } catch (err) {
                console.error("Error creating user", JSON.stringify(err))
                setError(true)
            }
        }
    }

    const onUserIn = (event : ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value)
    }
    
    const onPasswordIn = (event : ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    
    const onEmailIn = (event : ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    return (
      <>
        {login ?
          <Header enableLogin={!login}/>
          : <Header enableSignup={!signup}/>
        }
        {error &&
          <div className={`absolute py-4 px-6 bg-red-400 rounded-xl`}>
            {login ? "! Invalid username or password !" : "! Error creating user !"}
          </div>
        }
        <form className="py-24 px-10 mx-auto w-96 flex flex-col" onSubmit={login ? onLogin : onSignup}>
            {signup &&
                <>
                    <label className="py-3">Email:</label>
                    <input id='email' className="p-2" type="email" onChange={onEmailIn}/>
                </>
            }
            <label className="py-3">Username:</label>
                <input id='username' className="p-2" type="text"  onChange={onUserIn} required/>
            <label className="py-3">Password:</label>
                <input id='password' className="p-2" type="password" onChange={onPasswordIn} required/>
            <button className="py-2 my-6 rounded-xl bg-green-400" type="submit">{login ? "Login" : "Signup"}</button>
        </form>
      </>
    );
}