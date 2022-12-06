import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getPath } from "../../utils/dataAccess";
import { PatientAddress } from "../../types/PatientAddress";

interface Props {
  patientaddress: PatientAddress;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ patientaddress, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!patientaddress["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(patientaddress["@id"], { method: "DELETE" });
      router.push("/patientaddresss");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show PatientAddress ${patientaddress["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show PatientAddress ${patientaddress["@id"]}`}</h1>
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
                  href: getPath(patientaddress["patient"], "/patients/[id]"),
                  name: patientaddress["patient"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">line1</th>
            <td>{patientaddress["line1"]}</td>
          </tr>
          <tr>
            <th scope="row">line2</th>
            <td>{patientaddress["line2"]}</td>
          </tr>
          <tr>
            <th scope="row">line3</th>
            <td>{patientaddress["line3"]}</td>
          </tr>
          <tr>
            <th scope="row">areaCode</th>
            <td>{patientaddress["areaCode"]}</td>
          </tr>
          <tr>
            <th scope="row">countryCode</th>
            <td>{patientaddress["countryCode"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/patientaddresss">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={getPath(patientaddress["@id"], "/patientaddresss/[id]/edit")}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
