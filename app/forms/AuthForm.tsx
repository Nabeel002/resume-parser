import React from "react";
import Input from "../components/Input";
import Button from "../components/common/Button";
import Link from "next/link";

interface InputField {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
}

interface AuthFormProps {
  inputs: InputField[];
  submitFunction: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  isLoading: boolean;
  error: string;
  title?: string;
  buttonText?: string;
  footerText?: string;
  footerLinkText?: string;
  footerLink?: string;
}

const AuthForm = ({
  inputs,
  submitFunction,
  isLoading,
  error,
  title = "Sign in to your account",
  buttonText = "Sign In",
  footerText = "Don't have an account?",
  footerLinkText = "Register",
  footerLink = "/register",
}: AuthFormProps) => {
  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-black px-6 lg:px-8">
      <div className="w-full max-w-sm bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-zinc-800">
        <h2 className="text-center text-2xl font-bold text-white mb-8">
          {title}
        </h2>

        <form className="space-y-6">
          {inputs.map((input, key) => (
            <div key={key}>
              <Input
                label={input.label}
                placeholder={input.placeholder}
                type={input.type}
                value={input.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  input.setter(e.target.value)
                }
              />
            </div>
          ))}

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <Button
            handleSubmit={submitFunction}
            isLoading={isLoading}
            loaderTxt="Loading..."
            text={buttonText}
          />
        </form>

        <p className="text-white text-[13px] mt-[16px]">
          {footerText}{" "}
          <Link
            href={footerLink}
            className="underline text-[13px]"
          >
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;