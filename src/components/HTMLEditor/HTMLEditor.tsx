import { useState } from "react";
// import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";

const HTMLEditor = () => {
  const [htmlContent, setHtmlContent] = useState();

  const cloud = useCKEditorCloud({
    version: "44.1.0",
    premium: false,
  });

  if (cloud.status === "error") {
    return <div>Error!</div>;
  }

  if (cloud.status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>CKEDITOR for HTML</h2>
      <CKEditor
        editor={ClassicEditor}
        /* config={editorConfiguration} */
        data="<p>Hello from CKEditor 5!</p>"
        // onInit={(editor) => {
        //   // You can store the "editor" and use when it is needed.
        //   console.log("Editor is ready to use!", editor);
        // }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default HTMLEditor;
