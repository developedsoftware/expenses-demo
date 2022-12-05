import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getPath } from "../../utils/dataAccess";
import { PatientStudySiteVisit } from "../../types/PatientStudySiteVisit";

interface Props {
  patientstudysitevisit: PatientStudySiteVisit;
  text: string;
}

export const Show: FunctionComponent<Props> = ({
  patientstudysitevisit,
  text,
}) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!patientstudysitevisit["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(patientstudysitevisit["@id"], { method: "DELETE" });
      router.push("/patientstudysitevisits");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show PatientStudySiteVisit ${patientstudysitevisit["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show PatientStudySiteVisit ${patientstudysitevisit["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">expenseClaims</th>
            <td>
              <ReferenceLinks
                items={patientstudysitevisit["expenseClaims"].map(
                  (ref: any) => ({
                    href: getPath(ref, "/expenseclaims/[id]"),
                    name: ref,
                  })
                )}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">patientId</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(
                    patientstudysitevisit["patientId"],
                    "/patients/[id]"
                  ),
                  name: patientstudysitevisit["patientId"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">studyId</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(
                    patientstudysitevisit["studyId"],
                    "/studys/[id]"
                  ),
                  name: patientstudysitevisit["studyId"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">siteId</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(patientstudysitevisit["siteId"], "/sites/[id]"),
                  name: patientstudysitevisit["siteId"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">visitTimestamp</th>
            <td>{patientstudysitevisit["visitTimestamp"]?.toLocaleString()}</td>
          </tr>
          <tr>
            <th scope="row">visit_timestamp</th>
            <td>
              {patientstudysitevisit["visit_timestamp"]?.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/patientstudysitevisits">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link
        href={getPath(
          patientstudysitevisit["@id"],
          "/patientstudysitevisits/[id]/edit"
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
