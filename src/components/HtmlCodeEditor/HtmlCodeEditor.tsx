import { useState } from "react";
import { EditorView } from "@codemirror/view";
import { html } from "@codemirror/lang-html";
import CodeMirror from "@uiw/react-codemirror";

export const HtmlCodeEditor = () => {
  const [htmlContent, setHtmlContent] = useState(`
        <!DOCTYPE html>
        <html>
        <body>
        <p>Dear Sir/Madam,</p>
            
            <p>This is to inform you that vendor {{name1}} confirmation status is as per the below-specified details:</p>
            
            <table border="1" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse;">
                <tr>
                    <th style="text-align: left; border: 1px solid black;">Balance as on {{exctd_dt}}</th>
                    <th style="text-align: left; border: 1px solid black;">Reconfirmed Balance</th>
                    <th style="text-align: left; border: 1px solid black;">Remark</th>
                    <th style="text-align: left; border: 1px solid black;">Confirmation Status</th>
                </tr>
                {{{html_table}}}
            </table>
        
            <p>Thank you for your cooperation.</p>
            
            <p>
                Best regards,<br>
                {{name1}}
            </p>
        </body>
        </html>`);

  const handleChange = (value) => {
    setHtmlContent(value);
  };

  return (
    <div>
      <h2>HTML Content Editor</h2>
      <CodeMirror
        value={htmlContent}
        height="500px"
        extensions={[
          html(),
          EditorView.theme({
            "&": {
              textAlign: "left",
            },
            ".cm-content": {
              paddingLeft: "20px",
            },
          }),
        ]}
        theme="light"
        onChange={handleChange}
      />
      <h3>Preview:</h3>
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        style={{ border: "1px solid #ccc", padding: "10px" }}
      ></div>
    </div>
  );
};
