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

import { Form } from "../../../components/expensetype/Form";
import { PagedCollection } from "../../../types/collection";
import { ExpenseType } from "../../../types/ExpenseType";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";

const getExpenseType = async (id: string | string[] | undefined) =>
  id
    ? await fetch<ExpenseType>(`/expense_types/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: expensetype } = {} } = useQuery<
    FetchResponse<ExpenseType> | undefined
  >(["expensetype", id], () => getExpenseType(id));

  if (!expensetype) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>
            {expensetype && `Edit ExpenseType ${expensetype["@id"]}`}
          </title>
        </Head>
      </div>
      <Form expensetype={expensetype} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["expensetype", id], () =>
    getExpenseType(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<ExpenseType>>("/expense_types");
  const paths = await getPaths(
    response,
    "expense_types",
    "/expensetypes/[id]/edit"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
