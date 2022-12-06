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

import { Show } from "../../../components/patientpaymentgateway/Show";
import { PagedCollection } from "../../../types/collection";
import { PatientPaymentGateway } from "../../../types/PatientPaymentGateway";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getPatientPaymentGateway = async (id: string | string[] | undefined) =>
  id
    ? await fetch<PatientPaymentGateway>(`/patient_payment_gateways/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: patientpaymentgateway, hubURL, text } = {
      hubURL: null,
      text: "",
    },
  } = useQuery<FetchResponse<PatientPaymentGateway> | undefined>(
    ["patientpaymentgateway", id],
    () => getPatientPaymentGateway(id)
  );
  const patientpaymentgatewayData = useMercure(patientpaymentgateway, hubURL);

  if (!patientpaymentgatewayData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show PatientPaymentGateway ${patientpaymentgatewayData["@id"]}`}</title>
        </Head>
      </div>
      <Show patientpaymentgateway={patientpaymentgatewayData} text={text} />
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
    "/patientpaymentgateways/[id]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
