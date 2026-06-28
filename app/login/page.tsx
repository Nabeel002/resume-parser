"use client";
import React, { useState } from "react";
import AuthForm from "../forms/AuthForm";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/features/auth/authSlice";
const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [formErr, setFormErr] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();


  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      const payload = {
        email: email,
        password: password,
      };
      const apiEndPoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

      setLoading(true);
      let response = await fetch(`${apiEndPoint}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      dispatch(setCredentials({ user: data.user, token: data.token }));
      setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (response.status === 200) {
        dispatch(setCredentials({ user: data.user, token: data.token }));
        router.refresh();  
        setEmail("");
        setPassword("");
        setFormErr("");
        router.push("/dashboard");
      }
    } catch (error: any) {
      setFormErr(error.message);
      setLoading(false)
      console.warn(error.message);
    }
  };

  return (
    <>
      <AuthForm
        inputs={[
          {
            label: "Email",
            placeholder: "Enter email",
            type: "email",
            value: "",
            setter: setEmail,
          },
          {
            label: "Password",
            placeholder: "Enter Password",
            type: "password",
            value: "",
            setter: setPassword,
          },
        ]}
        submitFunction={handleLogin}
        isLoading={isLoading}
        error={formErr}
      />
    </>
  );
};

export default page;
