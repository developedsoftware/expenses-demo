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

import { Form } from "../../../components/claimitemreceipt/Form";
import { PagedCollection } from "../../../types/collection";
import { ClaimItemReceipt } from "../../../types/ClaimItemReceipt";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";

const getClaimItemReceipt = async (id: string | string[] | undefined) =>
  id
    ? await fetch<ClaimItemReceipt>(`/claim_item_receipts/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: claimitemreceipt } = {} } = useQuery<
    FetchResponse<ClaimItemReceipt> | undefined
  >(["claimitemreceipt", id], () => getClaimItemReceipt(id));

  if (!claimitemreceipt) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>
            {claimitemreceipt &&
              `Edit ClaimItemReceipt ${claimitemreceipt["@id"]}`}
          </title>
        </Head>
      </div>
      <Form claimitemreceipt={claimitemreceipt} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["claimitemreceipt", id], () =>
    getClaimItemReceipt(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<ClaimItemReceipt>>(
    "/claim_item_receipts"
  );
  const paths = await getPaths(
    response,
    "claim_item_receipts",
    "/claimitemreceipts/[id]/edit"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
