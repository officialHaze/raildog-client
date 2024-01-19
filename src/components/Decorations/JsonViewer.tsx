import React from "react";

// JSON prettify syntax highlighting
function syntaxHighlight(json: JSON | string) {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  json: JSON | string;
  status: number;
  statusText: string;
}

export default function JsonViewer({ json, status, statusText, className }: Props) {
  return (
    <div className={`${className} overflow-hidden rounded-xl white-border-all`}>
      <div className="header flex justify-between px-4 py-2 bg-[#353941] white-border">
        <p>
          Status:{" "}
          {!isNaN(status) && (
            <span
              className={`${
                !isNaN(status) && status < 400 ? "bg-green-500" : "bg-red-500"
              } px-2 rounded-md`}
            >
              {status}
            </span>
          )}
        </p>
        <p className={`${!isNaN(status) && status < 400 ? "text-green-500" : "text-red-500"}`}>
          {statusText}
        </p>
      </div>
      <pre
        className="w-full p-4 h-[33rem] overflow-auto bg-[#0C2233] break-words"
        dangerouslySetInnerHTML={{
          __html: syntaxHighlight(json),
        }}
      />
    </div>
  );
}
