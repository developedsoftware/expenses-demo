import {
  GetStaticPaths,
  GetStaticProps,
  NextComponentType,
  NextPageContext,
} from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { Show } from "../../../components/currency/Show";
import { PagedCollection } from "../../../types/collection";
import { Currency } from "../../../types/Currency";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getCurrency = async (id: string | string[] | undefined) =>
  id ? await fetch<Currency>(`/currencies/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: currency, hubURL, text } = { hubURL: null, text: "" },
  } = useQuery<FetchResponse<Currency> | undefined>(["currency", id], () =>
    getCurrency(id)
  );
  const currencyData = useMercure(currency, hubURL);

  if (!currencyData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show Currency ${currencyData["@id"]}`}</title>
        </Head>
      </div>
      <Show currency={currencyData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["currency", id], () => getCurrency(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Currency>>("/currencies");
  const paths = await getPaths(response, "currencies", "/currencys/[id]");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
