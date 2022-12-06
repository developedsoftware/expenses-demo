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

import { Form } from "../../../components/currency/Form";
import { PagedCollection } from "../../../types/collection";
import { Currency } from "../../../types/Currency";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";

const getCurrency = async (id: string | string[] | undefined) =>
  id ? await fetch<Currency>(`/currencies/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: currency } = {} } = useQuery<
    FetchResponse<Currency> | undefined
  >(["currency", id], () => getCurrency(id));

  if (!currency) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{currency && `Edit Currency ${currency["@id"]}`}</title>
        </Head>
      </div>
      <Form currency={currency} />
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
  const paths = await getPaths(response, "currencies", "/currencys/[id]/edit");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
