import { useState } from "react";
import { MyDapp } from "./MyDapp";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

export default function App() {
  const [accountLoaded, setAccountLoadded] = useState(false);
  const [account, setAccount] = useState("");
  let isMetamask = window.ethereum;

  if (typeof isMetamask !== undefined) {
    const handleClick = async () => {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        const myAccount = accounts[0];
        setAccount(myAccount);
        setAccountLoadded(true);
      } catch (error) {
        console.log("Errors: ", error);
      }
    };

    return (
      <>
        {accountLoaded && account !== "" ? (
          <MyDapp myAccount={account} />
        ) : (
          <Container fluid>
            <Row>
              <Col>
                <h1>Metamask is installed</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="primary" onClick={handleClick}>
                  Connect to Metamask
                </Button>
              </Col>
            </Row>
          </Container>
        )}
      </>
    );
  } else {
    return (
      <>
        <Container fluid>
          <Row>
            <h1>Metamask is not installed.</h1>
          </Row>
          <Row>
            <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">
              Click here to install...
            </a>
          </Row>
        </Container>
      </>
    );
  }
}
