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

import { Show } from "../../../components/claimitemreceipt/Show";
import { PagedCollection } from "../../../types/collection";
import { ClaimItemReceipt } from "../../../types/ClaimItemReceipt";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getClaimItemReceipt = async (id: string | string[] | undefined) =>
  id
    ? await fetch<ClaimItemReceipt>(`/claim_item_receipts/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: claimitemreceipt, hubURL, text } = { hubURL: null, text: "" },
  } = useQuery<FetchResponse<ClaimItemReceipt> | undefined>(
    ["claimitemreceipt", id],
    () => getClaimItemReceipt(id)
  );
  const claimitemreceiptData = useMercure(claimitemreceipt, hubURL);

  if (!claimitemreceiptData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show ClaimItemReceipt ${claimitemreceiptData["@id"]}`}</title>
        </Head>
      </div>
      <Show claimitemreceipt={claimitemreceiptData} text={text} />
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
    "/claimitemreceipts/[id]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
