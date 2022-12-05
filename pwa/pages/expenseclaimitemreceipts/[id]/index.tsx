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

import { Show } from "../../../components/expenseclaimitemreceipt/Show";
import { PagedCollection } from "../../../types/collection";
import { ExpenseClaimItemReceipt } from "../../../types/ExpenseClaimItemReceipt";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getExpenseClaimItemReceipt = async (id: string | string[] | undefined) =>
  id
    ? await fetch<ExpenseClaimItemReceipt>(`/expense_claim_item_receipts/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: expenseclaimitemreceipt, hubURL, text } = {
      hubURL: null,
      text: "",
    },
  } = useQuery<FetchResponse<ExpenseClaimItemReceipt> | undefined>(
    ["expenseclaimitemreceipt", id],
    () => getExpenseClaimItemReceipt(id)
  );
  const expenseclaimitemreceiptData = useMercure(
    expenseclaimitemreceipt,
    hubURL
  );

  if (!expenseclaimitemreceiptData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show ExpenseClaimItemReceipt ${expenseclaimitemreceiptData["@id"]}`}</title>
        </Head>
      </div>
      <Show expenseclaimitemreceipt={expenseclaimitemreceiptData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["expenseclaimitemreceipt", id], () =>
    getExpenseClaimItemReceipt(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<ExpenseClaimItemReceipt>>(
    "/expense_claim_item_receipts"
  );
  const paths = await getPaths(
    response,
    "expense_claim_item_receipts",
    "/expenseclaimitemreceipts/[id]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
