import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { ClaimItem } from "../../types/ClaimItem";

interface Props {
  claimitem?: ClaimItem;
}

interface SaveParams {
  values: ClaimItem;
}

interface DeleteParams {
  id: string;
}

const saveClaimItem = async ({ values }: SaveParams) =>
  await fetch<ClaimItem>(!values["@id"] ? "/claim_items" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteClaimItem = async (id: string) =>
  await fetch<ClaimItem>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ claimitem }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<ClaimItem> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveClaimItem(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<ClaimItem> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteClaimItem(id), {
    onSuccess: () => {
      router.push("/claimitems");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!claimitem || !claimitem["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: claimitem["@id"] });
  };

  return (
    <div>
      <h1>
        {claimitem ? `Edit ClaimItem ${claimitem["@id"]}` : `Create ClaimItem`}
      </h1>
      <Formik
        initialValues={
          claimitem
            ? {
                ...claimitem,
              }
            : new ClaimItem()
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
                router.push("/claim_items");
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
              <label className="form-control-label" htmlFor="claimitem_claimId">
                claimId
              </label>
              <input
                name="claimId"
                id="claimitem_claimId"
                value={values.claimId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.claimId && touched.claimId ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.claimId && touched.claimId ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="claimId"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="claimitem_expenseTypeId"
              >
                expenseTypeId
              </label>
              <input
                name="expenseTypeId"
                id="claimitem_expenseTypeId"
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
                htmlFor="claimitem_currencyId"
              >
                currencyId
              </label>
              <input
                name="currencyId"
                id="claimitem_currencyId"
                value={values.currencyId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.currencyId && touched.currencyId ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.currencyId && touched.currencyId ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="currencyId"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="claimitem_amount">
                amount
              </label>
              <input
                name="amount"
                id="claimitem_amount"
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
              <label
                className="form-control-label"
                htmlFor="claimitem_additionalInfo"
              >
                additionalInfo
              </label>
              <input
                name="additionalInfo"
                id="claimitem_additionalInfo"
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
                htmlFor="claimitem_claimTimestamp"
              >
                claimTimestamp
              </label>
              <input
                name="claimTimestamp"
                id="claimitem_claimTimestamp"
                value={values.claimTimestamp?.toLocaleString() ?? ""}
                type="dateTime"
                placeholder=""
                className={`form-control${
                  errors.claimTimestamp && touched.claimTimestamp
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.claimTimestamp && touched.claimTimestamp
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="claimTimestamp"
              />
            </div>
            <div className="form-group">
              <div className="form-control-label">claimItemReceipts</div>
              <FieldArray
                name="claimItemReceipts"
                render={(arrayHelpers) => (
                  <div id="claimitem_claimItemReceipts">
                    {values.claimItemReceipts &&
                    values.claimItemReceipts.length > 0 ? (
                      values.claimItemReceipts.map(
                        (item: any, index: number) => (
                          <div key={index}>
                            <Field name={`claimItemReceipts.${index}`} />
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
      <Link href="/claimitems">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {claimitem && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};