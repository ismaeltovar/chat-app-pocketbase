'use client'
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { pb, samplemanId, samplemanPass } from "../page";
import { useRouter } from "next/navigation";
import Header from "../Header";
import Form from "../Form";

export default function SignupPage() {
    return (
      <Form signup={true}/>
    )
}