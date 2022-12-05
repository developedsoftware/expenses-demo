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

import { Form } from "../../../components/patientstripeaccount/Form";
import { PagedCollection } from "../../../types/collection";
import { PatientStripeAccount } from "../../../types/PatientStripeAccount";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";

const getPatientStripeAccount = async (id: string | string[] | undefined) =>
  id
    ? await fetch<PatientStripeAccount>(`/patient_stripe_accounts/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: patientstripeaccount } = {} } = useQuery<
    FetchResponse<PatientStripeAccount> | undefined
  >(["patientstripeaccount", id], () => getPatientStripeAccount(id));

  if (!patientstripeaccount) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>
            {patientstripeaccount &&
              `Edit PatientStripeAccount ${patientstripeaccount["@id"]}`}
          </title>
        </Head>
      </div>
      <Form patientstripeaccount={patientstripeaccount} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["patientstripeaccount", id], () =>
    getPatientStripeAccount(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<PatientStripeAccount>>(
    "/patient_stripe_accounts"
  );
  const paths = await getPaths(
    response,
    "patient_stripe_accounts",
    "/patientstripeaccounts/[id]/edit"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
