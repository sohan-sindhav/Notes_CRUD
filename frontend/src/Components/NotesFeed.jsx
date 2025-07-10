import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { UserContext } from "../userContext";

const NotesFeed = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [ShowPopup, setShowPopup] = useState(false);
  const [allNotes, SetAllNotes] = useState([]);
  const [smsgintitle, setSmsgintitle] = useState("Create New Note");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  const { user, logout } = useContext(UserContext);

  const handleEditStart = (note) => {
    setEditingNoteId(note._id);
    setEditTitle(note.title);
    setEditBody(note.body);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/auth/login");
    logout();
  };

  const cancelEditing = () => {
    setEditingNoteId(null);
    setEditTitle("");
    setEditBody("");
  };
  const handleSaveEdit = async (id) => {
    try {
      const res = await axios.put(
        `https://notes-crud-3kly.onrender.com/api/v1/note/update/${id}`,
        {
          title: editTitle,
          body: editBody,
        }
      );
      if (res.status === 200) {
        toast.success("Note updated successfully!");
        cancelEditing();
        fetchNotes();
      }
    } catch (error) {
      toast.error("Error updating note.");
    }
  };

  const token = localStorage.getItem("token");

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        "https://notes-crud-3kly.onrender.com/api/v1/note/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      SetAllNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  const handlenotedeletion = async (id) => {
    const res = await axios.delete(
      `https://notes-crud-3kly.onrender.com/api/v1/note/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      toast.success("Note deleted");
      fetchNotes();
    }
  };

  const handleNoteCreation = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://notes-crud-3kly.onrender.com/api/v1/note/create",
        {
          title,
          body,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setTitle("");
        setBody("");
        setShowPopup(false);
        fetchNotes();
        toast.success("Note created successfully!");
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className="createnoteContainer ">
        <div className="createnote bg-gradient-to-r from-[#380036] to-[#0CBABA] p-3 flex justify-center px-48 border-b relative">
          <button
            onClick={() => setShowPopup(true)}
            disabled={ShowPopup}
            className={`p-4 text-white font-bold rounded-md
      transition-all duration-500 ease-in-out text-xl
      ${
        ShowPopup
          ? "bg-gray-600 cursor-not-allowed opacity-20"
          : "bg-gradient-to-r from-[#0D324D] to-[#7F5A83] hover:bg-right bg-[length:200%_200%] bg-left"
      }`}
          >
            Create Note
          </button>

          <div
            onMouseEnter={() => setShowLogout(true)}
            onMouseLeave={() => setShowLogout(false)}
            className={` hover:cursor-pointer text-4xl p-3 rounded text-white font-bold absolute right-10 top-1/2 transform -translate-y-1/2 flex flex-col justify-center items-center`}
          >
            <CgProfile />
            <p className="text-xl font-mono font-medium">{user?.username}</p>
            <button
              onClick={handleLogout}
              className="absolute top-20 rounded  text-lg bg-white text-black"
            >
              {showLogout && "Logout"}
            </button>
          </div>
        </div>
      </div>
      {ShowPopup && (
        <div className="popup fixed inset-0 z-50 text-center h-screen bg-black   p-20 bg-opacity-70 flex justify-center">
          <form action="" onSubmit={handleNoteCreation}>
            <div className="popupcontainer relative bg-gradient-to-r from-[#0892d0] to-[#4b0082] h-fit p-2 rounded-xl mt-10 ">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute -top-1 right-2 text-white text-2xl font-bold hover:text-red-500 transition "
              >
                x
              </button>

              {/* Heading */}
              <h1 className="p-2 text-white font-extrabold text-2xl text-center">
                {smsgintitle}
              </h1>

              <div className="flex flex-col gap-2  border-black bg-white p-4 rounded-xl">
                <input
                  type="text"
                  className="p-5 font-bold border border-black rounded text-2xl"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  type="text"
                  className="p-5 font-semibold resize-none border-black rounded border h-64"
                  placeholder="content"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                <button className="border border-black rounded p-2 hover:bg-gradient-to-r hover:from-[#0892d0] hover:to-[#4b0082] hover:text-white font-bold text-lg hover:border-white">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      <div className="notesFeed bg-gradient-to-r from-[#380036] to-[#0CBABA] h-screen">
        <h2 className="text-center text-3xl font-bold text-white mb-6 pt-6">
          All Notes
        </h2>

        <div className="noteContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-5">
          {allNotes.map((note) => (
            <div
              className="notes relative bg-white shadow-md hover:shadow-xl transition-shadow duration-300 text-black p-4 rounded-lg text-left flex flex-col gap-2 border border-gray-300"
              key={note._id}
            >
              <div className="absolute top-1 right-2 flex gap-2">
                <button onClick={() => handleEditStart(note)}>
                  <MdEdit className="text-xl hover:text-blue-500" />
                </button>
                <button onClick={() => handlenotedeletion(note._id)}>
                  <MdDeleteForever className="text-xl hover:text-red-500" />
                </button>
              </div>

              {editingNoteId === note._id ? (
                <>
                  <input
                    className="border p-2 text-lg font-bold"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    className="border p-2"
                    rows={4}
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleSaveEdit(note._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => cancelEditing()}
                      className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-xl font-bold text-[#1B1B1B] truncate">
                    {note.title}
                  </h1>
                  <p className="text-gray-700 whitespace-pre-line">
                    {note.body}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesFeed;
