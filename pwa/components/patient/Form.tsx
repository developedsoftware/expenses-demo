import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Patient } from "../../types/Patient";

interface Props {
  patient?: Patient;
}

interface SaveParams {
  values: Patient;
}

interface DeleteParams {
  id: string;
}

const savePatient = async ({ values }: SaveParams) =>
  await fetch<Patient>(!values["@id"] ? "/patients" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deletePatient = async (id: string) =>
  await fetch<Patient>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ patient }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Patient> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => savePatient(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Patient> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deletePatient(id), {
    onSuccess: () => {
      router.push("/patients");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!patient || !patient["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: patient["@id"] });
  };

  return (
    <div>
      <h1>{patient ? `Edit Patient ${patient["@id"]}` : `Create Patient`}</h1>
      <Formik
        initialValues={
          patient
            ? {
                ...patient,
              }
            : new Patient()
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
                router.push("/patients");
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
              <label className="form-control-label" htmlFor="patient_email">
                email
              </label>
              <input
                name="email"
                id="patient_email"
                value={values.email ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.email && touched.email ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.email && touched.email ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="email"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="patient_password">
                password
              </label>
              <input
                name="password"
                id="patient_password"
                value={values.password ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.password && touched.password ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.password && touched.password ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="password"
              />
            </div>
            <div className="form-group">
              <div className="form-control-label">patientAddresses</div>
              <FieldArray
                name="patientAddresses"
                render={(arrayHelpers) => (
                  <div id="patient_patientAddresses">
                    {values.patientAddresses &&
                    values.patientAddresses.length > 0 ? (
                      values.patientAddresses.map(
                        (item: any, index: number) => (
                          <div key={index}>
                            <Field name={`patientAddresses.${index}`} />
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
                htmlFor="patient_patientStripeAccount"
              >
                patientStripeAccount
              </label>
              <input
                name="patientStripeAccount"
                id="patient_patientStripeAccount"
                value={values.patientStripeAccount ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.patientStripeAccount && touched.patientStripeAccount
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.patientStripeAccount && touched.patientStripeAccount
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="patientStripeAccount"
              />
            </div>
            <div className="form-group">
              <div className="form-control-label">patientStudySiteVisits</div>
              <FieldArray
                name="patientStudySiteVisits"
                render={(arrayHelpers) => (
                  <div id="patient_patientStudySiteVisits">
                    {values.patientStudySiteVisits &&
                    values.patientStudySiteVisits.length > 0 ? (
                      values.patientStudySiteVisits.map(
                        (item: any, index: number) => (
                          <div key={index}>
                            <Field name={`patientStudySiteVisits.${index}`} />
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
              <div className="form-control-label">expenseClaims</div>
              <FieldArray
                name="expenseClaims"
                render={(arrayHelpers) => (
                  <div id="patient_expenseClaims">
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
                htmlFor="patient_registrationId"
              >
                registrationId
              </label>
              <input
                name="registrationId"
                id="patient_registrationId"
                value={values.registrationId ?? ""}
                type="number"
                placeholder=""
                className={`form-control${
                  errors.registrationId && touched.registrationId
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.registrationId && touched.registrationId
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="registrationId"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="patient_firstName">
                firstName
              </label>
              <input
                name="firstName"
                id="patient_firstName"
                value={values.firstName ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.firstName && touched.firstName ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.firstName && touched.firstName ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="firstName"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="patient_lastName">
                lastName
              </label>
              <input
                name="lastName"
                id="patient_lastName"
                value={values.lastName ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.lastName && touched.lastName ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.lastName && touched.lastName ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="lastName"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patient_first_name"
              >
                first_name
              </label>
              <input
                name="first_name"
                id="patient_first_name"
                value={values.first_name ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.first_name && touched.first_name ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.first_name && touched.first_name ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="first_name"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="patient_last_name">
                last_name
              </label>
              <input
                name="last_name"
                id="patient_last_name"
                value={values.last_name ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.last_name && touched.last_name ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.last_name && touched.last_name ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="last_name"
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
      <Link href="/patients">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {patient && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
