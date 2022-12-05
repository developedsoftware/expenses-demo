import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getPath } from "../../utils/dataAccess";
import { PatientStripeAccount } from "../../types/PatientStripeAccount";

interface Props {
  patientstripeaccount: PatientStripeAccount;
  text: string;
}

export const Show: FunctionComponent<Props> = ({
  patientstripeaccount,
  text,
}) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!patientstripeaccount["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(patientstripeaccount["@id"], { method: "DELETE" });
      router.push("/patientstripeaccounts");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show PatientStripeAccount ${patientstripeaccount["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show PatientStripeAccount ${patientstripeaccount["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">patientId</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(
                    patientstripeaccount["patientId"],
                    "/patients/[id]"
                  ),
                  name: patientstripeaccount["patientId"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">stripeAccountUuid</th>
            <td>{patientstripeaccount["stripeAccountUuid"]}</td>
          </tr>
          <tr>
            <th scope="row">stripe_account_uuid</th>
            <td>{patientstripeaccount["stripe_account_uuid"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/patientstripeaccounts">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link
        href={getPath(
          patientstripeaccount["@id"],
          "/patientstripeaccounts/[id]/edit"
        )}
      >
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
