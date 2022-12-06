import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Claim } from "../../types/Claim";

interface Props {
  claim?: Claim;
}

interface SaveParams {
  values: Claim;
}

interface DeleteParams {
  id: string;
}

const saveClaim = async ({ values }: SaveParams) =>
  await fetch<Claim>(!values["@id"] ? "/claims" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteClaim = async (id: string) =>
  await fetch<Claim>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ claim }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Claim> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveClaim(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Claim> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteClaim(id), {
    onSuccess: () => {
      router.push("/claims");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!claim || !claim["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: claim["@id"] });
  };

  return (
    <div>
      <h1>{claim ? `Edit Claim ${claim["@id"]}` : `Create Claim`}</h1>
      <Formik
        initialValues={
          claim
            ? {
                ...claim,
              }
            : new Claim()
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
                router.push("/claims");
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
              <label className="form-control-label" htmlFor="claim_createdAt">
                createdAt
              </label>
              <input
                name="createdAt"
                id="claim_createdAt"
                value={values.createdAt?.toLocaleString() ?? ""}
                type="dateTime"
                placeholder=""
                className={`form-control${
                  errors.createdAt && touched.createdAt ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.createdAt && touched.createdAt ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="createdAt"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="claim_submittedAt">
                submittedAt
              </label>
              <input
                name="submittedAt"
                id="claim_submittedAt"
                value={values.submittedAt?.toLocaleString() ?? ""}
                type="dateTime"
                placeholder=""
                className={`form-control${
                  errors.submittedAt && touched.submittedAt ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.submittedAt && touched.submittedAt ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="submittedAt"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="claim_patientId">
                patientId
              </label>
              <input
                name="patientId"
                id="claim_patientId"
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
              <div className="form-control-label">studyId</div>
              <FieldArray
                name="studyId"
                render={(arrayHelpers) => (
                  <div id="claim_studyId">
                    {values.studyId && values.studyId.length > 0 ? (
                      values.studyId.map((item: any, index: number) => (
                        <div key={index}>
                          <Field name={`studyId.${index}`} />
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
                      ))
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
              <label className="form-control-label" htmlFor="claim_siteId">
                siteId
              </label>
              <input
                name="siteId"
                id="claim_siteId"
                value={values.siteId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.siteId && touched.siteId ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.siteId && touched.siteId ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="siteId"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="claim_claimStatusId"
              >
                claimStatusId
              </label>
              <input
                name="claimStatusId"
                id="claim_claimStatusId"
                value={values.claimStatusId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.claimStatusId && touched.claimStatusId
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.claimStatusId && touched.claimStatusId
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="claimStatusId"
              />
            </div>
            <div className="form-group">
              <div className="form-control-label">claimItems</div>
              <FieldArray
                name="claimItems"
                render={(arrayHelpers) => (
                  <div id="claim_claimItems">
                    {values.claimItems && values.claimItems.length > 0 ? (
                      values.claimItems.map((item: any, index: number) => (
                        <div key={index}>
                          <Field name={`claimItems.${index}`} />
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
                      ))
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
      <Link href="/claims">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {claim && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
