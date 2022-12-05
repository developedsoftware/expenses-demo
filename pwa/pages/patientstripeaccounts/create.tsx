import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/patientstripeaccount/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create PatientStripeAccount</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
