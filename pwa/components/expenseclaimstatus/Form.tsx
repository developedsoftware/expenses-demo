import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { ExpenseClaimStatus } from "../../types/ExpenseClaimStatus";

interface Props {
  expenseclaimstatus?: ExpenseClaimStatus;
}

interface SaveParams {
  values: ExpenseClaimStatus;
}

interface DeleteParams {
  id: string;
}

const saveExpenseClaimStatus = async ({ values }: SaveParams) =>
  await fetch<ExpenseClaimStatus>(
    !values["@id"] ? "/expense_claim_statuses" : values["@id"],
    {
      method: !values["@id"] ? "POST" : "PUT",
      body: JSON.stringify(values),
    }
  );

const deleteExpenseClaimStatus = async (id: string) =>
  await fetch<ExpenseClaimStatus>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ expenseclaimstatus }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<ExpenseClaimStatus> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveExpenseClaimStatus(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<ExpenseClaimStatus> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteExpenseClaimStatus(id), {
    onSuccess: () => {
      router.push("/expenseclaimstatuss");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!expenseclaimstatus || !expenseclaimstatus["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: expenseclaimstatus["@id"] });
  };

  return (
    <div>
      <h1>
        {expenseclaimstatus
          ? `Edit ExpenseClaimStatus ${expenseclaimstatus["@id"]}`
          : `Create ExpenseClaimStatus`}
      </h1>
      <Formik
        initialValues={
          expenseclaimstatus
            ? {
                ...expenseclaimstatus,
              }
            : new ExpenseClaimStatus()
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
                router.push("/expense_claim_statuses");
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
                htmlFor="expenseclaimstatus_status"
              >
                status
              </label>
              <input
                name="status"
                id="expenseclaimstatus_status"
                value={values.status ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.status && touched.status ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.status && touched.status ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="status"
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
      <Link href="/expenseclaimstatuss">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {expenseclaimstatus && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
