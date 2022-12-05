import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { ExpenseType } from "../../types/ExpenseType";

interface Props {
  expensetype?: ExpenseType;
}

interface SaveParams {
  values: ExpenseType;
}

interface DeleteParams {
  id: string;
}

const saveExpenseType = async ({ values }: SaveParams) =>
  await fetch<ExpenseType>(!values["@id"] ? "/expense_types" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteExpenseType = async (id: string) =>
  await fetch<ExpenseType>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ expensetype }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<ExpenseType> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveExpenseType(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<ExpenseType> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteExpenseType(id), {
    onSuccess: () => {
      router.push("/expensetypes");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!expensetype || !expensetype["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: expensetype["@id"] });
  };

  return (
    <div>
      <h1>
        {expensetype
          ? `Edit ExpenseType ${expensetype["@id"]}`
          : `Create ExpenseType`}
      </h1>
      <Formik
        initialValues={
          expensetype
            ? {
                ...expensetype,
              }
            : new ExpenseType()
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
                router.push("/expense_types");
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
              <label className="form-control-label" htmlFor="expensetype_name">
                name
              </label>
              <input
                name="name"
                id="expensetype_name"
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
            <div className="form-group">
              <div className="form-control-label">expenseClaimItems</div>
              <FieldArray
                name="expenseClaimItems"
                render={(arrayHelpers) => (
                  <div id="expensetype_expenseClaimItems">
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
      <Link href="/expensetypes">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {expensetype && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
