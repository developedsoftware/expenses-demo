import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/patientstudysitevisit/List";
import { PagedCollection } from "../../types/collection";
import { PatientStudySiteVisit } from "../../types/PatientStudySiteVisit";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getPatientStudySiteVisits = async () =>
  await fetch<PagedCollection<PatientStudySiteVisit>>(
    "/patient_study_site_visits"
  );

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: patientstudysitevisits, hubURL } = { hubURL: null } } =
    useQuery<FetchResponse<PagedCollection<PatientStudySiteVisit>> | undefined>(
      "patient_study_site_visits",
      getPatientStudySiteVisits
    );
  const collection = useMercure(patientstudysitevisits, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>PatientStudySiteVisit List</title>
        </Head>
      </div>
      <List patientstudysitevisits={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "patient_study_site_visits",
    getPatientStudySiteVisits
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
