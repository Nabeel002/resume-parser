"use client";
import Button from "../components/common/Button";
import Input from "../components/Input";
import { useState } from "react";
import Link from 'next/link';
import AuthForm from "../forms/AuthForm";
const Page = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formErr, setFormErr] = useState("");
  const apiEndPoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const payload = {
      email: email,
      userName: username,
      password: password,
    };
    try {
      setIsLoading(true);
      let response = await fetch(`${apiEndPoint}/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      if (response.status === 201) {
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      console.error("Error signing up:", error);
      setFormErr(error.message || "An error occurred during signup. Please try again.");
      setTimeout(() => {
        setFormErr("");
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };
  return (
 <AuthForm
  inputs={[
    {
      label: "Email",
      placeholder: "Enter email",
      type: "email",
      value: 'email',
      setter: setEmail,
    },
     {
      label: "Usernale",
      placeholder: "Enter Username",
      type: "text",
      value: 'username',
      setter: setUserName,
    },
    {
      label: "Password",
      placeholder: "Enter password",
      type: "password",
      value: password,
      setter: setPassword,
    },
  ]}
  submitFunction={handleSubmit}
  isLoading={isLoading}
  error={formErr}
  title={'sign up and get started'}
  buttonText="sign up"
  footerLink="/login"
  footerLinkText="login"
/>
  );
};

export default Page;
