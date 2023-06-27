'use client'
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { pb, samplemanId, samplemanPass } from "../page";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const {push} = useRouter()
    const [error, setError] = useState(false)

    const onSignup = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userIn = user !== '' ? user : 'sampleman'
        const passIn = password !== '' ? password : samplemanPass
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
            <div>{error ? "Invalid username, password or email." : ""}</div>
            <form className="text-center" onSubmit={onSignup}>
                <label>Email: 
                    <input id='email' type="email" onChange={onEmailIn}/>
                </label>
                <label>Username:
                    <input id='username' type="text" onChange={onUserIn} required/>
                </label>
                <label>Password: 
                    <input id='password' type="password" onChange={onPasswordIn} required/>
                </label>
                <button type="submit">Signup</button>
            </form>

        </>
    );
}