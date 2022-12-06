import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/claimitemreceipt/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create ClaimItemReceipt</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
