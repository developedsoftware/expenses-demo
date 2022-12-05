import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getPath } from "../../utils/dataAccess";
import { ExpenseClaimItemReceipt } from "../../types/ExpenseClaimItemReceipt";

interface Props {
  expenseclaimitemreceipt: ExpenseClaimItemReceipt;
  text: string;
}

export const Show: FunctionComponent<Props> = ({
  expenseclaimitemreceipt,
  text,
}) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!expenseclaimitemreceipt["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(expenseclaimitemreceipt["@id"], { method: "DELETE" });
      router.push("/expenseclaimitemreceipts");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show ExpenseClaimItemReceipt ${expenseclaimitemreceipt["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show ExpenseClaimItemReceipt ${expenseclaimitemreceipt["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">data</th>
            <td>{expenseclaimitemreceipt["data"]}</td>
          </tr>
          <tr>
            <th scope="row">expenseClaimItemId</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(
                    expenseclaimitemreceipt["expenseClaimItemId"],
                    "/expenseclaimitems/[id]"
                  ),
                  name: expenseclaimitemreceipt["expenseClaimItemId"],
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
      <Link href="/expenseclaimitemreceipts">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link
        href={getPath(
          expenseclaimitemreceipt["@id"],
          "/expenseclaimitemreceipts/[id]/edit"
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
