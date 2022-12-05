import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { ExpenseClaimItemStatus } from "../../types/ExpenseClaimItemStatus";

interface Props {
  expenseclaimitemstatuss: ExpenseClaimItemStatus[];
}

export const List: FunctionComponent<Props> = ({ expenseclaimitemstatuss }) => (
  <div>
    <h1>ExpenseClaimItemStatus List</h1>
    <Link href="/expenseclaimitemstatuss/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>status</th>
          <th>expenseClaimItems</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {expenseclaimitemstatuss &&
          expenseclaimitemstatuss.length !== 0 &&
          expenseclaimitemstatuss.map(
            (expenseclaimitemstatus) =>
              expenseclaimitemstatus["@id"] && (
                <tr key={expenseclaimitemstatus["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          expenseclaimitemstatus["@id"],
                          "/expenseclaimitemstatuss/[id]"
                        ),
                        name: expenseclaimitemstatus["@id"],
                      }}
                    />
                  </th>
                  <td>{expenseclaimitemstatus["status"]}</td>
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
                  <td>
                    <Link
                      href={getPath(
                        expenseclaimitemstatus["@id"],
                        "/expenseclaimitemstatuss/[id]"
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
                        expenseclaimitemstatus["@id"],
                        "/expenseclaimitemstatuss/[id]/edit"
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
