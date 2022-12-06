import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getPath } from "../../utils/dataAccess";
import { Patient } from "../../types/Patient";

interface Props {
  patient: Patient;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ patient, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!patient["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(patient["@id"], { method: "DELETE" });
      router.push("/patients");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show Patient ${patient["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show Patient ${patient["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">registrationNumber</th>
            <td>{patient["registrationNumber"]}</td>
          </tr>
          <tr>
            <th scope="row">email</th>
            <td>{patient["email"]}</td>
          </tr>
          <tr>
            <th scope="row">password</th>
            <td>{patient["password"]}</td>
          </tr>
          <tr>
            <th scope="row">firstName</th>
            <td>{patient["firstName"]}</td>
          </tr>
          <tr>
            <th scope="row">lastName</th>
            <td>{patient["lastName"]}</td>
          </tr>
          <tr>
            <th scope="row">patientAddresses</th>
            <td>
              <ReferenceLinks
                items={patient["patientAddresses"].map((ref: any) => ({
                  href: getPath(ref, "/patientaddresss/[id]"),
                  name: ref,
                }))}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">patientPaymentGateways</th>
            <td>
              <ReferenceLinks
                items={patient["patientPaymentGateways"].map((ref: any) => ({
                  href: getPath(ref, "/patientpaymentgateways/[id]"),
                  name: ref,
                }))}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">claims</th>
            <td>
              <ReferenceLinks
                items={patient["claims"].map((ref: any) => ({
                  href: getPath(ref, "/claims/[id]"),
                  name: ref,
                }))}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/patients">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={getPath(patient["@id"], "/patients/[id]/edit")}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
