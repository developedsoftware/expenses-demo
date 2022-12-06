import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getPath } from "../../utils/dataAccess";
import { Claim } from "../../types/Claim";

interface Props {
  claim: Claim;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ claim, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!claim["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(claim["@id"], { method: "DELETE" });
      router.push("/claims");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show Claim ${claim["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show Claim ${claim["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">createdAt</th>
            <td>{claim["createdAt"]?.toLocaleString()}</td>
          </tr>
          <tr>
            <th scope="row">submittedAt</th>
            <td>{claim["submittedAt"]?.toLocaleString()}</td>
          </tr>
          <tr>
            <th scope="row">patient</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(claim["patient"], "/patients/[id]"),
                  name: claim["patient"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">study</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(claim["study"], "/studys/[id]"),
                  name: claim["study"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">site</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(claim["site"], "/sites/[id]"),
                  name: claim["site"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">claimStatus</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(claim["claimStatus"], "/claimstatuss/[id]"),
                  name: claim["claimStatus"],
                }}
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
      <Link href="/claims">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={getPath(claim["@id"], "/claims/[id]/edit")}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
