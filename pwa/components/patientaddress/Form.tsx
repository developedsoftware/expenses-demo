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
                htmlFor="patientaddress_addressLine1"
              >
                addressLine1
              </label>
              <input
                name="addressLine1"
                id="patientaddress_addressLine1"
                value={values.addressLine1 ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.addressLine1 && touched.addressLine1
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.addressLine1 && touched.addressLine1
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="addressLine1"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientaddress_addressLine2"
              >
                addressLine2
              </label>
              <input
                name="addressLine2"
                id="patientaddress_addressLine2"
                value={values.addressLine2 ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.addressLine2 && touched.addressLine2
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.addressLine2 && touched.addressLine2
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="addressLine2"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientaddress_addressLine3"
              >
                addressLine3
              </label>
              <input
                name="addressLine3"
                id="patientaddress_addressLine3"
                value={values.addressLine3 ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.addressLine3 && touched.addressLine3
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.addressLine3 && touched.addressLine3
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="addressLine3"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientaddress_addressLine4"
              >
                addressLine4
              </label>
              <input
                name="addressLine4"
                id="patientaddress_addressLine4"
                value={values.addressLine4 ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.addressLine4 && touched.addressLine4
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.addressLine4 && touched.addressLine4
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="addressLine4"
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
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientaddress_isPrimary"
              >
                isPrimary
              </label>
              <input
                name="isPrimary"
                id="patientaddress_isPrimary"
                value={values.isPrimary ?? ""}
                type="checkbox"
                placeholder=""
                className={`form-control${
                  errors.isPrimary && touched.isPrimary ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.isPrimary && touched.isPrimary ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="isPrimary"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientaddress_address_line_1"
              >
                address_line_1
              </label>
              <input
                name="address_line_1"
                id="patientaddress_address_line_1"
                value={values.address_line_1 ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.address_line_1 && touched.address_line_1
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.address_line_1 && touched.address_line_1
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="address_line_1"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientaddress_address_line_2"
              >
                address_line_2
              </label>
              <input
                name="address_line_2"
                id="patientaddress_address_line_2"
                value={values.address_line_2 ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.address_line_2 && touched.address_line_2
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.address_line_2 && touched.address_line_2
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="address_line_2"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientaddress_address_line_3"
              >
                address_line_3
              </label>
              <input
                name="address_line_3"
                id="patientaddress_address_line_3"
                value={values.address_line_3 ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.address_line_3 && touched.address_line_3
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.address_line_3 && touched.address_line_3
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="address_line_3"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientaddress_address_line_4"
              >
                address_line_4
              </label>
              <input
                name="address_line_4"
                id="patientaddress_address_line_4"
                value={values.address_line_4 ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.address_line_4 && touched.address_line_4
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.address_line_4 && touched.address_line_4
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="address_line_4"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientaddress_area_code"
              >
                area_code
              </label>
              <input
                name="area_code"
                id="patientaddress_area_code"
                value={values.area_code ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.area_code && touched.area_code ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.area_code && touched.area_code ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="area_code"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientaddress_country_code"
              >
                country_code
              </label>
              <input
                name="country_code"
                id="patientaddress_country_code"
                value={values.country_code ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.country_code && touched.country_code
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.country_code && touched.country_code
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="country_code"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientaddress_is_primary"
              >
                is_primary
              </label>
              <input
                name="is_primary"
                id="patientaddress_is_primary"
                value={values.is_primary ?? ""}
                type="checkbox"
                placeholder=""
                className={`form-control${
                  errors.is_primary && touched.is_primary ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.is_primary && touched.is_primary ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="is_primary"
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
