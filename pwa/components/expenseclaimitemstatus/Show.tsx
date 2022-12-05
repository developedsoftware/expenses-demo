import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getPath } from "../../utils/dataAccess";
import { ExpenseClaimItemStatus } from "../../types/ExpenseClaimItemStatus";

interface Props {
  expenseclaimitemstatus: ExpenseClaimItemStatus;
  text: string;
}

export const Show: FunctionComponent<Props> = ({
  expenseclaimitemstatus,
  text,
}) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!expenseclaimitemstatus["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(expenseclaimitemstatus["@id"], { method: "DELETE" });
      router.push("/expenseclaimitemstatuss");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show ExpenseClaimItemStatus ${expenseclaimitemstatus["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show ExpenseClaimItemStatus ${expenseclaimitemstatus["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">status</th>
            <td>{expenseclaimitemstatus["status"]}</td>
          </tr>
          <tr>
            <th scope="row">expenseClaimItems</th>
            <td>
              <ReferenceLinks
                items={expenseclaimitemstatus["expenseClaimItems"].map(
                  (ref: any) => ({
                    href: getPath(ref, "/expenseclaimitems/[id]"),
                    name: ref,
                  })
                )}
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
      <Link href="/expenseclaimitemstatuss">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link
        href={getPath(
          expenseclaimitemstatus["@id"],
          "/expenseclaimitemstatuss/[id]/edit"
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
