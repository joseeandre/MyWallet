import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import React, { useContext, useState } from "react";
import Loading from "../Loading/Loading";
import Transaction from "./Transaction";
import axios from "axios";
import { identifier } from "@babel/types";

export default function Transactions(props) {
  const { transactions } = props;
  const history = useHistory();
  const token = localStorage.getItem("token");
  let total = 0;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (!token) {
    alert("Faca login!");
    history.push("/");
  }

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "in") {
      total += parseFloat(transactions[i].value);
    } else {
      total -= parseFloat(transactions[i].value);
    }
  }

  return (
    <Content>
      {transactions.length > 0 ? (
        <>
          <div className="box-transactions">
            {transactions.map((e) => (
              <Transaction transaction={e}></Transaction>
            ))}
          </div>
          <div className="space-between">
            <div class="saldo">Saldo</div>
            <div className={total > 0 ? "value green" : "value : red"}>
              {total.toFixed(2)}
            </div>
          </div>{" "}
        </>
      ) : (
        <div className="center">Nao ha registros de <br/> entrada ou saida</div>
      )}
    </Content>
  );
}

const Content = styled.div`
  height: 65vh;
  width: 100%;
  background: #ffffff;
  padding: 10px;
  margin-top: 4.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  color: #000000;

  .space-between {
    display: flex;
    justify-content: space-between;
  }
  .saldo {
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    line-height: 20px;
    color: #000000;
  }
  .box-transactions {
    height: 90%;
    overflow-y: scroll;
  }
  .value {
    font-family: Raleway;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
  }
  .red {
    color: #c70000;
  }
  .green {
    color: #03ac00;
  }
  .center {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Raleway;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    color: #868686;
    text-align: center;
  }
`;
