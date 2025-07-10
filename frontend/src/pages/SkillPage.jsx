import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CreateSkillModal from "../components/CreateSkillModal";

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchSkills = async () => {
    try {
      const res = await axios.get("http://localhost:7460/api/skills");
      setSkills(res.data.skills);
    } catch (err) {
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const updateSubSkill = async (skillId, subSkillTitle, isValid) => {
    try {
      await axios.patch(
        `http://localhost:7460/api/skills/subskill/${skillId}/${subSkillTitle}`,
        { isValid }
      );
      toast.success("Subskill updated");
      fetchSkills();
    } catch (err) {
      toast.error("Failed to update subskill");
    }
  };

  const deleteSkill = async (skillId) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      await axios.delete(`http://localhost:7460/api/skills/delete/${skillId}`);
      toast.success("Skill deleted successfully");
      fetchSkills(); // refresh the list
    } catch (err) {
      toast.error("Failed to delete skill");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-1">Skills</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add Skill
          </button>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : skills.length === 0 ? (
          <p className="text-center text-gray-500">No skills to display.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div key={skill._id} className="bg-white p-4 rounded shadow">
                  <h2 className="text-xl font-semibold text-blue-1">
                    {skill.code}: {skill.title}
                  </h2>
                <div className="flex gap-3 justify-between">
                  <p className="mt-1 text-sm">
                    Status:{" "}
                    {skill.isValid === undefined ? (
                      <span className="text-yellow-500">No correction</span>
                    ) : skill.isValid ? (
                      <span className="text-green-600">Valid</span>
                    ) : (
                      <span className="text-red-600">Invalid</span>
                    )}
                  </p>
                  <button
                    onClick={() => deleteSkill(skill._id)}
                    className=" bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Delete Skill
                  </button>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold">SubSkills</h4>
                  <ul className="space-y-2 mt-2">
                    {skill.subSkills.map((sub, index) => (
                      <li
                        key={`${sub.title}-${index}`}
                        className="p-2 border rounded bg-gray-50"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p>
                              <strong>{sub.title}</strong>
                            </p>
                            <div className="flex items-center gap-5">
                              <p>Priority: {sub.priority}</p>
                              <p className="text-sm">
                                Status:{" "}
                                {sub.isValid === undefined ? (
                                  <span className="text-yellow-500">
                                    No correction
                                  </span>
                                ) : sub.isValid ? (
                                  <span className="text-green-600">Valid</span>
                                ) : (
                                  <span className="text-red-600">Invalid</span>
                                )}
                              </p>
                            </div>
                          </div>
                          {sub.isValid === undefined && (
                            <div className="space-x-2">
                              <button
                                onClick={() =>
                                  updateSubSkill(skill._id, sub.title, true)
                                }
                                className="text-green-600 border border-green-600 px-2 py-1 rounded hover:bg-green-100"
                              >
                                Validate
                              </button>
                              <button
                                onClick={() =>
                                  updateSubSkill(skill._id, sub.title, false)
                                }
                                className="text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-100"
                              >
                                Invalidate
                              </button>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {showModal && (
        <CreateSkillModal
          onClose={() => {
            setShowModal(false);
            fetchSkills();
          }}
        />
      )}
    </div>
  );
};

export default SkillsPage;
