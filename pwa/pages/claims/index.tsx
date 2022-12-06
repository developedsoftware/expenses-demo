import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/claim/List";
import { PagedCollection } from "../../types/collection";
import { Claim } from "../../types/Claim";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getClaims = async () => await fetch<PagedCollection<Claim>>("/claims");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: claims, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Claim>> | undefined
  >("claims", getClaims);
  const collection = useMercure(claims, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Claim List</title>
        </Head>
      </div>
      <List claims={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("claims", getClaims);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
