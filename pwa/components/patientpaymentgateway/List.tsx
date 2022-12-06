import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { PatientPaymentGateway } from "../../types/PatientPaymentGateway";

interface Props {
  patientpaymentgateways: PatientPaymentGateway[];
}

export const List: FunctionComponent<Props> = ({ patientpaymentgateways }) => (
  <div>
    <h1>PatientPaymentGateway List</h1>
    <Link href="/patientpaymentgateways/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>patientId</th>
          <th>data</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {patientpaymentgateways &&
          patientpaymentgateways.length !== 0 &&
          patientpaymentgateways.map(
            (patientpaymentgateway) =>
              patientpaymentgateway["@id"] && (
                <tr key={patientpaymentgateway["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          patientpaymentgateway["@id"],
                          "/patientpaymentgateways/[id]"
                        ),
                        name: patientpaymentgateway["@id"],
                      }}
                    />
                  </th>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          patientpaymentgateway["patientId"],
                          "/patients/[id]"
                        ),
                        name: patientpaymentgateway["patientId"],
                      }}
                    />
                  </td>
                  <td>{patientpaymentgateway["data"]}</td>
                  <td>
                    <Link
                      href={getPath(
                        patientpaymentgateway["@id"],
                        "/patientpaymentgateways/[id]"
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
                        patientpaymentgateway["@id"],
                        "/patientpaymentgateways/[id]/edit"
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
