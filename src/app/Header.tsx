import { useRouter } from "next/navigation";
import React, { MouseEventHandler } from "react";

function Header({enableLogin = true, enableSignup = true} : {enableLogin? : boolean, enableSignup? : boolean}) {
    const {push} = useRouter()

    const onHomeClick = () => {
      try {
        push('/')
      } catch (error) {
        console.error("Error with router:", error)
      }
    }

    const onLoginClick = () => {
      try {
        push('/login')
      } catch (error) {
        console.error("Error with router:", error)
      }
    }
  
    const onSignupClick = () => {
      try {
        push('/signup')
      } catch (error) {
        console.error("Error with router:", error)
      }
    }

    return (
      <div className="fixed w-screen flex justify-center p-5 bg-green-400">
        {/* <button className="left-panel-btn"></button> */}
        <button className="ml-auto absolute" onClick={onHomeClick}>
          <h1 className="font-semibold">Chat App</h1>
        </button>
        <div className="ml-auto ">
            <button className="flex-initial px-4 disabled:opacity-10" onClick={onLoginClick} disabled={!enableLogin}>Log in</button>
            <button className="flex-initial px-4 disabled:opacity-10" onClick={onSignupClick} disabled={!enableSignup}>Signup</button>
        </div>
      </div>
    );
}

export default Header;