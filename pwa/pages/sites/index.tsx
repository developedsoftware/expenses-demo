import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/site/List";
import { PagedCollection } from "../../types/collection";
import { Site } from "../../types/Site";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getSites = async () => await fetch<PagedCollection<Site>>("/sites");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: sites, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Site>> | undefined
  >("sites", getSites);
  const collection = useMercure(sites, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Site List</title>
        </Head>
      </div>
      <List sites={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("sites", getSites);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
