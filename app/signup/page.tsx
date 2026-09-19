"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import AuthForm from "../forms/AuthForm";
import { setCredentials } from "../../store/features/auth/authSlice";
import { apiFetch } from "../lib/api";

const Page = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formErr, setFormErr] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFormErr("");
    try {
      const res = await apiFetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, userName: username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      dispatch(setCredentials({ user: data.user }));
      router.refresh();
      router.push("/dashboard");
    } catch (error: any) {
      setFormErr(error.message || "An error occurred during signup. Please try again.");
      setTimeout(() => setFormErr(""), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      inputs={[
        { label: "Email", placeholder: "Enter email", type: "email", value: email, setter: setEmail },
        { label: "Username", placeholder: "Enter Username", type: "text", value: username, setter: setUserName },
        { label: "Password", placeholder: "Enter password", type: "password", value: password, setter: setPassword },
      ]}
      submitFunction={handleSubmit}
      isLoading={isLoading}
      error={formErr}
      title={"sign up and get started"}
      buttonText="sign up"
      footerLink="/login"
      footerLinkText="login"
    />
  );
};

export default Page;