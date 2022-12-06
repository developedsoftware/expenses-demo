import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { Currency } from "../../types/Currency";

interface Props {
  currencys: Currency[];
}

export const List: FunctionComponent<Props> = ({ currencys }) => (
  <div>
    <h1>Currency List</h1>
    <Link href="/currencys/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>code</th>
          <th>name</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {currencys &&
          currencys.length !== 0 &&
          currencys.map(
            (currency) =>
              currency["@id"] && (
                <tr key={currency["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(currency["@id"], "/currencys/[id]"),
                        name: currency["@id"],
                      }}
                    />
                  </th>
                  <td>{currency["code"]}</td>
                  <td>{currency["name"]}</td>
                  <td>
                    <Link href={getPath(currency["@id"], "/currencys/[id]")}>
                      <a>
                        <i className="bi bi-search" aria-hidden="true"></i>
                        <span className="sr-only">Show</span>
                      </a>
                    </Link>
                  </td>
                  <td>
                    <Link
                      href={getPath(currency["@id"], "/currencys/[id]/edit")}
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
