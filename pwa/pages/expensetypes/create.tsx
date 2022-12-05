import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/expensetype/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create ExpenseType</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
