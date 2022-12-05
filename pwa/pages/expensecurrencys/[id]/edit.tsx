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

import { Form } from "../../../components/expensecurrency/Form";
import { PagedCollection } from "../../../types/collection";
import { ExpenseCurrency } from "../../../types/ExpenseCurrency";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";

const getExpenseCurrency = async (id: string | string[] | undefined) =>
  id
    ? await fetch<ExpenseCurrency>(`/expense_currencies/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: expensecurrency } = {} } = useQuery<
    FetchResponse<ExpenseCurrency> | undefined
  >(["expensecurrency", id], () => getExpenseCurrency(id));

  if (!expensecurrency) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>
            {expensecurrency &&
              `Edit ExpenseCurrency ${expensecurrency["@id"]}`}
          </title>
        </Head>
      </div>
      <Form expensecurrency={expensecurrency} />
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
    "/expensecurrencys/[id]/edit"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
