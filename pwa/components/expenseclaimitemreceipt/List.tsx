import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { ExpenseClaimItemReceipt } from "../../types/ExpenseClaimItemReceipt";

interface Props {
  expenseclaimitemreceipts: ExpenseClaimItemReceipt[];
}

export const List: FunctionComponent<Props> = ({
  expenseclaimitemreceipts,
}) => (
  <div>
    <h1>ExpenseClaimItemReceipt List</h1>
    <Link href="/expenseclaimitemreceipts/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>data</th>
          <th>expenseClaimItemId</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {expenseclaimitemreceipts &&
          expenseclaimitemreceipts.length !== 0 &&
          expenseclaimitemreceipts.map(
            (expenseclaimitemreceipt) =>
              expenseclaimitemreceipt["@id"] && (
                <tr key={expenseclaimitemreceipt["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          expenseclaimitemreceipt["@id"],
                          "/expenseclaimitemreceipts/[id]"
                        ),
                        name: expenseclaimitemreceipt["@id"],
                      }}
                    />
                  </th>
                  <td>{expenseclaimitemreceipt["data"]}</td>
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
                  <td>
                    <Link
                      href={getPath(
                        expenseclaimitemreceipt["@id"],
                        "/expenseclaimitemreceipts/[id]"
                      )}
                    >
                      <a>
                        <i className="bi bi-search" aria-hidden="true"></i>
                        <span className="sr-only">Show</span>
                      </a>
                    </Link>
                  </td>
                  <td>
                    <Link
                      href={getPath(
                        expenseclaimitemreceipt["@id"],
                        "/expenseclaimitemreceipts/[id]/edit"
                      )}
                    >
                      <a>
                        <i className="bi bi-pen" aria-hidden="true" />
                        <span className="sr-only">Edit</span>
                      </a>
                    </Link>
                  </td>
                </tr>
              )
          )}
      </tbody>
    </table>
  </div>
);
