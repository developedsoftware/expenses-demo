import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { PatientStripeAccount } from "../../types/PatientStripeAccount";

interface Props {
  patientstripeaccount?: PatientStripeAccount;
}

interface SaveParams {
  values: PatientStripeAccount;
}

interface DeleteParams {
  id: string;
}

const savePatientStripeAccount = async ({ values }: SaveParams) =>
  await fetch<PatientStripeAccount>(
    !values["@id"] ? "/patient_stripe_accounts" : values["@id"],
    {
      method: !values["@id"] ? "POST" : "PUT",
      body: JSON.stringify(values),
    }
  );

const deletePatientStripeAccount = async (id: string) =>
  await fetch<PatientStripeAccount>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ patientstripeaccount }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<PatientStripeAccount> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => savePatientStripeAccount(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<PatientStripeAccount> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deletePatientStripeAccount(id), {
    onSuccess: () => {
      router.push("/patientstripeaccounts");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!patientstripeaccount || !patientstripeaccount["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: patientstripeaccount["@id"] });
  };

  return (
    <div>
      <h1>
        {patientstripeaccount
          ? `Edit PatientStripeAccount ${patientstripeaccount["@id"]}`
          : `Create PatientStripeAccount`}
      </h1>
      <Formik
        initialValues={
          patientstripeaccount
            ? {
                ...patientstripeaccount,
              }
            : new PatientStripeAccount()
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
                router.push("/patient_stripe_accounts");
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
                htmlFor="patientstripeaccount_patientId"
              >
                patientId
              </label>
              <input
                name="patientId"
                id="patientstripeaccount_patientId"
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
                htmlFor="patientstripeaccount_stripeAccountUuid"
              >
                stripeAccountUuid
              </label>
              <input
                name="stripeAccountUuid"
                id="patientstripeaccount_stripeAccountUuid"
                value={values.stripeAccountUuid ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.stripeAccountUuid && touched.stripeAccountUuid
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.stripeAccountUuid && touched.stripeAccountUuid
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="stripeAccountUuid"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="patientstripeaccount_stripe_account_uuid"
              >
                stripe_account_uuid
              </label>
              <input
                name="stripe_account_uuid"
                id="patientstripeaccount_stripe_account_uuid"
                value={values.stripe_account_uuid ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.stripe_account_uuid && touched.stripe_account_uuid
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.stripe_account_uuid && touched.stripe_account_uuid
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="stripe_account_uuid"
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
      <Link href="/patientstripeaccounts">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {patientstripeaccount && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
