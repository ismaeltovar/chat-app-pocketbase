'use client'
import { useRouter } from "next/navigation";
import Form from "../Form";
import { useEffect } from "react";

export default function LoginPage() {
  const {push} = useRouter()

  useEffect(() => {
    if (localStorage.getItem('loggedin') == 'true')
      push('/')
  }, [push])

  if (localStorage.getItem('loggedin') == 'false')
    return (<Form login={true}/>)
  else
    return (<></>)
}