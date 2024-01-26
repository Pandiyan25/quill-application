import React, { useEffect, useState, useRef } from "react";
import ReactQuill, { Quill } from "react-quill-with-table";
import QuillBetterTable from "quill-better-table";
import { Parser as HtmlToReactParser } from "html-to-react";
import "react-quill-with-table/dist/quill.snow.css";
import "quill-better-table/dist/quill-better-table.css";
import QuillTableUI from "quill-table-ui";
import "react-quill-with-table/dist/quill.bubble.css";
var htmlToReactParser = new HtmlToReactParser();

Quill.register("modules/better-table", QuillBetterTable);

const editorModules = {
  // Remove the following line to enable the table module
  table: false,
  "better-table": {
    operationMenu: {
      items: {
        unmergeCells: {
          text: "Another unmerge cells name",
        },
      },
    },
  },
  keyboard: {
    bindings: QuillBetterTable.keyboardBindings,
  },
};

function QuillTable() {
  const editor = useRef();
  const [text, setText] = useState("");
  var reactElement = htmlToReactParser.parse(text);
  const handleTableInsert = (e) => {
    e.preventDefault();
    const editon = editor.current.getEditor();
    let tableModule = editon.getModule("better-table");
    tableModule.insertTable(3, 3);
  };

  return (
    <div className="App" style={{ fontFamily: "sans-serif", height: "400px" }}>
      <ReactQuill
        ref={editor}
        value={text}
        modules={editorModules}
        onChange={(value) => setText(value)}
        theme="snow"
      />
      <button id="insert-table" onClick={handleTableInsert}>
        Insert table
      </button>
      {reactElement}
    </div>
  );
}

export default QuillTable;
