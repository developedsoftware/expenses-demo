import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/expenseclaimitem/List";
import { PagedCollection } from "../../types/collection";
import { ExpenseClaimItem } from "../../types/ExpenseClaimItem";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getExpenseClaimItems = async () =>
  await fetch<PagedCollection<ExpenseClaimItem>>("/expense_claim_items");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: expenseclaimitems, hubURL } = { hubURL: null } } =
    useQuery<FetchResponse<PagedCollection<ExpenseClaimItem>> | undefined>(
      "expense_claim_items",
      getExpenseClaimItems
    );
  const collection = useMercure(expenseclaimitems, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>ExpenseClaimItem List</title>
        </Head>
      </div>
      <List expenseclaimitems={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("expense_claim_items", getExpenseClaimItems);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
