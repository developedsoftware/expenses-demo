import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/claimstatus/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create ClaimStatus</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
