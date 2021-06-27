import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function submit(event) {
    event.preventDefault();

    if (email === "") {
      alert("Digite um email válido");
      return;
    }
    if (name === "") {
      alert("Digite um nome válido");
      return;
    }

    if (password === "") {
      alert("Digite uma senha válido");
      return;
    }

    if (passwordConfirm === "" || passwordConfirm !== password) {
      alert("Senhas diferentes");
      return;
    }

    setIsLoading(true);

    const request = axios.post('https://mywallet-back.herokuapp.com/sign-up', {name, email, password});

    request.then(() => {
        setIsLoading(false);
        alert("Usuario cadastrado!");
        history.push("/");
    }).catch((error) => {
        console.log(error);
        setIsLoading(false);
        alert("Erro ao cadastrar usuario");
    });


  }

  return (
    <Content>
      <form onSubmit={submit}>
        <img class="logo" src="./logos/MyWallet.svg" />
        <input
          type="text"
          placeholder="nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        ></input>
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
        <input
          type="password"
          placeholder="confirme a senha"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
        ></input>
        <button>{isLoading ? <Loading></Loading> : "Cadastrar"}</button>
        <Link to="/">
          <h3>Ja tem uma conta? Entre agora!</h3>
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
