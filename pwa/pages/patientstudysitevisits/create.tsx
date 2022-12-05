import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/patientstudysitevisit/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create PatientStudySiteVisit</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
