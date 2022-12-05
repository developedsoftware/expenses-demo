import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { ExpenseClaimItemReceipt } from "../../types/ExpenseClaimItemReceipt";

interface Props {
  expenseclaimitemreceipt?: ExpenseClaimItemReceipt;
}

interface SaveParams {
  values: ExpenseClaimItemReceipt;
}

interface DeleteParams {
  id: string;
}

const saveExpenseClaimItemReceipt = async ({ values }: SaveParams) =>
  await fetch<ExpenseClaimItemReceipt>(
    !values["@id"] ? "/expense_claim_item_receipts" : values["@id"],
    {
      method: !values["@id"] ? "POST" : "PUT",
      body: JSON.stringify(values),
    }
  );

const deleteExpenseClaimItemReceipt = async (id: string) =>
  await fetch<ExpenseClaimItemReceipt>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ expenseclaimitemreceipt }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<ExpenseClaimItemReceipt> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveExpenseClaimItemReceipt(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<ExpenseClaimItemReceipt> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteExpenseClaimItemReceipt(id), {
    onSuccess: () => {
      router.push("/expenseclaimitemreceipts");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!expenseclaimitemreceipt || !expenseclaimitemreceipt["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: expenseclaimitemreceipt["@id"] });
  };

  return (
    <div>
      <h1>
        {expenseclaimitemreceipt
          ? `Edit ExpenseClaimItemReceipt ${expenseclaimitemreceipt["@id"]}`
          : `Create ExpenseClaimItemReceipt`}
      </h1>
      <Formik
        initialValues={
          expenseclaimitemreceipt
            ? {
                ...expenseclaimitemreceipt,
              }
            : new ExpenseClaimItemReceipt()
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
                router.push("/expense_claim_item_receipts");
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
                htmlFor="expenseclaimitemreceipt_data"
              >
                data
              </label>
              <input
                name="data"
                id="expenseclaimitemreceipt_data"
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
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="expenseclaimitemreceipt_expenseClaimItemId"
              >
                expenseClaimItemId
              </label>
              <input
                name="expenseClaimItemId"
                id="expenseclaimitemreceipt_expenseClaimItemId"
                value={values.expenseClaimItemId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.expenseClaimItemId && touched.expenseClaimItemId
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.expenseClaimItemId && touched.expenseClaimItemId
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="expenseClaimItemId"
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
      <Link href="/expenseclaimitemreceipts">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {expenseclaimitemreceipt && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
