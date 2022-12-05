import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { PatientStripeAccount } from "../../types/PatientStripeAccount";

interface Props {
  patientstripeaccounts: PatientStripeAccount[];
}

export const List: FunctionComponent<Props> = ({ patientstripeaccounts }) => (
  <div>
    <h1>PatientStripeAccount List</h1>
    <Link href="/patientstripeaccounts/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>patientId</th>
          <th>stripeAccountUuid</th>
          <th>stripe_account_uuid</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {patientstripeaccounts &&
          patientstripeaccounts.length !== 0 &&
          patientstripeaccounts.map(
            (patientstripeaccount) =>
              patientstripeaccount["@id"] && (
                <tr key={patientstripeaccount["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          patientstripeaccount["@id"],
                          "/patientstripeaccounts/[id]"
                        ),
                        name: patientstripeaccount["@id"],
                      }}
                    />
                  </th>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          patientstripeaccount["patientId"],
                          "/patients/[id]"
                        ),
                        name: patientstripeaccount["patientId"],
                      }}
                    />
                  </td>
                  <td>{patientstripeaccount["stripeAccountUuid"]}</td>
                  <td>{patientstripeaccount["stripe_account_uuid"]}</td>
                  <td>
                    <Link
                      href={getPath(
                        patientstripeaccount["@id"],
                        "/patientstripeaccounts/[id]"
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
                        patientstripeaccount["@id"],
                        "/patientstripeaccounts/[id]/edit"
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
