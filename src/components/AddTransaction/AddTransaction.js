import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import React, { useState } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";

export default function Homepage() {
  const { id } = useParams();
  const history = useHistory();
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (!token) {
    alert("Faca login!");
    history.push("/");
  }

  function submit(event) {
    event.preventDefault();

    if (value === "" || isNaN(parseFloat(value))) {
      alert("Digite um valor válido");
      return;
    }

    if (description === "") {
      alert("Digite uma descricao valida");
      return;
    }

    setIsLoading(true);

    const type = (id === "1" ? "in" : "out");
    const body = { type, value, description };

    const request = axios.post(
      "https://mywallet-back.herokuapp.com/transactions",
      body,
      config
    );

    request
      .then(() => {
        setIsLoading(false);
        alert("Transacao adicionada!");
        history.push("/home");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  return (
    <Content>
      <h1>{`Nova ${id === "1" ? "Entrada" : "Saida"}`}</h1>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Valor"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        ></input>
        <input
          type="text"
          placeholder="Descricao"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></input>
        <button>{isLoading ? <Loading></Loading> : "Salvar"}</button>
      </form>
    </Content>
  );
}

const Content = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background: #8c11be;
  color: white;
  padding: 5%;
  h1 {
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
  }
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
`;
