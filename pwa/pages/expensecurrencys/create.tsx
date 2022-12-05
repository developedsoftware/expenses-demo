import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/expensecurrency/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create ExpenseCurrency</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
