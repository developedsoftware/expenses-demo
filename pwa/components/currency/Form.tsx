import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Currency } from "../../types/Currency";

interface Props {
  currency?: Currency;
}

interface SaveParams {
  values: Currency;
}

interface DeleteParams {
  id: string;
}

const saveCurrency = async ({ values }: SaveParams) =>
  await fetch<Currency>(!values["@id"] ? "/currencies" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteCurrency = async (id: string) =>
  await fetch<Currency>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ currency }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Currency> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveCurrency(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Currency> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteCurrency(id), {
    onSuccess: () => {
      router.push("/currencys");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!currency || !currency["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: currency["@id"] });
  };

  return (
    <div>
      <h1>
        {currency ? `Edit Currency ${currency["@id"]}` : `Create Currency`}
      </h1>
      <Formik
        initialValues={
          currency
            ? {
                ...currency,
              }
            : new Currency()
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
                router.push("/currencies");
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
              <label className="form-control-label" htmlFor="currency_code">
                code
              </label>
              <input
                name="code"
                id="currency_code"
                value={values.code ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.code && touched.code ? " is-invalid" : ""
                }`}
                aria-invalid={errors.code && touched.code ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="code"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="currency_name">
                name
              </label>
              <input
                name="name"
                id="currency_name"
                value={values.name ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.name && touched.name ? " is-invalid" : ""
                }`}
                aria-invalid={errors.name && touched.name ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="name"
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
      <Link href="/currencys">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {currency && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
