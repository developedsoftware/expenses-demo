import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/currency/List";
import { PagedCollection } from "../../types/collection";
import { Currency } from "../../types/Currency";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getCurrencys = async () =>
  await fetch<PagedCollection<Currency>>("/currencies");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: currencys, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Currency>> | undefined
  >("currencies", getCurrencys);
  const collection = useMercure(currencys, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Currency List</title>
        </Head>
      </div>
      <List currencys={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("currencies", getCurrencys);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
