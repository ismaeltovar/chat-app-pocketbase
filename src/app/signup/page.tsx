'use client'
import { useRouter } from "next/navigation";
import Form from "../Form";
import { useEffect, useState } from "react";

export default function SignupPage() {
  const {push} = useRouter()
  const [showPage, setShowPage] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('loggedin') == 'true')
      push('/')
    else
      setShowPage(true)
  }, [push])

  return showPage ? <Form signup={true}/> : <></>
}