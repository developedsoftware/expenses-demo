import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { Claim } from "../../types/Claim";

interface Props {
  claims: Claim[];
}

export const List: FunctionComponent<Props> = ({ claims }) => (
  <div>
    <h1>Claim List</h1>
    <Link href="/claims/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>createdAt</th>
          <th>submittedAt</th>
          <th>patient</th>
          <th>study</th>
          <th>site</th>
          <th>claimStatus</th>
          <th>claimReference</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {claims &&
          claims.length !== 0 &&
          claims.map(
            (claim) =>
              claim["@id"] && (
                <tr key={claim["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(claim["@id"], "/claims/[id]"),
                        name: claim["@id"],
                      }}
                    />
                  </th>
                  <td>{claim["createdAt"]?.toLocaleString()}</td>
                  <td>{claim["submittedAt"]?.toLocaleString()}</td>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(claim["patient"], "/patients/[id]"),
                        name: claim["patient"],
                      }}
                    />
                  </td>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(claim["study"], "/studys/[id]"),
                        name: claim["study"],
                      }}
                    />
                  </td>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(claim["site"], "/sites/[id]"),
                        name: claim["site"],
                      }}
                    />
                  </td>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          claim["claimStatus"],
                          "/claimstatuss/[id]"
                        ),
                        name: claim["claimStatus"],
                      }}
                    />
                  </td>
                  <td>{claim["claimReference"]}</td>
                  <td>
                    <Link href={getPath(claim["@id"], "/claims/[id]")}>
                      <a>
                        <i className="bi bi-search" aria-hidden="true"></i>
                        <span className="sr-only">Show</span>
                      </a>
                    </Link>
                  </td>
                  <td>
                    <Link href={getPath(claim["@id"], "/claims/[id]/edit")}>
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
