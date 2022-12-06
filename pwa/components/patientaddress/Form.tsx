import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { PatientAddress } from "../../types/PatientAddress";

interface Props {
  patientaddress?: PatientAddress;
}

interface SaveParams {
  values: PatientAddress;
}

interface DeleteParams {
  id: string;
}

const savePatientAddress = async ({ values }: SaveParams) =>
  await fetch<PatientAddress>(
    !values["@id"] ? "/patient_addresses" : values["@id"],
    {
      method: !values["@id"] ? "POST" : "PUT",
      body: JSON.stringify(values),
    }
  );

const deletePatientAddress = async (id: string) =>
  await fetch<PatientAddress>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ patientaddress }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<PatientAddress> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => savePatientAddress(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<PatientAddress> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deletePatientAddress(id), {
    onSuccess: () => {
      router.push("/patientaddresss");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!patientaddress || !patientaddress["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: patientaddress["@id"] });
  };

  return (
    <div>
      <h1>
        {patientaddress
          ? `Edit PatientAddress ${patientaddress["@id"]}`
          : `Create PatientAddress`}
      </h1>
      <Formik
        initialValues={
          patientaddress
            ? {
                ...patientaddress,
              }
            : new PatientAddress()
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
                router.push("/patient_addresses");
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
                htmlFor="patientaddress_patientId"
              >
                patientId
              </label>
              <input
                name="patientId"
                id="patientaddress_patientId"
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
                htmlFor="patientaddress_line1"
              >
                line1
              </label>
              <input
                name="line1"
                id="patientaddress_line1"
                value={values.line1 ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.line1 && touched.line1 ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.line1 && touched.line1 ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="line1"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientaddress_line2"
              >
                line2
              </label>
              <input
                name="line2"
                id="patientaddress_line2"
                value={values.line2 ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.line2 && touched.line2 ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.line2 && touched.line2 ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="line2"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientaddress_line3"
              >
                line3
              </label>
              <input
                name="line3"
                id="patientaddress_line3"
                value={values.line3 ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.line3 && touched.line3 ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.line3 && touched.line3 ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="line3"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientaddress_areaCode"
              >
                areaCode
              </label>
              <input
                name="areaCode"
                id="patientaddress_areaCode"
                value={values.areaCode ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.areaCode && touched.areaCode ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.areaCode && touched.areaCode ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="areaCode"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientaddress_countryCode"
              >
                countryCode
              </label>
              <input
                name="countryCode"
                id="patientaddress_countryCode"
                value={values.countryCode ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.countryCode && touched.countryCode ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.countryCode && touched.countryCode ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="countryCode"
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
      <Link href="/patientaddresss">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {patientaddress && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
