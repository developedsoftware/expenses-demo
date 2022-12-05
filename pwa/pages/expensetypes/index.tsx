import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/expensetype/List";
import { PagedCollection } from "../../types/collection";
import { ExpenseType } from "../../types/ExpenseType";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getExpenseTypes = async () =>
  await fetch<PagedCollection<ExpenseType>>("/expense_types");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: expensetypes, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<ExpenseType>> | undefined
  >("expense_types", getExpenseTypes);
  const collection = useMercure(expensetypes, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>ExpenseType List</title>
        </Head>
      </div>
      <List expensetypes={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("expense_types", getExpenseTypes);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
