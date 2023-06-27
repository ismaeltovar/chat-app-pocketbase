'use client'
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { pb, samplemanPass } from "../page";
import { useRouter } from "next/navigation";
import ChatBox from "./ChatBox";
import Header from "./Header";
import ChatDisplay from "./ChatDisplay";

export default function LoginPage() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const {push} = useRouter()

    const onLogin = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const authData = await pb.collection('users').authWithPassword(user !== '' ? user : 'sampleman', password !== '' ? password : samplemanPass);
            push('/')
        } catch (error) {
            setError(true)
            // console.error("Error in LoginPage", error)
        }
    }

    const onUserIn = (event : ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value)
    }
    
    const onPasswordIn = (event : ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    return (
        <>
            <div>{error ? "Invalid username or password." : ""}</div>
            <form onSubmit={onLogin}>
                <label>Username: 
                    <input id='username' type="text" onChange={onUserIn} value={user} required/>
                </label>
                <label>Password: 
                    <input id='password' type="password" onChange={onPasswordIn} value={password} required/>
                </label>
                <button type="submit">Login</button>
            </form>
        </>
    );
}