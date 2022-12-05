import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Site } from "../../types/Site";

interface Props {
  site?: Site;
}

interface SaveParams {
  values: Site;
}

interface DeleteParams {
  id: string;
}

const saveSite = async ({ values }: SaveParams) =>
  await fetch<Site>(!values["@id"] ? "/sites" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteSite = async (id: string) =>
  await fetch<Site>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ site }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Site> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveSite(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Site> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteSite(id), {
    onSuccess: () => {
      router.push("/sites");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!site || !site["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: site["@id"] });
  };

  return (
    <div>
      <h1>{site ? `Edit Site ${site["@id"]}` : `Create Site`}</h1>
      <Formik
        initialValues={
          site
            ? {
                ...site,
              }
            : new Site()
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
                router.push("/sites");
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
              <label className="form-control-label" htmlFor="site_name">
                name
              </label>
              <input
                name="name"
                id="site_name"
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
              <div className="form-control-label">patientStudySiteVisits</div>
              <FieldArray
                name="patientStudySiteVisits"
                render={(arrayHelpers) => (
                  <div id="site_patientStudySiteVisits">
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
              <label
                className="form-control-label"
                htmlFor="site_siteReference"
              >
                siteReference
              </label>
              <input
                name="siteReference"
                id="site_siteReference"
                value={values.siteReference ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.siteReference && touched.siteReference
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.siteReference && touched.siteReference
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="siteReference"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="site_site_reference"
              >
                site_reference
              </label>
              <input
                name="site_reference"
                id="site_site_reference"
                value={values.site_reference ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.site_reference && touched.site_reference
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.site_reference && touched.site_reference
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="site_reference"
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
      <Link href="/sites">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {site && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
