import React, { FC, ReactElement } from "react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { Container, Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/esm/Form";
import InputGroupWithExtras from "react-bootstrap/esm/InputGroup";

declare type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

type MyFormProps = {
  myAccount: string;
};

export const MyForm: FC<MyFormProps> = ({ myAccount }): ReactElement => {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  // const [gas, setGas] = useState(0);
  // const [gasPrice, setGasPrice] = useState(0);

  let account = myAccount;

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  const findBalance = async () => {
    if (window.ethereum !== undefined) {
      try {
        let myBalance = await web3.eth.getBalance(myAccount);
        setBalance(myBalance);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    loadWeb3();
    findBalance();
  });

  const handleToAddressChange = (e: React.ChangeEvent<FormControlElement>) => {
    setToAddress(e.target.value);
  };
  const handleAmountChange = (e: React.ChangeEvent<FormControlElement>) => {
    setAmount(Number(e.target.value));
  };
  const handleGasChange = (e: React.ChangeEvent<FormControlElement>) => {
    setGas(Number(e.target.value));
  };
  const handleGasPriceChange = (e: React.ChangeEvent<FormControlElement>) => {
    setGasPrice(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("To address: ", toAddress);
    console.log("Amount: ", amount);
    // console.log("Gas: ", gas);
    // console.log("Gas price: ", gasPrice);

    const deployMetamaskTxn = async () => {
      const transactionParameters = {
        // gasPrice: `${gasPrice}`,
        // gas: `${gas}`,
        to: `${toAddress}`,
        from: window.ethereum.selectedAddress,
        value: web3.utils.toWei(`0.1`)
      };

      try {
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters]
        });
        console.log(txHash);
        alert(txHash);
      } catch (error) {
        console.log(error);
      }
    };

    deployMetamaskTxn();
    e.preventDefault();
  };

  return (
    <Container fluid>
      <Row>
        <Col>Balance: {balance / 1000000000000000000} ETH</Col>
        <Col>
          <Button variant="outline-primary" disabled>
            {account}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
              // alignItems: "center"
            }}
          >
            <label style={{ margin: "5px 5px 0 5px" }}>Address</label>
            <input
              id="address"
              type="text"
              placeholder="Send to"
              value={toAddress}
              onChange={handleToAddressChange}
            />
            <label style={{ margin: "5px 5px 0 5px" }}>Amount</label>
            <input
              id="amount"
              type="number"
              placeholder="Amount to send"
              step="0.1"
              value={amount}
              onChange={handleAmountChange}
            />

            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "5px" }}
            >
              Submit
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};
