import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { ExpenseClaim } from "../../types/ExpenseClaim";

interface Props {
  expenseclaims: ExpenseClaim[];
}

export const List: FunctionComponent<Props> = ({ expenseclaims }) => (
  <div>
    <h1>ExpenseClaim List</h1>
    <Link href="/expenseclaims/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>expenseClaimItems</th>
          <th>patientId</th>
          <th>patientStudySiteVisitId</th>
          <th>expenseClaimStatusId</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {expenseclaims &&
          expenseclaims.length !== 0 &&
          expenseclaims.map(
            (expenseclaim) =>
              expenseclaim["@id"] && (
                <tr key={expenseclaim["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          expenseclaim["@id"],
                          "/expenseclaims/[id]"
                        ),
                        name: expenseclaim["@id"],
                      }}
                    />
                  </th>
                  <td>
                    <ReferenceLinks
                      items={expenseclaim["expenseClaimItems"].map(
                        (ref: any) => ({
                          href: getPath(ref, "/expenseclaimitems/[id]"),
                          name: ref,
                        })
                      )}
                    />
                  </td>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          expenseclaim["patientId"],
                          "/patients/[id]"
                        ),
                        name: expenseclaim["patientId"],
                      }}
                    />
                  </td>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          expenseclaim["patientStudySiteVisitId"],
                          "/patientstudysitevisits/[id]"
                        ),
                        name: expenseclaim["patientStudySiteVisitId"],
                      }}
                    />
                  </td>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          expenseclaim["expenseClaimStatusId"],
                          "/expenseclaimstatuss/[id]"
                        ),
                        name: expenseclaim["expenseClaimStatusId"],
                      }}
                    />
                  </td>
                  <td>
                    <Link
                      href={getPath(expenseclaim["@id"], "/expenseclaims/[id]")}
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
                        expenseclaim["@id"],
                        "/expenseclaims/[id]/edit"
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
