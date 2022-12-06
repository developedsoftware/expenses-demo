import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/patientpaymentgateway/List";
import { PagedCollection } from "../../types/collection";
import { PatientPaymentGateway } from "../../types/PatientPaymentGateway";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getPatientPaymentGateways = async () =>
  await fetch<PagedCollection<PatientPaymentGateway>>(
    "/patient_payment_gateways"
  );

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: patientpaymentgateways, hubURL } = { hubURL: null } } =
    useQuery<FetchResponse<PagedCollection<PatientPaymentGateway>> | undefined>(
      "patient_payment_gateways",
      getPatientPaymentGateways
    );
  const collection = useMercure(patientpaymentgateways, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>PatientPaymentGateway List</title>
        </Head>
      </div>
      <List patientpaymentgateways={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "patient_payment_gateways",
    getPatientPaymentGateways
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
