import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { ClaimStatus } from "../../types/ClaimStatus";

interface Props {
  claimstatuss: ClaimStatus[];
}

export const List: FunctionComponent<Props> = ({ claimstatuss }) => (
  <div>
    <h1>ClaimStatus List</h1>
    <Link href="/claimstatuss/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {claimstatuss &&
          claimstatuss.length !== 0 &&
          claimstatuss.map(
            (claimstatus) =>
              claimstatus["@id"] && (
                <tr key={claimstatus["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(claimstatus["@id"], "/claimstatuss/[id]"),
                        name: claimstatus["@id"],
                      }}
                    />
                  </th>
                  <td>{claimstatus["name"]}</td>
                  <td>
                    <Link
                      href={getPath(claimstatus["@id"], "/claimstatuss/[id]")}
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
                        claimstatus["@id"],
                        "/claimstatuss/[id]/edit"
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
