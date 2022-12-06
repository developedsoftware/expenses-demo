import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getPath } from "../../utils/dataAccess";
import { ClaimItemReceipt } from "../../types/ClaimItemReceipt";

interface Props {
  claimitemreceipt: ClaimItemReceipt;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ claimitemreceipt, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!claimitemreceipt["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(claimitemreceipt["@id"], { method: "DELETE" });
      router.push("/claimitemreceipts");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show ClaimItemReceipt ${claimitemreceipt["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show ClaimItemReceipt ${claimitemreceipt["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">claimItem</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(
                    claimitemreceipt["claimItem"],
                    "/claimitems/[id]"
                  ),
                  name: claimitemreceipt["claimItem"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">data</th>
            <td>{claimitemreceipt["data"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/claimitemreceipts">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link
        href={getPath(claimitemreceipt["@id"], "/claimitemreceipts/[id]/edit")}
      >
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
