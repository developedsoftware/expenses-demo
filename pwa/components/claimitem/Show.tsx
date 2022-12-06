import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getPath } from "../../utils/dataAccess";
import { ClaimItem } from "../../types/ClaimItem";

interface Props {
  claimitem: ClaimItem;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ claimitem, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!claimitem["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(claimitem["@id"], { method: "DELETE" });
      router.push("/claimitems");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show ClaimItem ${claimitem["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show ClaimItem ${claimitem["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">claim</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(claimitem["claim"], "/claims/[id]"),
                  name: claimitem["claim"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">expenseType</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(claimitem["expenseType"], "/expensetypes/[id]"),
                  name: claimitem["expenseType"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">currency</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(claimitem["currency"], "/currencys/[id]"),
                  name: claimitem["currency"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">amount</th>
            <td>{claimitem["amount"]}</td>
          </tr>
          <tr>
            <th scope="row">additionalInfo</th>
            <td>{claimitem["additionalInfo"]}</td>
          </tr>
          <tr>
            <th scope="row">claimTimestamp</th>
            <td>{claimitem["claimTimestamp"]?.toLocaleString()}</td>
          </tr>
          <tr>
            <th scope="row">claimItemReceipts</th>
            <td>
              <ReferenceLinks
                items={claimitem["claimItemReceipts"].map((ref: any) => ({
                  href: getPath(ref, "/claimitemreceipts/[id]"),
                  name: ref,
                }))}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">claimType</th>
            <td>{claimitem["claimType"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/claimitems">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={getPath(claimitem["@id"], "/claimitems/[id]/edit")}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
