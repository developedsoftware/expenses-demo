import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/expenseclaimstatus/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create ExpenseClaimStatus</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
