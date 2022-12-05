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

import { Show } from "../../../components/expenseclaimitemstatus/Show";
import { PagedCollection } from "../../../types/collection";
import { ExpenseClaimItemStatus } from "../../../types/ExpenseClaimItemStatus";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getExpenseClaimItemStatus = async (id: string | string[] | undefined) =>
  id
    ? await fetch<ExpenseClaimItemStatus>(`/expense_claim_item_statuses/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: expenseclaimitemstatus, hubURL, text } = {
      hubURL: null,
      text: "",
    },
  } = useQuery<FetchResponse<ExpenseClaimItemStatus> | undefined>(
    ["expenseclaimitemstatus", id],
    () => getExpenseClaimItemStatus(id)
  );
  const expenseclaimitemstatusData = useMercure(expenseclaimitemstatus, hubURL);

  if (!expenseclaimitemstatusData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show ExpenseClaimItemStatus ${expenseclaimitemstatusData["@id"]}`}</title>
        </Head>
      </div>
      <Show expenseclaimitemstatus={expenseclaimitemstatusData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["expenseclaimitemstatus", id], () =>
    getExpenseClaimItemStatus(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<ExpenseClaimItemStatus>>(
    "/expense_claim_item_statuses"
  );
  const paths = await getPaths(
    response,
    "expense_claim_item_statuses",
    "/expenseclaimitemstatuss/[id]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
