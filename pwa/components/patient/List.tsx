import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { Patient } from "../../types/Patient";

interface Props {
  patients: Patient[];
}

export const List: FunctionComponent<Props> = ({ patients }) => (
  <div>
    <h1>Patient List</h1>
    <Link href="/patients/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>email</th>
          <th>password</th>
          <th>patientAddresses</th>
          <th>patientStripeAccount</th>
          <th>patientStudySiteVisits</th>
          <th>expenseClaims</th>
          <th>registrationId</th>
          <th>firstName</th>
          <th>lastName</th>
          <th>first_name</th>
          <th>last_name</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {patients &&
          patients.length !== 0 &&
          patients.map(
            (patient) =>
              patient["@id"] && (
                <tr key={patient["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(patient["@id"], "/patients/[id]"),
                        name: patient["@id"],
                      }}
                    />
                  </th>
                  <td>{patient["email"]}</td>
                  <td>{patient["password"]}</td>
                  <td>
                    <ReferenceLinks
                      items={patient["patientAddresses"].map((ref: any) => ({
                        href: getPath(ref, "/patientaddresss/[id]"),
                        name: ref,
                      }))}
                    />
                  </td>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          patient["patientStripeAccount"],
                          "/patientstripeaccounts/[id]"
                        ),
                        name: patient["patientStripeAccount"],
                      }}
                    />
                  </td>
                  <td>
                    <ReferenceLinks
                      items={patient["patientStudySiteVisits"].map(
                        (ref: any) => ({
                          href: getPath(ref, "/patientstudysitevisits/[id]"),
                          name: ref,
                        })
                      )}
                    />
                  </td>
                  <td>
                    <ReferenceLinks
                      items={patient["expenseClaims"].map((ref: any) => ({
                        href: getPath(ref, "/expenseclaims/[id]"),
                        name: ref,
                      }))}
                    />
                  </td>
                  <td>{patient["registrationId"]}</td>
                  <td>{patient["firstName"]}</td>
                  <td>{patient["lastName"]}</td>
                  <td>{patient["first_name"]}</td>
                  <td>{patient["last_name"]}</td>
                  <td>
                    <Link href={getPath(patient["@id"], "/patients/[id]")}>
                      <a>
                        <i className="bi bi-search" aria-hidden="true"></i>
                        <span className="sr-only">Show</span>
                      </a>
                    </Link>
                  </td>
                  <td>
                    <Link href={getPath(patient["@id"], "/patients/[id]/edit")}>
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
