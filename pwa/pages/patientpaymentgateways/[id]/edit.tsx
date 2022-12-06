import {
  GetStaticPaths,
  GetStaticProps,
  NextComponentType,
  NextPageContext,
} from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { Form } from "../../../components/patientpaymentgateway/Form";
import { PagedCollection } from "../../../types/collection";
import { PatientPaymentGateway } from "../../../types/PatientPaymentGateway";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";

const getPatientPaymentGateway = async (id: string | string[] | undefined) =>
  id
    ? await fetch<PatientPaymentGateway>(`/patient_payment_gateways/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: patientpaymentgateway } = {} } = useQuery<
    FetchResponse<PatientPaymentGateway> | undefined
  >(["patientpaymentgateway", id], () => getPatientPaymentGateway(id));

  if (!patientpaymentgateway) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>
            {patientpaymentgateway &&
              `Edit PatientPaymentGateway ${patientpaymentgateway["@id"]}`}
          </title>
        </Head>
      </div>
      <Form patientpaymentgateway={patientpaymentgateway} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["patientpaymentgateway", id], () =>
    getPatientPaymentGateway(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<PatientPaymentGateway>>(
    "/patient_payment_gateways"
  );
  const paths = await getPaths(
    response,
    "patient_payment_gateways",
    "/patientpaymentgateways/[id]/edit"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
