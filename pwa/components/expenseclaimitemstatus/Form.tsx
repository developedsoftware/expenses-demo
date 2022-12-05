import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { ExpenseClaimItemStatus } from "../../types/ExpenseClaimItemStatus";

interface Props {
  expenseclaimitemstatus?: ExpenseClaimItemStatus;
}

interface SaveParams {
  values: ExpenseClaimItemStatus;
}

interface DeleteParams {
  id: string;
}

const saveExpenseClaimItemStatus = async ({ values }: SaveParams) =>
  await fetch<ExpenseClaimItemStatus>(
    !values["@id"] ? "/expense_claim_item_statuses" : values["@id"],
    {
      method: !values["@id"] ? "POST" : "PUT",
      body: JSON.stringify(values),
    }
  );

const deleteExpenseClaimItemStatus = async (id: string) =>
  await fetch<ExpenseClaimItemStatus>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ expenseclaimitemstatus }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<ExpenseClaimItemStatus> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveExpenseClaimItemStatus(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<ExpenseClaimItemStatus> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteExpenseClaimItemStatus(id), {
    onSuccess: () => {
      router.push("/expenseclaimitemstatuss");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!expenseclaimitemstatus || !expenseclaimitemstatus["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: expenseclaimitemstatus["@id"] });
  };

  return (
    <div>
      <h1>
        {expenseclaimitemstatus
          ? `Edit ExpenseClaimItemStatus ${expenseclaimitemstatus["@id"]}`
          : `Create ExpenseClaimItemStatus`}
      </h1>
      <Formik
        initialValues={
          expenseclaimitemstatus
            ? {
                ...expenseclaimitemstatus,
              }
            : new ExpenseClaimItemStatus()
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
                router.push("/expense_claim_item_statuses");
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
                htmlFor="expenseclaimitemstatus_status"
              >
                status
              </label>
              <input
                name="status"
                id="expenseclaimitemstatus_status"
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
            <div className="form-group">
              <div className="form-control-label">expenseClaimItems</div>
              <FieldArray
                name="expenseClaimItems"
                render={(arrayHelpers) => (
                  <div id="expenseclaimitemstatus_expenseClaimItems">
                    {values.expenseClaimItems &&
                    values.expenseClaimItems.length > 0 ? (
                      values.expenseClaimItems.map(
                        (item: any, index: number) => (
                          <div key={index}>
                            <Field name={`expenseClaimItems.${index}`} />
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => arrayHelpers.insert(index, "")}
                            >
                              +
                            </button>
                          </div>
                        )
                      )
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        Add
                      </button>
                    )}
                  </div>
                )}
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
      <Link href="/expenseclaimitemstatuss">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {expenseclaimitemstatus && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
