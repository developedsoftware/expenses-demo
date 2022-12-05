import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/expenseclaimitemstatus/List";
import { PagedCollection } from "../../types/collection";
import { ExpenseClaimItemStatus } from "../../types/ExpenseClaimItemStatus";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getExpenseClaimItemStatuss = async () =>
  await fetch<PagedCollection<ExpenseClaimItemStatus>>(
    "/expense_claim_item_statuses"
  );

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: expenseclaimitemstatuss, hubURL } = { hubURL: null } } =
    useQuery<
      FetchResponse<PagedCollection<ExpenseClaimItemStatus>> | undefined
    >("expense_claim_item_statuses", getExpenseClaimItemStatuss);
  const collection = useMercure(expenseclaimitemstatuss, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>ExpenseClaimItemStatus List</title>
        </Head>
      </div>
      <List expenseclaimitemstatuss={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "expense_claim_item_statuses",
    getExpenseClaimItemStatuss
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
