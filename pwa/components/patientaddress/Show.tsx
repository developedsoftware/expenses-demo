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
            <th scope="row">patientId</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(patientaddress["patientId"], "/patients/[id]"),
                  name: patientaddress["patientId"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">addressLine1</th>
            <td>{patientaddress["addressLine1"]}</td>
          </tr>
          <tr>
            <th scope="row">addressLine2</th>
            <td>{patientaddress["addressLine2"]}</td>
          </tr>
          <tr>
            <th scope="row">addressLine3</th>
            <td>{patientaddress["addressLine3"]}</td>
          </tr>
          <tr>
            <th scope="row">addressLine4</th>
            <td>{patientaddress["addressLine4"]}</td>
          </tr>
          <tr>
            <th scope="row">areaCode</th>
            <td>{patientaddress["areaCode"]}</td>
          </tr>
          <tr>
            <th scope="row">countryCode</th>
            <td>{patientaddress["countryCode"]}</td>
          </tr>
          <tr>
            <th scope="row">isPrimary</th>
            <td>{patientaddress["isPrimary"]}</td>
          </tr>
          <tr>
            <th scope="row">address_line_1</th>
            <td>{patientaddress["address_line_1"]}</td>
          </tr>
          <tr>
            <th scope="row">address_line_2</th>
            <td>{patientaddress["address_line_2"]}</td>
          </tr>
          <tr>
            <th scope="row">address_line_3</th>
            <td>{patientaddress["address_line_3"]}</td>
          </tr>
          <tr>
            <th scope="row">address_line_4</th>
            <td>{patientaddress["address_line_4"]}</td>
          </tr>
          <tr>
            <th scope="row">area_code</th>
            <td>{patientaddress["area_code"]}</td>
          </tr>
          <tr>
            <th scope="row">country_code</th>
            <td>{patientaddress["country_code"]}</td>
          </tr>
          <tr>
            <th scope="row">is_primary</th>
            <td>{patientaddress["is_primary"]}</td>
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
