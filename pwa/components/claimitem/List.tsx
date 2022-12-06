import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { ClaimItem } from "../../types/ClaimItem";

interface Props {
  claimitems: ClaimItem[];
}

export const List: FunctionComponent<Props> = ({ claimitems }) => (
  <div>
    <h1>ClaimItem List</h1>
    <Link href="/claimitems/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>claimId</th>
          <th>expenseTypeId</th>
          <th>currencyId</th>
          <th>amount</th>
          <th>additionalInfo</th>
          <th>claimTimestamp</th>
          <th>claimItemReceipts</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {claimitems &&
          claimitems.length !== 0 &&
          claimitems.map(
            (claimitem) =>
              claimitem["@id"] && (
                <tr key={claimitem["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(claimitem["@id"], "/claimitems/[id]"),
                        name: claimitem["@id"],
                      }}
                    />
                  </th>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(claimitem["claimId"], "/claims/[id]"),
                        name: claimitem["claimId"],
                      }}
                    />
                  </td>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          claimitem["expenseTypeId"],
                          "/expensetypes/[id]"
                        ),
                        name: claimitem["expenseTypeId"],
                      }}
                    />
                  </td>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          claimitem["currencyId"],
                          "/currencys/[id]"
                        ),
                        name: claimitem["currencyId"],
                      }}
                    />
                  </td>
                  <td>{claimitem["amount"]}</td>
                  <td>{claimitem["additionalInfo"]}</td>
                  <td>{claimitem["claimTimestamp"]?.toLocaleString()}</td>
                  <td>
                    <ReferenceLinks
                      items={claimitem["claimItemReceipts"].map((ref: any) => ({
                        href: getPath(ref, "/claimitemreceipts/[id]"),
                        name: ref,
                      }))}
                    />
                  </td>
                  <td>
                    <Link href={getPath(claimitem["@id"], "/claimitems/[id]")}>
                      <a>
                        <i className="bi bi-search" aria-hidden="true"></i>
                        <span className="sr-only">Show</span>
                      </a>
                    </Link>
                  </td>
                  <td>
                    <Link
                      href={getPath(claimitem["@id"], "/claimitems/[id]/edit")}
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
