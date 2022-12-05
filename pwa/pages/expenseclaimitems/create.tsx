import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/expenseclaimitem/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create ExpenseClaimItem</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
