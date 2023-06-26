'use client'
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { pb } from "../pocketbase";

export default function SignupPage() {
    const {push} = useRouter()
    const [error, setError] = useState(false)

    const onLogin = (event : ChangeEvent<HTMLInputElement>) => {
        let userIn = event.target.querySelector('#username')
        let passIn = event.target.querySelector('#password')
        let emailIn = event.target.querySelector('#email')
        pb.collection('users').authWithPassword(userIn !== null ? userIn : "sampleman", passIn !== null ? passIn : "");
        if (pb.authStore.isValid) {
            pb.collection('users').create({
                name: `${userIn}`,
                email: `${emailIn}`,
                password: `${passIn}`
            })
        } else {
            setError(true)
        }
        push('/')

    }

    return (
        <>
            <div>{error ? "Invalid username, password or email." : ""}</div>
            <form onSubmit={onLogin}>
                <label>Username: 
                    <input id='username' type="text" required/>
                </label>
                <label>Password: 
                    <input id='password' type="password" required/>
                </label>
                <label>Email: 
                    <input id='email' type="email" required/>
                </label>
                <button type="submit">Signup</button>
            </form>

        </>
    );
}