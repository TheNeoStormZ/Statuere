"use client";

import { createTheme } from "@mui/material/styles";

import LoginComponent from "../../components/Auth/Login";
import { authClient } from "../../lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const theme = createTheme();

export default function SignIn() {

  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);


  const handleSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const loginData = new FormData(event.currentTarget);
    const email = loginData.get("email")?.toString() as string;
    const password = loginData.get("password")?.toString() as string;

    await authClient.signIn.email(
      { email, password },
      {
        onSuccess: (ctx) => {
          router.push('/');
        },
        onError: (ctx) => {
          setShowAlert(true);
        },
      }
    );
  };

  async function getData() {

    const { data: session, error } = await authClient.getSession();
    if (session && session.user) {
      router.push('/');
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return <LoginComponent handleSubmit={handleSubmit} theme={theme} showAlert={showAlert} />;
}
