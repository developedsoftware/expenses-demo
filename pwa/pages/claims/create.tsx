import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/claim/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Claim</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
