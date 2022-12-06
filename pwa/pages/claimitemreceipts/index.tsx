import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/claimitemreceipt/List";
import { PagedCollection } from "../../types/collection";
import { ClaimItemReceipt } from "../../types/ClaimItemReceipt";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getClaimItemReceipts = async () =>
  await fetch<PagedCollection<ClaimItemReceipt>>("/claim_item_receipts");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: claimitemreceipts, hubURL } = { hubURL: null } } =
    useQuery<FetchResponse<PagedCollection<ClaimItemReceipt>> | undefined>(
      "claim_item_receipts",
      getClaimItemReceipts
    );
  const collection = useMercure(claimitemreceipts, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>ClaimItemReceipt List</title>
        </Head>
      </div>
      <List claimitemreceipts={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("claim_item_receipts", getClaimItemReceipts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
