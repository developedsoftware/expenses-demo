import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/patientaddress/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create PatientAddress</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
