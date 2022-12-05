import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/expenseclaimstatus/List";
import { PagedCollection } from "../../types/collection";
import { ExpenseClaimStatus } from "../../types/ExpenseClaimStatus";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getExpenseClaimStatuss = async () =>
  await fetch<PagedCollection<ExpenseClaimStatus>>("/expense_claim_statuses");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: expenseclaimstatuss, hubURL } = { hubURL: null } } =
    useQuery<FetchResponse<PagedCollection<ExpenseClaimStatus>> | undefined>(
      "expense_claim_statuses",
      getExpenseClaimStatuss
    );
  const collection = useMercure(expenseclaimstatuss, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>ExpenseClaimStatus List</title>
        </Head>
      </div>
      <List expenseclaimstatuss={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "expense_claim_statuses",
    getExpenseClaimStatuss
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
