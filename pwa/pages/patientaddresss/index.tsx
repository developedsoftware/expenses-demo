import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/patientaddress/List";
import { PagedCollection } from "../../types/collection";
import { PatientAddress } from "../../types/PatientAddress";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getPatientAddresss = async () =>
  await fetch<PagedCollection<PatientAddress>>("/patient_addresses");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: patientaddresss, hubURL } = { hubURL: null } } =
    useQuery<FetchResponse<PagedCollection<PatientAddress>> | undefined>(
      "patient_addresses",
      getPatientAddresss
    );
  const collection = useMercure(patientaddresss, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>PatientAddress List</title>
        </Head>
      </div>
      <List patientaddresss={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("patient_addresses", getPatientAddresss);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
