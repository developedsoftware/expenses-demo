import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Study } from "../../types/Study";

interface Props {
  study?: Study;
}

interface SaveParams {
  values: Study;
}

interface DeleteParams {
  id: string;
}

const saveStudy = async ({ values }: SaveParams) =>
  await fetch<Study>(!values["@id"] ? "/studies" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteStudy = async (id: string) =>
  await fetch<Study>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ study }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Study> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveStudy(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Study> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteStudy(id), {
    onSuccess: () => {
      router.push("/studys");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!study || !study["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: study["@id"] });
  };

  return (
    <div>
      <h1>{study ? `Edit Study ${study["@id"]}` : `Create Study`}</h1>
      <Formik
        initialValues={
          study
            ? {
                ...study,
              }
            : new Study()
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
                router.push("/studies");
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
              <label className="form-control-label" htmlFor="study_name">
                name
              </label>
              <input
                name="name"
                id="study_name"
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
            <div className="form-group">
              <label className="form-control-label" htmlFor="study_reference">
                reference
              </label>
              <input
                name="reference"
                id="study_reference"
                value={values.reference ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.reference && touched.reference ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.reference && touched.reference ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="reference"
              />
            </div>
            <div className="form-group">
              <div className="form-control-label">claims</div>
              <FieldArray
                name="claims"
                render={(arrayHelpers) => (
                  <div id="study_claims">
                    {values.claims && values.claims.length > 0 ? (
                      values.claims.map((item: any, index: number) => (
                        <div key={index}>
                          <Field name={`claims.${index}`} />
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
      <Link href="/studys">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {study && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
