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

import { Show } from "../../../components/claimstatus/Show";
import { PagedCollection } from "../../../types/collection";
import { ClaimStatus } from "../../../types/ClaimStatus";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getClaimStatus = async (id: string | string[] | undefined) =>
  id
    ? await fetch<ClaimStatus>(`/claim_statuses/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: claimstatus, hubURL, text } = { hubURL: null, text: "" },
  } = useQuery<FetchResponse<ClaimStatus> | undefined>(
    ["claimstatus", id],
    () => getClaimStatus(id)
  );
  const claimstatusData = useMercure(claimstatus, hubURL);

  if (!claimstatusData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show ClaimStatus ${claimstatusData["@id"]}`}</title>
        </Head>
      </div>
      <Show claimstatus={claimstatusData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["claimstatus", id], () =>
    getClaimStatus(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<ClaimStatus>>("/claim_statuses");
  const paths = await getPaths(
    response,
    "claim_statuses",
    "/claimstatuss/[id]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
