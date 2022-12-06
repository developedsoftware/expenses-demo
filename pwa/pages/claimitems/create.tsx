import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/claimitem/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create ClaimItem</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
