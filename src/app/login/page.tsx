'use client'
import { useState, useEffect, ChangeEvent } from "react";
import { pb } from "../pocketbase";
import ChatBox from "./ChatBox";
import Header from "./Header";
import ChatDisplay from "./ChatDisplay";

export default function LoginPage() {
    const [error, setError] = useState(false)

    const onLogin = (event : ChangeEvent<HTMLInputElement>) => {
        let userIn = event.target.querySelector('#username')
        let passIn = event.target.querySelector('#password')
        pb.collection('users').authWithPassword(userIn !== null ? userIn : "sampleman", passIn !== null ? passIn : "");
        if (!pb.authStore.isValid) {
            setError(true)
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