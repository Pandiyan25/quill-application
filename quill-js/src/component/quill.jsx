import React, { useState, useRef, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import { emojiButton } from "quill-emoji";
import ReactQuill, { Quill } from "react-quill";
import "./quill.css";
import "quill-paste-smart";

function QuillEditor() {
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [replaceTerm, setReplaceTerm] = useState("");
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.focus();
    }
  }, [quillRef]);

  const handleFind = () => {
    const quill = quillRef.current.getEditor();
    const text = quill.getText();

    const startIndex = text.indexOf(searchTerm);
    if (startIndex !== -1) {
      const endIndex = startIndex + searchTerm.length;

      // Clear previous formatting
      quill.formatText(0, text.length, "background", false);

      quill.formatText(
        startIndex,
        endIndex - startIndex,
        "background",
        "yellow"
      );
    }
  };

  const handleReplace = () => {
    const quill = quillRef.current.getEditor();
    const text = quill.getText();

    const startIndex = text.indexOf(searchTerm);
    if (startIndex !== -1) {
      //   const endIndex = startIndex + searchTerm.length;
      quill.deleteText(startIndex, searchTerm.length);
      quill.insertText(startIndex, replaceTerm);
    }
  };

  const handleReplaceAll = () => {
    const quill = quillRef.current.getEditor();
    const text = quill.getText();
    const newText = text.replace(new RegExp(searchTerm, "g"), replaceTerm);
    quill.setText(newText);
  };

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["emoji"],
        ["clean"],
      ],
    },
    "emoji-toolbar": true,
  };

  return (
    <>
      <h3>Quill Editor</h3>
      <div>
        <ReactQuill
          theme="snow"
          modules={{ toolbar: modules.toolbar, "emoji-toolbar": true }}
          value={value}
          onChange={setValue}
          ref={quillRef}
        />
        <input
          type="text"
          placeholder="Search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Replace term"
          value={replaceTerm}
          onChange={(e) => setReplaceTerm(e.target.value)}
        />
        <button onClick={handleFind}>Find</button>
        <button onClick={handleReplace}>Replace</button>
        <button onClick={handleReplaceAll}>Replace All</button>
      </div>
    </>
  );
}

export default QuillEditor;
