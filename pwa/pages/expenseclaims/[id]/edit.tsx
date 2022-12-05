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

import { Form } from "../../../components/expenseclaim/Form";
import { PagedCollection } from "../../../types/collection";
import { ExpenseClaim } from "../../../types/ExpenseClaim";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";

const getExpenseClaim = async (id: string | string[] | undefined) =>
  id
    ? await fetch<ExpenseClaim>(`/expense_claims/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: expenseclaim } = {} } = useQuery<
    FetchResponse<ExpenseClaim> | undefined
  >(["expenseclaim", id], () => getExpenseClaim(id));

  if (!expenseclaim) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>
            {expenseclaim && `Edit ExpenseClaim ${expenseclaim["@id"]}`}
          </title>
        </Head>
      </div>
      <Form expenseclaim={expenseclaim} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["expenseclaim", id], () =>
    getExpenseClaim(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<ExpenseClaim>>(
    "/expense_claims"
  );
  const paths = await getPaths(
    response,
    "expense_claims",
    "/expenseclaims/[id]/edit"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
