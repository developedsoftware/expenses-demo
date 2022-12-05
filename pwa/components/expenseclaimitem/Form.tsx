import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { ExpenseClaimItem } from "../../types/ExpenseClaimItem";

interface Props {
  expenseclaimitem?: ExpenseClaimItem;
}

interface SaveParams {
  values: ExpenseClaimItem;
}

interface DeleteParams {
  id: string;
}

const saveExpenseClaimItem = async ({ values }: SaveParams) =>
  await fetch<ExpenseClaimItem>(
    !values["@id"] ? "/expense_claim_items" : values["@id"],
    {
      method: !values["@id"] ? "POST" : "PUT",
      body: JSON.stringify(values),
    }
  );

const deleteExpenseClaimItem = async (id: string) =>
  await fetch<ExpenseClaimItem>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ expenseclaimitem }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<ExpenseClaimItem> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveExpenseClaimItem(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<ExpenseClaimItem> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteExpenseClaimItem(id), {
    onSuccess: () => {
      router.push("/expenseclaimitems");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!expenseclaimitem || !expenseclaimitem["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: expenseclaimitem["@id"] });
  };

  return (
    <div>
      <h1>
        {expenseclaimitem
          ? `Edit ExpenseClaimItem ${expenseclaimitem["@id"]}`
          : `Create ExpenseClaimItem`}
      </h1>
      <Formik
        initialValues={
          expenseclaimitem
            ? {
                ...expenseclaimitem,
              }
            : new ExpenseClaimItem()
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
                router.push("/expense_claim_items");
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
                htmlFor="expenseclaimitem_amount"
              >
                amount
              </label>
              <input
                name="amount"
                id="expenseclaimitem_amount"
                value={values.amount ?? ""}
                type="number"
                placeholder=""
                className={`form-control${
                  errors.amount && touched.amount ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.amount && touched.amount ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="amount"
              />
            </div>
            <div className="form-group">
              <div className="form-control-label">expenseClaimItemReceipts</div>
              <FieldArray
                name="expenseClaimItemReceipts"
                render={(arrayHelpers) => (
                  <div id="expenseclaimitem_expenseClaimItemReceipts">
                    {values.expenseClaimItemReceipts &&
                    values.expenseClaimItemReceipts.length > 0 ? (
                      values.expenseClaimItemReceipts.map(
                        (item: any, index: number) => (
                          <div key={index}>
                            <Field name={`expenseClaimItemReceipts.${index}`} />
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
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="expenseclaimitem_expenseClaimId"
              >
                expenseClaimId
              </label>
              <input
                name="expenseClaimId"
                id="expenseclaimitem_expenseClaimId"
                value={values.expenseClaimId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.expenseClaimId && touched.expenseClaimId
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.expenseClaimId && touched.expenseClaimId
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="expenseClaimId"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="expenseclaimitem_expenseTypeId"
              >
                expenseTypeId
              </label>
              <input
                name="expenseTypeId"
                id="expenseclaimitem_expenseTypeId"
                value={values.expenseTypeId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.expenseTypeId && touched.expenseTypeId
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.expenseTypeId && touched.expenseTypeId
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="expenseTypeId"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="expenseclaimitem_expenseCurrencyId"
              >
                expenseCurrencyId
              </label>
              <input
                name="expenseCurrencyId"
                id="expenseclaimitem_expenseCurrencyId"
                value={values.expenseCurrencyId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.expenseCurrencyId && touched.expenseCurrencyId
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.expenseCurrencyId && touched.expenseCurrencyId
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="expenseCurrencyId"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="expenseclaimitem_additionalInfo"
              >
                additionalInfo
              </label>
              <input
                name="additionalInfo"
                id="expenseclaimitem_additionalInfo"
                value={values.additionalInfo ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.additionalInfo && touched.additionalInfo
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.additionalInfo && touched.additionalInfo
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="additionalInfo"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="expenseclaimitem_expenseClaimItemStatusId"
              >
                expenseClaimItemStatusId
              </label>
              <input
                name="expenseClaimItemStatusId"
                id="expenseclaimitem_expenseClaimItemStatusId"
                value={values.expenseClaimItemStatusId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.expenseClaimItemStatusId &&
                  touched.expenseClaimItemStatusId
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.expenseClaimItemStatusId &&
                  touched.expenseClaimItemStatusId
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="expenseClaimItemStatusId"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="expenseclaimitem_additional_info"
              >
                additional_info
              </label>
              <input
                name="additional_info"
                id="expenseclaimitem_additional_info"
                value={values.additional_info ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.additional_info && touched.additional_info
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.additional_info && touched.additional_info
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="additional_info"
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
      <Link href="/expenseclaimitems">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {expenseclaimitem && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
