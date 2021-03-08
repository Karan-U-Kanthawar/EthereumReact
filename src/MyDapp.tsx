import { MyForm } from "./components/MyForm";

import { FC } from "react";

type MyDappProps = {
  myAccount: string;
};

export const MyDapp: FC<MyDappProps> = ({ myAccount }) => {
  return (
    <>
      <MyForm myAccount={myAccount} />
    </>
  );
};
