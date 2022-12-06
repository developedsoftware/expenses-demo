import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { PatientPaymentGateway } from "../../types/PatientPaymentGateway";

interface Props {
  patientpaymentgateway?: PatientPaymentGateway;
}

interface SaveParams {
  values: PatientPaymentGateway;
}

interface DeleteParams {
  id: string;
}

const savePatientPaymentGateway = async ({ values }: SaveParams) =>
  await fetch<PatientPaymentGateway>(
    !values["@id"] ? "/patient_payment_gateways" : values["@id"],
    {
      method: !values["@id"] ? "POST" : "PUT",
      body: JSON.stringify(values),
    }
  );

const deletePatientPaymentGateway = async (id: string) =>
  await fetch<PatientPaymentGateway>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ patientpaymentgateway }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<PatientPaymentGateway> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => savePatientPaymentGateway(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<PatientPaymentGateway> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deletePatientPaymentGateway(id), {
    onSuccess: () => {
      router.push("/patientpaymentgateways");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!patientpaymentgateway || !patientpaymentgateway["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: patientpaymentgateway["@id"] });
  };

  return (
    <div>
      <h1>
        {patientpaymentgateway
          ? `Edit PatientPaymentGateway ${patientpaymentgateway["@id"]}`
          : `Create PatientPaymentGateway`}
      </h1>
      <Formik
        initialValues={
          patientpaymentgateway
            ? {
                ...patientpaymentgateway,
              }
            : new PatientPaymentGateway()
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
                router.push("/patient_payment_gateways");
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
                htmlFor="patientpaymentgateway_patient"
              >
                patient
              </label>
              <input
                name="patient"
                id="patientpaymentgateway_patient"
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
              <label
                className="form-control-label"
                htmlFor="patientpaymentgateway_data"
              >
                data
              </label>
              <input
                name="data"
                id="patientpaymentgateway_data"
                value={values.data ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.data && touched.data ? " is-invalid" : ""
                }`}
                aria-invalid={errors.data && touched.data ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="data"
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
      <Link href="/patientpaymentgateways">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {patientpaymentgateway && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
