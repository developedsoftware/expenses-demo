import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { ClaimStatus } from "../../types/ClaimStatus";

interface Props {
  claimstatus?: ClaimStatus;
}

interface SaveParams {
  values: ClaimStatus;
}

interface DeleteParams {
  id: string;
}

const saveClaimStatus = async ({ values }: SaveParams) =>
  await fetch<ClaimStatus>(!values["@id"] ? "/claim_statuses" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteClaimStatus = async (id: string) =>
  await fetch<ClaimStatus>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ claimstatus }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<ClaimStatus> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveClaimStatus(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<ClaimStatus> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteClaimStatus(id), {
    onSuccess: () => {
      router.push("/claimstatuss");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!claimstatus || !claimstatus["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: claimstatus["@id"] });
  };

  return (
    <div>
      <h1>
        {claimstatus
          ? `Edit ClaimStatus ${claimstatus["@id"]}`
          : `Create ClaimStatus`}
      </h1>
      <Formik
        initialValues={
          claimstatus
            ? {
                ...claimstatus,
              }
            : new ClaimStatus()
        }
        validate={() => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          saveMutation.mutate(
            { values },
            {
              onSuccess: () => {
                setStatus({
                  isValid: true,
                  msg: `Element ${isCreation ? "created" : "updated"}.`,
                });
                router.push("/claim_statuses");
              },
              onError: (error) => {
                setStatus({
                  isValid: false,
                  msg: `${error.message}`,
                });
                if ("fields" in error) {
                  setErrors(error.fields);
                }
              },
              onSettled: () => {
                setSubmitting(false);
              },
            }
          );
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-control-label" htmlFor="claimstatus_name">
                name
              </label>
              <input
                name="name"
                id="claimstatus_name"
                value={values.name ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.name && touched.name ? " is-invalid" : ""
                }`}
                aria-invalid={errors.name && touched.name ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="name"
              />
            </div>
            {status && status.msg && (
              <div
                className={`alert ${
                  status.isValid ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Link href="/claimstatuss">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {claimstatus && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
