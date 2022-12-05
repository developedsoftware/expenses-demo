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

import { Show } from "../../../components/expensecurrency/Show";
import { PagedCollection } from "../../../types/collection";
import { ExpenseCurrency } from "../../../types/ExpenseCurrency";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getExpenseCurrency = async (id: string | string[] | undefined) =>
  id
    ? await fetch<ExpenseCurrency>(`/expense_currencies/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: expensecurrency, hubURL, text } = { hubURL: null, text: "" },
  } = useQuery<FetchResponse<ExpenseCurrency> | undefined>(
    ["expensecurrency", id],
    () => getExpenseCurrency(id)
  );
  const expensecurrencyData = useMercure(expensecurrency, hubURL);

  if (!expensecurrencyData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show ExpenseCurrency ${expensecurrencyData["@id"]}`}</title>
        </Head>
      </div>
      <Show expensecurrency={expensecurrencyData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["expensecurrency", id], () =>
    getExpenseCurrency(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<ExpenseCurrency>>(
    "/expense_currencies"
  );
  const paths = await getPaths(
    response,
    "expense_currencies",
    "/expensecurrencys/[id]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
