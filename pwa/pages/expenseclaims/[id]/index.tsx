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

import { Show } from "../../../components/expenseclaim/Show";
import { PagedCollection } from "../../../types/collection";
import { ExpenseClaim } from "../../../types/ExpenseClaim";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getExpenseClaim = async (id: string | string[] | undefined) =>
  id
    ? await fetch<ExpenseClaim>(`/expense_claims/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: expenseclaim, hubURL, text } = { hubURL: null, text: "" },
  } = useQuery<FetchResponse<ExpenseClaim> | undefined>(
    ["expenseclaim", id],
    () => getExpenseClaim(id)
  );
  const expenseclaimData = useMercure(expenseclaim, hubURL);

  if (!expenseclaimData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show ExpenseClaim ${expenseclaimData["@id"]}`}</title>
        </Head>
      </div>
      <Show expenseclaim={expenseclaimData} text={text} />
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
    "/expenseclaims/[id]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
