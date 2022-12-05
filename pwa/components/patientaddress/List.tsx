import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { PatientAddress } from "../../types/PatientAddress";

interface Props {
  patientaddresss: PatientAddress[];
}

export const List: FunctionComponent<Props> = ({ patientaddresss }) => (
  <div>
    <h1>PatientAddress List</h1>
    <Link href="/patientaddresss/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>patientId</th>
          <th>addressLine1</th>
          <th>addressLine2</th>
          <th>addressLine3</th>
          <th>addressLine4</th>
          <th>areaCode</th>
          <th>countryCode</th>
          <th>isPrimary</th>
          <th>address_line_1</th>
          <th>address_line_2</th>
          <th>address_line_3</th>
          <th>address_line_4</th>
          <th>area_code</th>
          <th>country_code</th>
          <th>is_primary</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {patientaddresss &&
          patientaddresss.length !== 0 &&
          patientaddresss.map(
            (patientaddress) =>
              patientaddress["@id"] && (
                <tr key={patientaddress["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          patientaddress["@id"],
                          "/patientaddresss/[id]"
                        ),
                        name: patientaddress["@id"],
                      }}
                    />
                  </th>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          patientaddress["patientId"],
                          "/patients/[id]"
                        ),
                        name: patientaddress["patientId"],
                      }}
                    />
                  </td>
                  <td>{patientaddress["addressLine1"]}</td>
                  <td>{patientaddress["addressLine2"]}</td>
                  <td>{patientaddress["addressLine3"]}</td>
                  <td>{patientaddress["addressLine4"]}</td>
                  <td>{patientaddress["areaCode"]}</td>
                  <td>{patientaddress["countryCode"]}</td>
                  <td>{patientaddress["isPrimary"]}</td>
                  <td>{patientaddress["address_line_1"]}</td>
                  <td>{patientaddress["address_line_2"]}</td>
                  <td>{patientaddress["address_line_3"]}</td>
                  <td>{patientaddress["address_line_4"]}</td>
                  <td>{patientaddress["area_code"]}</td>
                  <td>{patientaddress["country_code"]}</td>
                  <td>{patientaddress["is_primary"]}</td>
                  <td>
                    <Link
                      href={getPath(
                        patientaddress["@id"],
                        "/patientaddresss/[id]"
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
                        patientaddress["@id"],
                        "/patientaddresss/[id]/edit"
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
