import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/expenseclaimitemreceipt/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create ExpenseClaimItemReceipt</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
