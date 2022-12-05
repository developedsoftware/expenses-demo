import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { ExpenseClaimItem } from "../../types/ExpenseClaimItem";

interface Props {
  expenseclaimitems: ExpenseClaimItem[];
}

export const List: FunctionComponent<Props> = ({ expenseclaimitems }) => (
  <div>
    <h1>ExpenseClaimItem List</h1>
    <Link href="/expenseclaimitems/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>amount</th>
          <th>expenseClaimItemReceipts</th>
          <th>expenseClaimId</th>
          <th>expenseTypeId</th>
          <th>expenseCurrencyId</th>
          <th>additionalInfo</th>
          <th>expenseClaimItemStatusId</th>
          <th>additional_info</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {expenseclaimitems &&
          expenseclaimitems.length !== 0 &&
          expenseclaimitems.map(
            (expenseclaimitem) =>
              expenseclaimitem["@id"] && (
                <tr key={expenseclaimitem["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          expenseclaimitem["@id"],
                          "/expenseclaimitems/[id]"
                        ),
                        name: expenseclaimitem["@id"],
                      }}
                    />
                  </th>
                  <td>{expenseclaimitem["amount"]}</td>
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
                  <td>{expenseclaimitem["additionalInfo"]}</td>
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
                  <td>{expenseclaimitem["additional_info"]}</td>
                  <td>
                    <Link
                      href={getPath(
                        expenseclaimitem["@id"],
                        "/expenseclaimitems/[id]"
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
                        expenseclaimitem["@id"],
                        "/expenseclaimitems/[id]/edit"
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
