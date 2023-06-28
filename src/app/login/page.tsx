'use client'
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { pb, samplemanPass } from "../page";
import { useRouter } from "next/navigation";
import Header from "../Header";
import Form from "../Form";

export default function LoginPage() {
    return (
      <Form login={true}/>
    );
}