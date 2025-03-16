import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFile, FaFolder, FaEye, FaTrash } from "react-icons/fa";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  toolbarPlugin,
  CodeToggle,
  CreateLink,
  InsertImage,
  imagePlugin,
  diffSourcePlugin,
  InsertTable,
  tablePlugin,
  ListsToggle,
  listsPlugin,
  headingsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  InsertThematicBreak,
  markdownShortcutPlugin,
  linkPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

// Custom separator component
const Separator = ({ orientation }) => {
  return (
    <div
      className={`bg-gray-300 ${
        orientation === "vertical" ? "w-px h-6 mx-2" : "h-px w-full my-2"
      }`}
    />
  );
};

const NotesEditor = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [markdown, setMarkdown] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showNotesManager, setShowNotesManager] = useState(false);
  const [noteName, setNoteName] = useState("");
  const [token, setToken] = useState(null);
  const [userNotes, setUserNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(
      "sb-xbwcvsgisrkvaaxasrpl-auth-token"
    );
    if (storedToken) {
      try {
        setToken(JSON.parse(storedToken));
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, []);

  const handleChange = (newMarkdown) => {
    setMarkdown(newMarkdown);
  };

  const handleSave = async () => {
    if (!noteName.trim()) {
      alert("Please enter a name for your note");
      return;
    }

    try {
      if (!token || !token.user || !token.user.id) {
        console.error("User not authenticated");
        alert("You must be logged in to save notes");
        return;
      }

      setIsLoading(true);
      const userId = token.user.id;
      const response = await axios.post(`${API_URL}/saveMarkdown`, {
        markdown,
        userId,
        noteName: noteName.trim(),
        noteId: currentNoteId, 
      });

      console.log("Markdown saved successfully");
      setShowSaveDialog(false);

      if (response.data && response.data.noteId) {
        setCurrentNoteId(response.data.noteId);
      }

      alert("Note saved successfully!");
    } catch (error) {
      console.error("Error saving markdown:", error);
      alert("Error saving your note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserNotes = async () => {
    if (!token || !token.user || !token.user.id) {
      console.error("User not authenticated");
      alert("You must be logged in to view notes");
      return;
    }

    try {
      setIsLoading(true);
      const userId = token.user.id;
      const response = await axios.get(`${API_URL}/getUserNotes/${userId}`);

      console.log(response.data);

      setUserNotes(Array.isArray(response.data) ? response.data : []);
      setShowNotesManager(true);
    } catch (error) {
      console.error("Error fetching notes:", error);
      alert("Failed to load your notes. Please try again.");
      setUserNotes([]); // Set to empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const loadNote = async (noteId) => {
    console.log("in load notes", noteId);
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/getNote/${noteId}`);
      console.log(response);

      if (response.data) {
        setMarkdown(response.data.content);
        setNoteName(response.data.title);
        setCurrentNoteId(noteId);
        setShowNotesManager(false);
      }
      console.log(markdown, " ", noteName, " ", noteId);
      console.log(response.data.content);
    } catch (error) {
      console.error("Error loading note:", error);
      alert("Failed to load the selected note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNote = async (noteId, noteName) => {
    if (window.confirm(`Are you sure you want to delete "${noteName}"?`)) {
      try {
        setIsLoading(true);
        await axios.delete(`${API_URL}/deleteNote/${noteId}`);

        setUserNotes(userNotes.filter((note) => note.id !== noteId));

        if (noteId === currentNoteId) {
          setMarkdown("");
          setNoteName("");
          setCurrentNoteId(null);
        }

        alert("Note deleted successfully");
      } catch (error) {
        console.error("Error deleting note:", error);
        alert("Failed to delete the note. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="notes-editor-container flex flex-col h-full bg-gray-800 rounded-lg overflow-hidden">
      <div className="bg-gray-800 text-white p-4 border-b border-gray-700 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">
            Notes {noteName && ` - ${noteName}`}
          </h3>
          <p className="text-gray-300 text-sm">
            Capture your thoughts about the document
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowSaveDialog(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={fetchUserNotes}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "View Notes"}
          </button>
        </div>
      </div>
      <div className="flex-grow bg-white rounded-b-lg">
        <MDXEditor
          key={currentNoteId || "new-note"}
          value={markdown}
          onChange={handleChange}
          markdown={markdown}
          contentEditableClassName="prose prose-sm max-w-none h-full p-4 text-gray-800 bg-white outline-none overflow-y-auto text-center"
          style={{
            minHeight: "300px",
            height: "calc(100% - 60px)", // Subtract toolbar height
          }}
          plugins={[
            toolbarPlugin({
              toolbarContents: () => (
                <div className="bg-gray-100 p-2 flex flex-wrap items-center gap-1 border-b border-gray-200">
                  <UndoRedo />
                  <Separator orientation="vertical" />
                  <BoldItalicUnderlineToggles />
                  <Separator orientation="vertical" />
                  <BlockTypeSelect />
                  <Separator orientation="vertical" />
                  <CodeToggle />
                  <CreateLink />
                  <Separator orientation="vertical" />
                  <div className="flex items-center space-x-1">
                    <InsertImage />
                    <InsertTable />
                  </div>
                  <Separator orientation="vertical" />
                  <div className="flex items-center space-x-1">
                    <ListsToggle />
                    <InsertThematicBreak />
                  </div>
                </div>
              ),
            }),
            headingsPlugin(),
            imagePlugin(),
            diffSourcePlugin(),
            tablePlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            linkPlugin(),
            markdownShortcutPlugin(),
          ]}
        />
      </div>
      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#242424] p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Save Note</h3>
            <input
              type="text"
              value={noteName}
              onChange={(e) => setNoteName(e.target.value)}
              placeholder="Enter note name"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showNotesManager && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-3/4 max-w-3xl max-h-[80vh] overflow-y-auto border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Your Notes</h3>
              <button
                onClick={() => setShowNotesManager(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {Array.isArray(userNotes) && userNotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userNotes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-200 hover:bg-gray-750 hover:shadow-md hover:scale-[1.02] cursor-pointer group"
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-400 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <h4
                            className="font-medium text-white text-lg truncate max-w-[160px]"
                            title={note.title}
                          >
                            {note.title}
                          </h4>
                        </div>
                      </div>

                      <div className="mt-2">
                        <p className="text-xs text-gray-400">
                          ID: {note.id.substring(0, 8)}...
                        </p>
                        <div className="mt-4 flex justify-between">
                          <button
                            onClick={() => loadNote(note.id)}
                            className="flex items-center text-sm text-gray-300 hover:text-green-400 transition-colors group-hover:text-green-400"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3c4.478 0 8.268 2.943 9.542 7-.174.299-.357.592-.55.877C17.677 14.917 14.152 17 10 17c-4.152 0-7.677-2.083-8.992-6.123a13.68 13.68 0 01-.55-.877zM10 15a5 5 0 100-10 5 5 0 000 10z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Open
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNote(note.id, note.title);
                            }}
                            className="flex items-center text-sm text-gray-300 hover:text-red-400 transition-colors group-hover:text-red-400"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-600 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-400 text-lg mb-2">No notes found</p>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Create your first note by writing something in the editor and
                  clicking Save.
                </p>
              </div>
            )}

            <div className="flex justify-end mt-8">
              <button
                onClick={() => setShowNotesManager(false)}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesEditor;
