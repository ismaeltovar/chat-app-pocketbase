'use client'
import { useState, useEffect, ChangeEvent } from "react";
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

    const onLogin = async (event : ChangeEvent<HTMLInputElement>) => {
        try {
            const authData = await pb.collection('users').authWithPassword(user !== '' ? user : 'sampleman', password !== '' ? password : samplemanPass);
            if (!pb.authStore.isValid) {
                setError(true)
            } else {
                push('/')
            }
        } catch (error) {
            console.error("Error in LoginPage", error)
        }

    }

    return (
        <>
            <div>{error ? "Invalid username or password." : ""}</div>
            <form onSubmit={onLogin}>
                <label>Username: 
                    <input id='username' type="text" required/>
                </label>
                <label>Password: 
                    <input id='password' type="password" required/>
                </label>
                <button type="submit">Login</button>
            </form>

        </>
    );
}