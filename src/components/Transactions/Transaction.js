import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";
import dayjs from "dayjs";

export default function Transaction(props) {
  const { transaction } = props;
  const { type, description, value, date } = transaction;
  const history = useHistory();
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

  return (
    <Content>
      <div className="space-between">
        <div className="date">{dayjs(transaction.date).format("DD/MM")}</div>
        <div className="description">{transaction.description}</div>
      </div>
      <div className={transaction.type === "in" ? "value green": "value red"}>
          {parseFloat(transaction.value).toFixed(2)}
      </div>
    </Content>
  );
}

const Content = styled.div`
  background: #ffffff;
  padding: 10px;
  margin-top: 1%;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;

  .space-between {
    display: flex;
    justify-content: space-between;
  }
  h1 {
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    line-height: 20px;
    color: #000000;
  }
  .date {
    font-family: Raleway;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #c6c6c6;
  }
  .description {
    margin-left: 12px;
    font-family: Raleway;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
  }
  .value {
    font-family: Raleway;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
  }
  .red {
    color: #C70000;
  }
  .green {
    color: #03AC00;
  }
`;
