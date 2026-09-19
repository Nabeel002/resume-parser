"use client";
import React, { useState } from "react";
import AuthForm from "../forms/AuthForm";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/features/auth/authSlice";
import { apiFetch } from "../lib/api";
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

      setLoading(true);
      let response = await apiFetch(`/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      dispatch(setCredentials({ user: data.user}));
      setLoading(false);
      router.refresh();  
      router.push("/dashboard");

 
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
