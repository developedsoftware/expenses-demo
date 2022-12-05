import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { ExpenseCurrency } from "../../types/ExpenseCurrency";

interface Props {
  expensecurrencys: ExpenseCurrency[];
}

export const List: FunctionComponent<Props> = ({ expensecurrencys }) => (
  <div>
    <h1>ExpenseCurrency List</h1>
    <Link href="/expensecurrencys/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>currency</th>
          <th>expenseClaimItems</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {expensecurrencys &&
          expensecurrencys.length !== 0 &&
          expensecurrencys.map(
            (expensecurrency) =>
              expensecurrency["@id"] && (
                <tr key={expensecurrency["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          expensecurrency["@id"],
                          "/expensecurrencys/[id]"
                        ),
                        name: expensecurrency["@id"],
                      }}
                    />
                  </th>
                  <td>{expensecurrency["currency"]}</td>
                  <td>
                    <ReferenceLinks
                      items={expensecurrency["expenseClaimItems"].map(
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
                        expensecurrency["@id"],
                        "/expensecurrencys/[id]"
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
                        expensecurrency["@id"],
                        "/expensecurrencys/[id]/edit"
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
