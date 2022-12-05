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

import { Form } from "../../../components/site/Form";
import { PagedCollection } from "../../../types/collection";
import { Site } from "../../../types/Site";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";

const getSite = async (id: string | string[] | undefined) =>
  id ? await fetch<Site>(`/sites/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: site } = {} } = useQuery<
    FetchResponse<Site> | undefined
  >(["site", id], () => getSite(id));

  if (!site) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{site && `Edit Site ${site["@id"]}`}</title>
        </Head>
      </div>
      <Form site={site} />
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
  const paths = await getPaths(response, "sites", "/sites/[id]/edit");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
