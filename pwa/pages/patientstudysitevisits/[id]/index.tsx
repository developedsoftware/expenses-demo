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

import { Show } from "../../../components/patientstudysitevisit/Show";
import { PagedCollection } from "../../../types/collection";
import { PatientStudySiteVisit } from "../../../types/PatientStudySiteVisit";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getPatientStudySiteVisit = async (id: string | string[] | undefined) =>
  id
    ? await fetch<PatientStudySiteVisit>(`/patient_study_site_visits/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: patientstudysitevisit, hubURL, text } = {
      hubURL: null,
      text: "",
    },
  } = useQuery<FetchResponse<PatientStudySiteVisit> | undefined>(
    ["patientstudysitevisit", id],
    () => getPatientStudySiteVisit(id)
  );
  const patientstudysitevisitData = useMercure(patientstudysitevisit, hubURL);

  if (!patientstudysitevisitData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show PatientStudySiteVisit ${patientstudysitevisitData["@id"]}`}</title>
        </Head>
      </div>
      <Show patientstudysitevisit={patientstudysitevisitData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["patientstudysitevisit", id], () =>
    getPatientStudySiteVisit(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<PatientStudySiteVisit>>(
    "/patient_study_site_visits"
  );
  const paths = await getPaths(
    response,
    "patient_study_site_visits",
    "/patientstudysitevisits/[id]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
