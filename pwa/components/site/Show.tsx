import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getPath } from "../../utils/dataAccess";
import { Site } from "../../types/Site";

interface Props {
  site: Site;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ site, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!site["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(site["@id"], { method: "DELETE" });
      router.push("/sites");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show Site ${site["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show Site ${site["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">name</th>
            <td>{site["name"]}</td>
          </tr>
          <tr>
            <th scope="row">reference</th>
            <td>{site["reference"]}</td>
          </tr>
          <tr>
            <th scope="row">claims</th>
            <td>
              <ReferenceLinks
                items={site["claims"].map((ref: any) => ({
                  href: getPath(ref, "/claims/[id]"),
                  name: ref,
                }))}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/sites">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={getPath(site["@id"], "/sites/[id]/edit")}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
