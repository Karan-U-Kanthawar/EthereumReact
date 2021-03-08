import "./styles.css";
import Web3 from "web3";
import { useEffect } from "react";

export default function App() {
  const privateKey =
    "0000FFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141";
  const testNet = "https://kovan.infura.io/v3/10e3b05782da47f2a8a18db1f3e7b9c2";

  const web3 = new Web3(new Web3.providers.HttpProvider(testNet));

  useEffect(() => {
    const fromAddress = "0x225338C81A727FEB26f8006daD88bf3e49317833";
    const toAddress = "0x0EC23E0d5Db74275Aa6B2A7bECec970A3636Db20";
    const valueToSend = web3.utils.toWei("0.1", "ether");

    const deploy = async () => {
      const createTxn = await web3.eth.accounts.signTransaction(
        { from: fromAddress, to: toAddress, value: valueToSend, gas: "21000" },
        privateKey,
        (err, signTxnDataParams) => {
          if (err) console.log(err);
          else console.log(signTxnDataParams);
        }
      );

      if (createTxn.rawTransaction !== undefined) {
        const createReceipt = await web3.eth.sendSignedTransaction(
          createTxn.rawTransaction,
          (error, hash) => {
            if (error) console.log("Error: ", error);
            else console.log("Success: Txn hash is ", hash);
          }
        );
      }
    };

    console.log("Transaction started...");
    deploy();
  });

  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
}
