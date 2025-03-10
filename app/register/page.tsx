"use client";

import Alert from "@mui/material/Alert";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";

import RegisterComponent from "../../components/Auth/Register";
import { authClient } from "../../lib/auth-client";

import { useRouter } from "next/navigation";

const theme = createTheme();
let message = "ERROR — check it out!";

const AlertCustom = ({ showAlert }: any) => {
  if (!showAlert) {
    return null;
  }

  return (
    <Alert variant="outlined" severity="error" sx={{ m: 2 }}>
      {message}
    </Alert>
  );
};

export default function Register() {
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let email = data.get("email")?.toString() as string;
    let password = data.get("password")?.toString() as string;
    let conf_password = data.get("conf_password")?.toString() as string;
    let name = data.get("username")?.toString() as string;

    if (password != conf_password) {
      message = "Password doesn't match";
      setShowAlert(true);
    } else {
      try {
        const { data, error } = await authClient.signUp.email(
          {
            email,
            password,
            name,
          },
          {
            onSuccess: (ctx) => {
              router.push("/");
            },
            onError: (ctx) => {
              message = ctx.error.message;
              setShowAlert(true);
            },
          }
        );
      } catch (err: any) {
        message = err.response.data;
        setShowAlert(true);
      }
    }
  };
  const [showAlert, setShowAlert] = useState(false);

  return (
    <RegisterComponent
      handleSubmit={handleSubmit}
      theme={theme}
      showAlert={showAlert}
      AlertCustom={AlertCustom}
    />
  );
}
