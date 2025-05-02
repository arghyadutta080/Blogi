import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageResize } from "quill-image-resize-module-ts";
import BlotFormatter from "quill-blot-formatter";

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/blotFormatter", BlotFormatter);

interface Props {
  htmlText: string;
  setHtmlText: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditor: React.FC<Props> = ({ htmlText, setHtmlText }) => {
  const toolbarOptions = [
    // toolbar contains different tool to customize the text, image and video in the editor box
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    ["link", "image", "video"],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
    clipboard: { matchVisual: false }, // toggle to add extra line breaks when pasting HTML
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
    blotFormatter: {},
  };

  return (
    <>
      <div>
        <ReactQuill
          theme="snow"
          modules={modules}
          value={htmlText}
          onChange={setHtmlText}
          className="h-[40rem] lg:min-h-[300px] rounded-md text-primary bg-background w-full flex flex-col"
        />
      </div>
    </>
  );
};

export default TextEditor;
