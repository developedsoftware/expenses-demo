import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/expenseclaim/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create ExpenseClaim</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
