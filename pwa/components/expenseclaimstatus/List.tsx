import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { ExpenseClaimStatus } from "../../types/ExpenseClaimStatus";

interface Props {
  expenseclaimstatuss: ExpenseClaimStatus[];
}

export const List: FunctionComponent<Props> = ({ expenseclaimstatuss }) => (
  <div>
    <h1>ExpenseClaimStatus List</h1>
    <Link href="/expenseclaimstatuss/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>status</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {expenseclaimstatuss &&
          expenseclaimstatuss.length !== 0 &&
          expenseclaimstatuss.map(
            (expenseclaimstatus) =>
              expenseclaimstatus["@id"] && (
                <tr key={expenseclaimstatus["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          expenseclaimstatus["@id"],
                          "/expenseclaimstatuss/[id]"
                        ),
                        name: expenseclaimstatus["@id"],
                      }}
                    />
                  </th>
                  <td>{expenseclaimstatus["status"]}</td>
                  <td>
                    <Link
                      href={getPath(
                        expenseclaimstatus["@id"],
                        "/expenseclaimstatuss/[id]"
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
                        expenseclaimstatus["@id"],
                        "/expenseclaimstatuss/[id]/edit"
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
