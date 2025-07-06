// src/components/CreateSkillModal.jsx
import { useState } from "react";
import { createPortal } from "react-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

const CreateSkillModal = ({ onClose }) => {
  const initialValues = {
    code: "",
    title: "",
    subSkills: [
      {
        title: "",
        priority: "medium",
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .matches(/^C\d+$/, "Code must start with 'C' followed by a number (e.g. C1)")
      .required("Code is required"),
    title: Yup.string().required("Title is required"),
    subSkills: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required("SubSkill title is required"),
          priority: Yup.string()
            .oneOf(["low", "medium", "high"])
            .required("Priority is required"),
        })
      )
      .min(1, "At least one subskill is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post("http://localhost:7460/api/skills/create", values);
      toast.success("Skill created successfully!");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create skill");
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          &#x2715;
        </button>

        <h2 className="text-xl font-bold mb-4 text-blue-1">Create New Skill</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block font-medium">Code</label>
                <Field
                  name="code"
                  className="w-full border p-2 rounded"
                  placeholder="C1"
                />
                <ErrorMessage name="code" component="p" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block font-medium">Title</label>
                <Field
                  name="title"
                  className="w-full border p-2 rounded"
                  placeholder="Skill title"
                />
                <ErrorMessage name="title" component="p" className="text-red-500 text-sm" />
              </div>

              <FieldArray name="subSkills">
                {({ push, remove }) => (
                  <div className="space-y-1">
                    <h4 className="font-semibold">SubSkills</h4>
                    {values.subSkills.map((_, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="flex-1">
                          <label className="block text-sm">Title</label>
                          <Field
                            name={`subSkills[${index}].title`}
                            className="w-full border p-2 rounded"
                            placeholder="Subskill title"
                          />
                          <ErrorMessage
                            name={`subSkills[${index}].title`}
                            component="p"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="w-1/3">
                          <label className="block text-sm">Priority</label>
                          <Field
                            as="select"
                            name={`subSkills[${index}].priority`}
                            className="w-full border p-2 rounded"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </Field>
                        </div>

                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-600 mt-6 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ title: "", priority: "medium" })}
                      className="bg-blue-400 text-white px-4 rounded hover:bg-blue-500"
                    >
                      + Add SubSkill
                    </button>
                  </div>
                )}
              </FieldArray>

              <div className="text-right">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500"
                >
                  {isSubmitting ? "Submitting..." : "Create Skill"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>,
    document.body
  );
};

export default CreateSkillModal;
