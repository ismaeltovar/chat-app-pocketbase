import { useRouter } from "next/navigation";
import React, { MouseEventHandler } from "react";
import { pb } from "./page";

function Header({currentUser = 'guest', enableLogin = true, enableSignup = true} : {currentUser? : string | null, enableLogin? : boolean, enableSignup? : boolean}) {
    const router = useRouter()

    const onHomeClick = () => {
      try {
        router.push('/')
      } catch (error) {
        console.error("Error with router:", error)
      }
    }

    const onLoginClick = () => {
      try {
        router.push('/login')
      } catch (error) {
        console.error("Error with router:", error)
      }
    }
  
    const onSignupClick = () => {
      try {
        router.push('/signup')
      } catch (error) {
        console.error("Error with router:", error)
      }
    }

    const onLogoutClick = () => {
      pb.authStore.clear()
      window.location.reload()
    }

    return (
      <div className="fixed w-screen flex justify-center items-center py-8 bg-green-400">
        {/* <button className="left-panel-btn"></button> */}
        <button className="ml-auto absolute" onClick={onHomeClick}>
          <h1 className="font-semibold">Chat App</h1>
        </button>
        <div className="ml-auto ">
          {currentUser === 'guest' ?
            <div className="mr-4">
              <button className="flex-initial px-4 disabled:opacity-10" onClick={onLoginClick} disabled={!enableLogin}>Log in</button>
              <button className="flex-initial px-4 disabled:opacity-10" onClick={onSignupClick} disabled={!enableSignup}>Signup</button>
            </div>
            : <div className="flex flex-col items-end mr-8">
                <div className="">{`Welcome, ${currentUser}!`}</div>
                <button className="" onClick={onLogoutClick}>Log out</button>
              </div>
          }
        </div>
      </div>
    );
}

export default Header;