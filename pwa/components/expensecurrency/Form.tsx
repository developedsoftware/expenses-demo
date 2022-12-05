import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { ExpenseCurrency } from "../../types/ExpenseCurrency";

interface Props {
  expensecurrency?: ExpenseCurrency;
}

interface SaveParams {
  values: ExpenseCurrency;
}

interface DeleteParams {
  id: string;
}

const saveExpenseCurrency = async ({ values }: SaveParams) =>
  await fetch<ExpenseCurrency>(
    !values["@id"] ? "/expense_currencies" : values["@id"],
    {
      method: !values["@id"] ? "POST" : "PUT",
      body: JSON.stringify(values),
    }
  );

const deleteExpenseCurrency = async (id: string) =>
  await fetch<ExpenseCurrency>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ expensecurrency }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<ExpenseCurrency> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveExpenseCurrency(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<ExpenseCurrency> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteExpenseCurrency(id), {
    onSuccess: () => {
      router.push("/expensecurrencys");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!expensecurrency || !expensecurrency["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: expensecurrency["@id"] });
  };

  return (
    <div>
      <h1>
        {expensecurrency
          ? `Edit ExpenseCurrency ${expensecurrency["@id"]}`
          : `Create ExpenseCurrency`}
      </h1>
      <Formik
        initialValues={
          expensecurrency
            ? {
                ...expensecurrency,
              }
            : new ExpenseCurrency()
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
                router.push("/expense_currencies");
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
                htmlFor="expensecurrency_currency"
              >
                currency
              </label>
              <input
                name="currency"
                id="expensecurrency_currency"
                value={values.currency ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.currency && touched.currency ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.currency && touched.currency ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="currency"
              />
            </div>
            <div className="form-group">
              <div className="form-control-label">expenseClaimItems</div>
              <FieldArray
                name="expenseClaimItems"
                render={(arrayHelpers) => (
                  <div id="expensecurrency_expenseClaimItems">
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
      <Link href="/expensecurrencys">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {expensecurrency && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
