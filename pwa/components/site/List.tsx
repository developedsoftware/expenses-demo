import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { Site } from "../../types/Site";

interface Props {
  sites: Site[];
}

export const List: FunctionComponent<Props> = ({ sites }) => (
  <div>
    <h1>Site List</h1>
    <Link href="/sites/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>reference</th>
          <th>claims</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {sites &&
          sites.length !== 0 &&
          sites.map(
            (site) =>
              site["@id"] && (
                <tr key={site["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(site["@id"], "/sites/[id]"),
                        name: site["@id"],
                      }}
                    />
                  </th>
                  <td>{site["name"]}</td>
                  <td>{site["reference"]}</td>
                  <td>
                    <ReferenceLinks
                      items={site["claims"].map((ref: any) => ({
                        href: getPath(ref, "/claims/[id]"),
                        name: ref,
                      }))}
                    />
                  </td>
                  <td>
                    <Link href={getPath(site["@id"], "/sites/[id]")}>
                      <a>
                        <i className="bi bi-search" aria-hidden="true"></i>
                        <span className="sr-only">Show</span>
                      </a>
                    </Link>
                  </td>
                  <td>
                    <Link href={getPath(site["@id"], "/sites/[id]/edit")}>
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
