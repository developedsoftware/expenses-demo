import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/claimitem/List";
import { PagedCollection } from "../../types/collection";
import { ClaimItem } from "../../types/ClaimItem";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getClaimItems = async () =>
  await fetch<PagedCollection<ClaimItem>>("/claim_items");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: claimitems, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<ClaimItem>> | undefined
  >("claim_items", getClaimItems);
  const collection = useMercure(claimitems, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>ClaimItem List</title>
        </Head>
      </div>
      <List claimitems={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("claim_items", getClaimItems);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
