import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/expensecurrency/List";
import { PagedCollection } from "../../types/collection";
import { ExpenseCurrency } from "../../types/ExpenseCurrency";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getExpenseCurrencys = async () =>
  await fetch<PagedCollection<ExpenseCurrency>>("/expense_currencies");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: expensecurrencys, hubURL } = { hubURL: null } } =
    useQuery<FetchResponse<PagedCollection<ExpenseCurrency>> | undefined>(
      "expense_currencies",
      getExpenseCurrencys
    );
  const collection = useMercure(expensecurrencys, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>ExpenseCurrency List</title>
        </Head>
      </div>
      <List expensecurrencys={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("expense_currencies", getExpenseCurrencys);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
