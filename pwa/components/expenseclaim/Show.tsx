import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getPath } from "../../utils/dataAccess";
import { ExpenseClaim } from "../../types/ExpenseClaim";

interface Props {
  expenseclaim: ExpenseClaim;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ expenseclaim, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!expenseclaim["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(expenseclaim["@id"], { method: "DELETE" });
      router.push("/expenseclaims");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show ExpenseClaim ${expenseclaim["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show ExpenseClaim ${expenseclaim["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">expenseClaimItems</th>
            <td>
              <ReferenceLinks
                items={expenseclaim["expenseClaimItems"].map((ref: any) => ({
                  href: getPath(ref, "/expenseclaimitems/[id]"),
                  name: ref,
                }))}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">patientId</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(expenseclaim["patientId"], "/patients/[id]"),
                  name: expenseclaim["patientId"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">patientStudySiteVisitId</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(
                    expenseclaim["patientStudySiteVisitId"],
                    "/patientstudysitevisits/[id]"
                  ),
                  name: expenseclaim["patientStudySiteVisitId"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">expenseClaimStatusId</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(
                    expenseclaim["expenseClaimStatusId"],
                    "/expenseclaimstatuss/[id]"
                  ),
                  name: expenseclaim["expenseClaimStatusId"],
                }}
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
      <Link href="/expenseclaims">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={getPath(expenseclaim["@id"], "/expenseclaims/[id]/edit")}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
