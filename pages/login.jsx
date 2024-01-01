import React, { useEffect } from "react";
import Login from "../src/Auth/Login"
import { useRouter } from "next/router";

function login() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, []);

  return <Login />;
}

export default login;
