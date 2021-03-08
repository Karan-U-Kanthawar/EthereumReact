import React, { FC, ReactElement } from "react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { Container, Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/esm/Form";

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
  const [gas, setGas] = useState(0);
  const [gasPrice, setGasPrice] = useState(0);

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
    console.log("Gas: ", gas);
    console.log("Gas price: ", gasPrice);

    const deployMetamaskTxn = async () => {
      const transactionParameters = {
        gasPrice: `${gasPrice}`,
        gas: `${gas}`,
        to: `${toAddress}`,
        from: window.ethereum.selectedAddress,
        value: web3.utils.toWei(`${amount}`, "ether")
      };

      try {
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters]
        });
        console.log(txHash);
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
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formToAddress">
              <Form.Label>To Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Send to"
                onChange={handleToAddressChange}
                value={toAddress}
              />
            </Form.Group>

            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ether to send"
                onChange={handleAmountChange}
                value={amount}
                step="0.1"
              />
            </Form.Group>

            <Form.Group controlId="formGas">
              <Form.Label>Gas</Form.Label>
              <Form.Control
                type="number"
                placeholder="Gas"
                onChange={handleGasChange}
                value={gas}
              />
            </Form.Group>

            <Form.Group controlId="formGasPrice">
              <Form.Label>Gas Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Gas Price"
                onChange={handleGasPriceChange}
                value={gasPrice}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
