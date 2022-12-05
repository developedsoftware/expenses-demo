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

import { Show } from "../../../components/expenseclaimitem/Show";
import { PagedCollection } from "../../../types/collection";
import { ExpenseClaimItem } from "../../../types/ExpenseClaimItem";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getExpenseClaimItem = async (id: string | string[] | undefined) =>
  id
    ? await fetch<ExpenseClaimItem>(`/expense_claim_items/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: expenseclaimitem, hubURL, text } = { hubURL: null, text: "" },
  } = useQuery<FetchResponse<ExpenseClaimItem> | undefined>(
    ["expenseclaimitem", id],
    () => getExpenseClaimItem(id)
  );
  const expenseclaimitemData = useMercure(expenseclaimitem, hubURL);

  if (!expenseclaimitemData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show ExpenseClaimItem ${expenseclaimitemData["@id"]}`}</title>
        </Head>
      </div>
      <Show expenseclaimitem={expenseclaimitemData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["expenseclaimitem", id], () =>
    getExpenseClaimItem(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<ExpenseClaimItem>>(
    "/expense_claim_items"
  );
  const paths = await getPaths(
    response,
    "expense_claim_items",
    "/expenseclaimitems/[id]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
