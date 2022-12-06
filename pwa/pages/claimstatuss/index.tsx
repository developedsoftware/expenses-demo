import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/claimstatus/List";
import { PagedCollection } from "../../types/collection";
import { ClaimStatus } from "../../types/ClaimStatus";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getClaimStatuss = async () =>
  await fetch<PagedCollection<ClaimStatus>>("/claim_statuses");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: claimstatuss, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<ClaimStatus>> | undefined
  >("claim_statuses", getClaimStatuss);
  const collection = useMercure(claimstatuss, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>ClaimStatus List</title>
        </Head>
      </div>
      <List claimstatuss={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("claim_statuses", getClaimStatuss);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
