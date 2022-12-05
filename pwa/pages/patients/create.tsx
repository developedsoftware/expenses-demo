import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/patient/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Patient</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
