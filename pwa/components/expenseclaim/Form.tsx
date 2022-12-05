import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { ExpenseClaim } from "../../types/ExpenseClaim";

interface Props {
  expenseclaim?: ExpenseClaim;
}

interface SaveParams {
  values: ExpenseClaim;
}

interface DeleteParams {
  id: string;
}

const saveExpenseClaim = async ({ values }: SaveParams) =>
  await fetch<ExpenseClaim>(
    !values["@id"] ? "/expense_claims" : values["@id"],
    {
      method: !values["@id"] ? "POST" : "PUT",
      body: JSON.stringify(values),
    }
  );

const deleteExpenseClaim = async (id: string) =>
  await fetch<ExpenseClaim>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ expenseclaim }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<ExpenseClaim> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveExpenseClaim(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<ExpenseClaim> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteExpenseClaim(id), {
    onSuccess: () => {
      router.push("/expenseclaims");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!expenseclaim || !expenseclaim["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: expenseclaim["@id"] });
  };

  return (
    <div>
      <h1>
        {expenseclaim
          ? `Edit ExpenseClaim ${expenseclaim["@id"]}`
          : `Create ExpenseClaim`}
      </h1>
      <Formik
        initialValues={
          expenseclaim
            ? {
                ...expenseclaim,
              }
            : new ExpenseClaim()
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
                router.push("/expense_claims");
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
              <div className="form-control-label">expenseClaimItems</div>
              <FieldArray
                name="expenseClaimItems"
                render={(arrayHelpers) => (
                  <div id="expenseclaim_expenseClaimItems">
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
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="expenseclaim_patientId"
              >
                patientId
              </label>
              <input
                name="patientId"
                id="expenseclaim_patientId"
                value={values.patientId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.patientId && touched.patientId ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.patientId && touched.patientId ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="patientId"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="expenseclaim_patientStudySiteVisitId"
              >
                patientStudySiteVisitId
              </label>
              <input
                name="patientStudySiteVisitId"
                id="expenseclaim_patientStudySiteVisitId"
                value={values.patientStudySiteVisitId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.patientStudySiteVisitId &&
                  touched.patientStudySiteVisitId
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.patientStudySiteVisitId &&
                  touched.patientStudySiteVisitId
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="patientStudySiteVisitId"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="expenseclaim_expenseClaimStatusId"
              >
                expenseClaimStatusId
              </label>
              <input
                name="expenseClaimStatusId"
                id="expenseclaim_expenseClaimStatusId"
                value={values.expenseClaimStatusId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.expenseClaimStatusId && touched.expenseClaimStatusId
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.expenseClaimStatusId && touched.expenseClaimStatusId
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="expenseClaimStatusId"
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
      <Link href="/expenseclaims">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {expenseclaim && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
