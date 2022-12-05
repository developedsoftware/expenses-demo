import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { PatientStudySiteVisit } from "../../types/PatientStudySiteVisit";

interface Props {
  patientstudysitevisit?: PatientStudySiteVisit;
}

interface SaveParams {
  values: PatientStudySiteVisit;
}

interface DeleteParams {
  id: string;
}

const savePatientStudySiteVisit = async ({ values }: SaveParams) =>
  await fetch<PatientStudySiteVisit>(
    !values["@id"] ? "/patient_study_site_visits" : values["@id"],
    {
      method: !values["@id"] ? "POST" : "PUT",
      body: JSON.stringify(values),
    }
  );

const deletePatientStudySiteVisit = async (id: string) =>
  await fetch<PatientStudySiteVisit>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ patientstudysitevisit }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<PatientStudySiteVisit> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => savePatientStudySiteVisit(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<PatientStudySiteVisit> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deletePatientStudySiteVisit(id), {
    onSuccess: () => {
      router.push("/patientstudysitevisits");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!patientstudysitevisit || !patientstudysitevisit["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: patientstudysitevisit["@id"] });
  };

  return (
    <div>
      <h1>
        {patientstudysitevisit
          ? `Edit PatientStudySiteVisit ${patientstudysitevisit["@id"]}`
          : `Create PatientStudySiteVisit`}
      </h1>
      <Formik
        initialValues={
          patientstudysitevisit
            ? {
                ...patientstudysitevisit,
              }
            : new PatientStudySiteVisit()
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
                router.push("/patient_study_site_visits");
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
              <div className="form-control-label">expenseClaims</div>
              <FieldArray
                name="expenseClaims"
                render={(arrayHelpers) => (
                  <div id="patientstudysitevisit_expenseClaims">
                    {values.expenseClaims && values.expenseClaims.length > 0 ? (
                      values.expenseClaims.map((item: any, index: number) => (
                        <div key={index}>
                          <Field name={`expenseClaims.${index}`} />
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
              <label
                className="form-control-label"
                htmlFor="patientstudysitevisit_patientId"
              >
                patientId
              </label>
              <input
                name="patientId"
                id="patientstudysitevisit_patientId"
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
                htmlFor="patientstudysitevisit_studyId"
              >
                studyId
              </label>
              <input
                name="studyId"
                id="patientstudysitevisit_studyId"
                value={values.studyId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.studyId && touched.studyId ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.studyId && touched.studyId ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="studyId"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientstudysitevisit_siteId"
              >
                siteId
              </label>
              <input
                name="siteId"
                id="patientstudysitevisit_siteId"
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
                htmlFor="patientstudysitevisit_visitTimestamp"
              >
                visitTimestamp
              </label>
              <input
                name="visitTimestamp"
                id="patientstudysitevisit_visitTimestamp"
                value={values.visitTimestamp?.toLocaleString() ?? ""}
                type="dateTime"
                placeholder=""
                className={`form-control${
                  errors.visitTimestamp && touched.visitTimestamp
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.visitTimestamp && touched.visitTimestamp
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="visitTimestamp"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientstudysitevisit_visit_timestamp"
              >
                visit_timestamp
              </label>
              <input
                name="visit_timestamp"
                id="patientstudysitevisit_visit_timestamp"
                value={values.visit_timestamp?.toLocaleString() ?? ""}
                type="dateTime"
                placeholder=""
                className={`form-control${
                  errors.visit_timestamp && touched.visit_timestamp
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.visit_timestamp && touched.visit_timestamp
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="visit_timestamp"
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
      <Link href="/patientstudysitevisits">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {patientstudysitevisit && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
