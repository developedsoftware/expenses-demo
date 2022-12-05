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

import { Form } from "../../../components/patientaddress/Form";
import { PagedCollection } from "../../../types/collection";
import { PatientAddress } from "../../../types/PatientAddress";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";

const getPatientAddress = async (id: string | string[] | undefined) =>
  id
    ? await fetch<PatientAddress>(`/patient_addresses/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: patientaddress } = {} } = useQuery<
    FetchResponse<PatientAddress> | undefined
  >(["patientaddress", id], () => getPatientAddress(id));

  if (!patientaddress) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>
            {patientaddress && `Edit PatientAddress ${patientaddress["@id"]}`}
          </title>
        </Head>
      </div>
      <Form patientaddress={patientaddress} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["patientaddress", id], () =>
    getPatientAddress(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<PatientAddress>>(
    "/patient_addresses"
  );
  const paths = await getPaths(
    response,
    "patient_addresses",
    "/patientaddresss/[id]/edit"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
