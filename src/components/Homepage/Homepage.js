import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";
import { IconContext } from "react-icons";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";
import Transactions from "../Transactions/Transactions";

export default function Homepage() {
  const history = useHistory();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (!token) {
    alert("Faca login!");
    history.push("/");
  }

  useEffect(() => {
    setIsLoading(true);
    const request = axios.get("http://localhost:4000/transactions", config);

    request
      .then((response) => {
        console.log(response.data);
        setTransactions([...response.data]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  function logout() {
    const request = axios.delete("http://localhost:4000/logout", config);

    request
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        history.push("/");
      })
      .catch((error) => console.log(error));
  }
  console.log(transactions);
  return (
    <IconContext.Provider value={{ className: "react-icons" }}>
      <Content>
        <div className="space-between">
          <h1>{`Ola ${user}`}</h1>
          <HiOutlineLogout className="logout" onClick={logout} />
        </div>
        <Transactions transactions={transactions}></Transactions>
        <div className="space-between">
          <AddTransaction onClick={() => history.push("/transactions/1")}>
            <IoMdAddCircleOutline className="icons" />
            <h3>
              Nova <br /> Entrada
            </h3>
          </AddTransaction>
          <AddTransaction onClick={() => history.push("/transactions/2")}>
            <IoMdRemoveCircleOutline className="icons" />
            <h3>
              Nova <br /> Saida
            </h3>
          </AddTransaction>
        </div>
      </Content>
    </IconContext.Provider>
  );
}

const Content = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background: #8c11be;
  color: white;
  padding: 5%;
  .space-between {
    display: flex;
    justify-content: space-between;
  }
  h1 {
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
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
  .logout {
    font-size: 25px;
  }
`;

const AddTransaction = styled.div`
  width: 48%;
  height: 20vh;
  background: #a328d6;
  border-radius: 5px;
  margin-top: 4%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    line-height: 20px;
    color: #ffffff;
  }
  .icons {
    font-size: 25px;
  }
`;
