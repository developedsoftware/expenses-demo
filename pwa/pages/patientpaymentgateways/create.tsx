import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/patientpaymentgateway/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create PatientPaymentGateway</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
