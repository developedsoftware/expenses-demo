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

import { Show } from "../../../components/site/Show";
import { PagedCollection } from "../../../types/collection";
import { Site } from "../../../types/Site";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getSite = async (id: string | string[] | undefined) =>
  id ? await fetch<Site>(`/sites/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: site, hubURL, text } = { hubURL: null, text: "" } } =
    useQuery<FetchResponse<Site> | undefined>(["site", id], () => getSite(id));
  const siteData = useMercure(site, hubURL);

  if (!siteData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show Site ${siteData["@id"]}`}</title>
        </Head>
      </div>
      <Show site={siteData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["site", id], () => getSite(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Site>>("/sites");
  const paths = await getPaths(response, "sites", "/sites/[id]");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
