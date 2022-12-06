import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getPath } from "../../utils/dataAccess";
import { PatientPaymentGateway } from "../../types/PatientPaymentGateway";

interface Props {
  patientpaymentgateway: PatientPaymentGateway;
  text: string;
}

export const Show: FunctionComponent<Props> = ({
  patientpaymentgateway,
  text,
}) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!patientpaymentgateway["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(patientpaymentgateway["@id"], { method: "DELETE" });
      router.push("/patientpaymentgateways");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show PatientPaymentGateway ${patientpaymentgateway["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show PatientPaymentGateway ${patientpaymentgateway["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">patient</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(
                    patientpaymentgateway["patient"],
                    "/patients/[id]"
                  ),
                  name: patientpaymentgateway["patient"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">data</th>
            <td>{patientpaymentgateway["data"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/patientpaymentgateways">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link
        href={getPath(
          patientpaymentgateway["@id"],
          "/patientpaymentgateways/[id]/edit"
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
