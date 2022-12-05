import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/expenseclaim/List";
import { PagedCollection } from "../../types/collection";
import { ExpenseClaim } from "../../types/ExpenseClaim";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getExpenseClaims = async () =>
  await fetch<PagedCollection<ExpenseClaim>>("/expense_claims");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: expenseclaims, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<ExpenseClaim>> | undefined
  >("expense_claims", getExpenseClaims);
  const collection = useMercure(expenseclaims, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>ExpenseClaim List</title>
        </Head>
      </div>
      <List expenseclaims={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("expense_claims", getExpenseClaims);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
