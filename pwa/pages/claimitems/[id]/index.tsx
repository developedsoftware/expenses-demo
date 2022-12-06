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

import { Show } from "../../../components/claimitem/Show";
import { PagedCollection } from "../../../types/collection";
import { ClaimItem } from "../../../types/ClaimItem";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getClaimItem = async (id: string | string[] | undefined) =>
  id
    ? await fetch<ClaimItem>(`/claim_items/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: claimitem, hubURL, text } = { hubURL: null, text: "" },
  } = useQuery<FetchResponse<ClaimItem> | undefined>(["claimitem", id], () =>
    getClaimItem(id)
  );
  const claimitemData = useMercure(claimitem, hubURL);

  if (!claimitemData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show ClaimItem ${claimitemData["@id"]}`}</title>
        </Head>
      </div>
      <Show claimitem={claimitemData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["claimitem", id], () => getClaimItem(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<ClaimItem>>("/claim_items");
  const paths = await getPaths(response, "claim_items", "/claimitems/[id]");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
