import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { ClaimItemReceipt } from "../../types/ClaimItemReceipt";

interface Props {
  claimitemreceipt?: ClaimItemReceipt;
}

interface SaveParams {
  values: ClaimItemReceipt;
}

interface DeleteParams {
  id: string;
}

const saveClaimItemReceipt = async ({ values }: SaveParams) =>
  await fetch<ClaimItemReceipt>(
    !values["@id"] ? "/claim_item_receipts" : values["@id"],
    {
      method: !values["@id"] ? "POST" : "PUT",
      body: JSON.stringify(values),
    }
  );

const deleteClaimItemReceipt = async (id: string) =>
  await fetch<ClaimItemReceipt>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ claimitemreceipt }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<ClaimItemReceipt> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveClaimItemReceipt(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<ClaimItemReceipt> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteClaimItemReceipt(id), {
    onSuccess: () => {
      router.push("/claimitemreceipts");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!claimitemreceipt || !claimitemreceipt["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: claimitemreceipt["@id"] });
  };

  return (
    <div>
      <h1>
        {claimitemreceipt
          ? `Edit ClaimItemReceipt ${claimitemreceipt["@id"]}`
          : `Create ClaimItemReceipt`}
      </h1>
      <Formik
        initialValues={
          claimitemreceipt
            ? {
                ...claimitemreceipt,
              }
            : new ClaimItemReceipt()
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
                router.push("/claim_item_receipts");
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
              <label
                className="form-control-label"
                htmlFor="claimitemreceipt_claimItemId"
              >
                claimItemId
              </label>
              <input
                name="claimItemId"
                id="claimitemreceipt_claimItemId"
                value={values.claimItemId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.claimItemId && touched.claimItemId ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.claimItemId && touched.claimItemId ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="claimItemId"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="claimitemreceipt_data"
              >
                data
              </label>
              <input
                name="data"
                id="claimitemreceipt_data"
                value={values.data ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.data && touched.data ? " is-invalid" : ""
                }`}
                aria-invalid={errors.data && touched.data ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="data"
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
      <Link href="/claimitemreceipts">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {claimitemreceipt && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
