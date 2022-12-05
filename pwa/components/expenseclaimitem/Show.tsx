import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getPath } from "../../utils/dataAccess";
import { ExpenseClaimItem } from "../../types/ExpenseClaimItem";

interface Props {
  expenseclaimitem: ExpenseClaimItem;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ expenseclaimitem, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!expenseclaimitem["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(expenseclaimitem["@id"], { method: "DELETE" });
      router.push("/expenseclaimitems");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show ExpenseClaimItem ${expenseclaimitem["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show ExpenseClaimItem ${expenseclaimitem["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">amount</th>
            <td>{expenseclaimitem["amount"]}</td>
          </tr>
          <tr>
            <th scope="row">expenseClaimItemReceipts</th>
            <td>
              <ReferenceLinks
                items={expenseclaimitem["expenseClaimItemReceipts"].map(
                  (ref: any) => ({
                    href: getPath(ref, "/expenseclaimitemreceipts/[id]"),
                    name: ref,
                  })
                )}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">expenseClaimId</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(
                    expenseclaimitem["expenseClaimId"],
                    "/expenseclaims/[id]"
                  ),
                  name: expenseclaimitem["expenseClaimId"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">expenseTypeId</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(
                    expenseclaimitem["expenseTypeId"],
                    "/expensetypes/[id]"
                  ),
                  name: expenseclaimitem["expenseTypeId"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">expenseCurrencyId</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(
                    expenseclaimitem["expenseCurrencyId"],
                    "/expensecurrencys/[id]"
                  ),
                  name: expenseclaimitem["expenseCurrencyId"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">additionalInfo</th>
            <td>{expenseclaimitem["additionalInfo"]}</td>
          </tr>
          <tr>
            <th scope="row">expenseClaimItemStatusId</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(
                    expenseclaimitem["expenseClaimItemStatusId"],
                    "/expenseclaimitemstatuss/[id]"
                  ),
                  name: expenseclaimitem["expenseClaimItemStatusId"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">additional_info</th>
            <td>{expenseclaimitem["additional_info"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/expenseclaimitems">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link
        href={getPath(expenseclaimitem["@id"], "/expenseclaimitems/[id]/edit")}
      >
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
