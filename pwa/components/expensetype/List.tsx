import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { ExpenseType } from "../../types/ExpenseType";

interface Props {
  expensetypes: ExpenseType[];
}

export const List: FunctionComponent<Props> = ({ expensetypes }) => (
  <div>
    <h1>ExpenseType List</h1>
    <Link href="/expensetypes/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>expenseClaimItems</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {expensetypes &&
          expensetypes.length !== 0 &&
          expensetypes.map(
            (expensetype) =>
              expensetype["@id"] && (
                <tr key={expensetype["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(expensetype["@id"], "/expensetypes/[id]"),
                        name: expensetype["@id"],
                      }}
                    />
                  </th>
                  <td>{expensetype["name"]}</td>
                  <td>
                    <ReferenceLinks
                      items={expensetype["expenseClaimItems"].map(
                        (ref: any) => ({
                          href: getPath(ref, "/expenseclaimitems/[id]"),
                          name: ref,
                        })
                      )}
                    />
                  </td>
                  <td>
                    <Link
                      href={getPath(expensetype["@id"], "/expensetypes/[id]")}
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
                        expensetype["@id"],
                        "/expensetypes/[id]/edit"
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
