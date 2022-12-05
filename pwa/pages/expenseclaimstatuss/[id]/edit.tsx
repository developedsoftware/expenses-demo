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

import { Form } from "../../../components/expenseclaimstatus/Form";
import { PagedCollection } from "../../../types/collection";
import { ExpenseClaimStatus } from "../../../types/ExpenseClaimStatus";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";

const getExpenseClaimStatus = async (id: string | string[] | undefined) =>
  id
    ? await fetch<ExpenseClaimStatus>(`/expense_claim_statuses/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: expenseclaimstatus } = {} } = useQuery<
    FetchResponse<ExpenseClaimStatus> | undefined
  >(["expenseclaimstatus", id], () => getExpenseClaimStatus(id));

  if (!expenseclaimstatus) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>
            {expenseclaimstatus &&
              `Edit ExpenseClaimStatus ${expenseclaimstatus["@id"]}`}
          </title>
        </Head>
      </div>
      <Form expenseclaimstatus={expenseclaimstatus} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["expenseclaimstatus", id], () =>
    getExpenseClaimStatus(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<ExpenseClaimStatus>>(
    "/expense_claim_statuses"
  );
  const paths = await getPaths(
    response,
    "expense_claim_statuses",
    "/expenseclaimstatuss/[id]/edit"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
