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

import { Show } from "../../../components/claim/Show";
import { PagedCollection } from "../../../types/collection";
import { Claim } from "../../../types/Claim";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getClaim = async (id: string | string[] | undefined) =>
  id ? await fetch<Claim>(`/claims/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: claim, hubURL, text } = { hubURL: null, text: "" } } =
    useQuery<FetchResponse<Claim> | undefined>(["claim", id], () =>
      getClaim(id)
    );
  const claimData = useMercure(claim, hubURL);

  if (!claimData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show Claim ${claimData["@id"]}`}</title>
        </Head>
      </div>
      <Show claim={claimData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["claim", id], () => getClaim(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Claim>>("/claims");
  const paths = await getPaths(response, "claims", "/claims/[id]");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
