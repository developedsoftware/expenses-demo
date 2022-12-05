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

import { Show } from "../../../components/expensetype/Show";
import { PagedCollection } from "../../../types/collection";
import { ExpenseType } from "../../../types/ExpenseType";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getExpenseType = async (id: string | string[] | undefined) =>
  id
    ? await fetch<ExpenseType>(`/expense_types/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: expensetype, hubURL, text } = { hubURL: null, text: "" },
  } = useQuery<FetchResponse<ExpenseType> | undefined>(
    ["expensetype", id],
    () => getExpenseType(id)
  );
  const expensetypeData = useMercure(expensetype, hubURL);

  if (!expensetypeData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show ExpenseType ${expensetypeData["@id"]}`}</title>
        </Head>
      </div>
      <Show expensetype={expensetypeData} text={text} />
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
  const paths = await getPaths(response, "expense_types", "/expensetypes/[id]");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
