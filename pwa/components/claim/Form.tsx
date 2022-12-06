import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
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
              <label className="form-control-label" htmlFor="claim_patient">
                patient
              </label>
              <input
                name="patient"
                id="claim_patient"
                value={values.patient ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.patient && touched.patient ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.patient && touched.patient ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="patient"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="claim_study">
                study
              </label>
              <input
                name="study"
                id="claim_study"
                value={values.study ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.study && touched.study ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.study && touched.study ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="study"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="claim_site">
                site
              </label>
              <input
                name="site"
                id="claim_site"
                value={values.site ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.site && touched.site ? " is-invalid" : ""
                }`}
                aria-invalid={errors.site && touched.site ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="site"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="claim_claimStatus">
                claimStatus
              </label>
              <input
                name="claimStatus"
                id="claim_claimStatus"
                value={values.claimStatus ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.claimStatus && touched.claimStatus ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.claimStatus && touched.claimStatus ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="claimStatus"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="claim_claimReference"
              >
                claimReference
              </label>
              <input
                name="claimReference"
                id="claim_claimReference"
                value={values.claimReference ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.claimReference && touched.claimReference
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.claimReference && touched.claimReference
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="claimReference"
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
