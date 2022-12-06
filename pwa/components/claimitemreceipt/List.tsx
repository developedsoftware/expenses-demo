import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { ClaimItemReceipt } from "../../types/ClaimItemReceipt";

interface Props {
  claimitemreceipts: ClaimItemReceipt[];
}

export const List: FunctionComponent<Props> = ({ claimitemreceipts }) => (
  <div>
    <h1>ClaimItemReceipt List</h1>
    <Link href="/claimitemreceipts/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>claimItem</th>
          <th>data</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {claimitemreceipts &&
          claimitemreceipts.length !== 0 &&
          claimitemreceipts.map(
            (claimitemreceipt) =>
              claimitemreceipt["@id"] && (
                <tr key={claimitemreceipt["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          claimitemreceipt["@id"],
                          "/claimitemreceipts/[id]"
                        ),
                        name: claimitemreceipt["@id"],
                      }}
                    />
                  </th>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          claimitemreceipt["claimItem"],
                          "/claimitems/[id]"
                        ),
                        name: claimitemreceipt["claimItem"],
                      }}
                    />
                  </td>
                  <td>{claimitemreceipt["data"]}</td>
                  <td>
                    <Link
                      href={getPath(
                        claimitemreceipt["@id"],
                        "/claimitemreceipts/[id]"
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
                        claimitemreceipt["@id"],
                        "/claimitemreceipts/[id]/edit"
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
