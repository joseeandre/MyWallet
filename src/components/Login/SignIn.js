import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import Loading from "../Loading/Loading";
import axios from 'axios';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const token = localStorage.getItem("token");

  if (token) {
    history.push("/home");
  }

  function submit(event) {
    event.preventDefault();

    if (email === "") {
      alert("Digite um email válido");
      return;
    }

    if (password === "") {
      alert("Digite uma senha valida");
      return;
    }

    setIsLoading(true);

    const request = axios.post("https://mywallet-back.herokuapp.com/sign-in", {
      email,
      password
    });

    request
      .then((response) => {
        setIsLoading(false);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user);
        history.push("/home");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        alert("Erro ao fazer login");
      });
  }

  return (
    <Content>
      <form onSubmit={submit}>
        <img class="logo" src="./logos/MyWallet.svg" alt="logo"/>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <input
          type="password"
          placeholder="senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <button>{isLoading ? <Loading></Loading> : "Entrar"}</button>
        <Link to="/sign-up">
          <h3>Primeira vez? Cadastre-se!</h3>
        </Link>
      </form>
    </Content>
  );
}

const Content = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #8c11be;
  color: white;
  form {
    margin: 50px auto;
    display: flex;
    flex-flow: wrap column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  input {
    width: 90%;
    height: 50px;
    margin-bottom: 13px;
    border-radius: 6px;
    padding-left: 17px;
    font-size: 18px;
    border: none;
  }
  input::placeholder {
    color: #9f9f9f;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 50px;
    background: #a328d6;
    border: none;
    border-radius: 6px;
    color: white;
    font-size: 18px;
  }
  h3 {
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 18px;
    color: #ffffff;
    margin-top: 36px;
  }
  .logo {
    width: 147px;
    margin-bottom: 11px;
  }
  a {
    text-decoration: none;
  }
`;
