import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { PatientStudySiteVisit } from "../../types/PatientStudySiteVisit";

interface Props {
  patientstudysitevisits: PatientStudySiteVisit[];
}

export const List: FunctionComponent<Props> = ({ patientstudysitevisits }) => (
  <div>
    <h1>PatientStudySiteVisit List</h1>
    <Link href="/patientstudysitevisits/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>expenseClaims</th>
          <th>patientId</th>
          <th>studyId</th>
          <th>siteId</th>
          <th>visitTimestamp</th>
          <th>visit_timestamp</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {patientstudysitevisits &&
          patientstudysitevisits.length !== 0 &&
          patientstudysitevisits.map(
            (patientstudysitevisit) =>
              patientstudysitevisit["@id"] && (
                <tr key={patientstudysitevisit["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          patientstudysitevisit["@id"],
                          "/patientstudysitevisits/[id]"
                        ),
                        name: patientstudysitevisit["@id"],
                      }}
                    />
                  </th>
                  <td>
                    <ReferenceLinks
                      items={patientstudysitevisit["expenseClaims"].map(
                        (ref: any) => ({
                          href: getPath(ref, "/expenseclaims/[id]"),
                          name: ref,
                        })
                      )}
                    />
                  </td>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          patientstudysitevisit["patientId"],
                          "/patients/[id]"
                        ),
                        name: patientstudysitevisit["patientId"],
                      }}
                    />
                  </td>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          patientstudysitevisit["studyId"],
                          "/studys/[id]"
                        ),
                        name: patientstudysitevisit["studyId"],
                      }}
                    />
                  </td>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          patientstudysitevisit["siteId"],
                          "/sites/[id]"
                        ),
                        name: patientstudysitevisit["siteId"],
                      }}
                    />
                  </td>
                  <td>
                    {patientstudysitevisit["visitTimestamp"]?.toLocaleString()}
                  </td>
                  <td>
                    {patientstudysitevisit["visit_timestamp"]?.toLocaleString()}
                  </td>
                  <td>
                    <Link
                      href={getPath(
                        patientstudysitevisit["@id"],
                        "/patientstudysitevisits/[id]"
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
                        patientstudysitevisit["@id"],
                        "/patientstudysitevisits/[id]/edit"
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
