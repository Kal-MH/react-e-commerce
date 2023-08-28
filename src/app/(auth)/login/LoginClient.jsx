"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LogoPath from "@/assets/colorful.svg";
import styles from "./Auth.module.scss";
import Loader from "../../../components/loader/Loader";

const LoginClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const router = useRouter();

  const redirectUser = () => {
    router.push("/");
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  const signInWithGoogle = () => {};

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
          <Image priority alt="logo" src={LogoPath} />
        </h1>
        <form className={styles.form}>
          Input
          <div className={styles.group}>자동 로그인</div>
          <div className={styles.buttonGroup}>
            Button
            <div>Button</div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginClient;
