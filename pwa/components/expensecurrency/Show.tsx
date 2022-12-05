import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getPath } from "../../utils/dataAccess";
import { ExpenseCurrency } from "../../types/ExpenseCurrency";

interface Props {
  expensecurrency: ExpenseCurrency;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ expensecurrency, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!expensecurrency["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(expensecurrency["@id"], { method: "DELETE" });
      router.push("/expensecurrencys");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show ExpenseCurrency ${expensecurrency["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show ExpenseCurrency ${expensecurrency["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">currency</th>
            <td>{expensecurrency["currency"]}</td>
          </tr>
          <tr>
            <th scope="row">expenseClaimItems</th>
            <td>
              <ReferenceLinks
                items={expensecurrency["expenseClaimItems"].map((ref: any) => ({
                  href: getPath(ref, "/expenseclaimitems/[id]"),
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
      <Link href="/expensecurrencys">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link
        href={getPath(expensecurrency["@id"], "/expensecurrencys/[id]/edit")}
      >
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
