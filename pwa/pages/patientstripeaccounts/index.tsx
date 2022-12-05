import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/patientstripeaccount/List";
import { PagedCollection } from "../../types/collection";
import { PatientStripeAccount } from "../../types/PatientStripeAccount";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getPatientStripeAccounts = async () =>
  await fetch<PagedCollection<PatientStripeAccount>>(
    "/patient_stripe_accounts"
  );

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: patientstripeaccounts, hubURL } = { hubURL: null } } =
    useQuery<FetchResponse<PagedCollection<PatientStripeAccount>> | undefined>(
      "patient_stripe_accounts",
      getPatientStripeAccounts
    );
  const collection = useMercure(patientstripeaccounts, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>PatientStripeAccount List</title>
        </Head>
      </div>
      <List patientstripeaccounts={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "patient_stripe_accounts",
    getPatientStripeAccounts
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
