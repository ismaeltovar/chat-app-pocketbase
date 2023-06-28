import { useRouter } from "next/navigation";
import React, { MouseEventHandler } from "react";

function Header({login, signup} : 
  {login : boolean | undefined, signup: boolean | undefined}) {
    const {push} = useRouter()

    const onLoginClick = () => {
      try {
        push('/login')
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
  
    const onSignupClick = () => {
      try {
        push('/signup')
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    return (
      <div className="fixed w-screen flex justify-center p-4 bg-green-400">
        {/* <button className="left-panel-btn"></button> */}
        <button className="ml-auto">
          <h1 className="font-semibold">Chat App</h1>
        </button>
        <div className="ml-auto">
            <button className="flex-initial px-4 disabled:opacity-40" onClick={onLoginClick} disabled={login == false ? true : false}>Log in</button>
            <button className="flex-initial px-4 disabled:opacity-40" onClick={onSignupClick} disabled={login == false ? true : false}>Signup</button>
        </div>
      </div>
    );
}

export default Header;