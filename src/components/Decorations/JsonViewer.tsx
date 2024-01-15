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
  status: string | number;
}

export default function JsonViewer({ json, status, className }: Props) {
  return (
    <div className={`${className}`}>
      <div className="header bg-yellow-500">this is the header</div>
      <pre
        className="w-full px-4 h-[33rem] overflow-auto"
        dangerouslySetInnerHTML={{
          __html: syntaxHighlight(json),
        }}
      />
    </div>
  );
}
