import { ReactNode } from "react";

interface Props {
  column?: ReactNode;
}

export default function StatusChart({ column }: Props) {
  return (
    <>
      <div className="py-4 px-2 white-border">
        <h2>Response Status</h2>
      </div>
      <table className="table-fixed border-separate border-spacing-2">
        <thead>
          <tr className="bg-slate-500">
            <th className="p-2 white-border-all">Status</th>
            <th className="p-2 white-border-all">Meaning</th>
          </tr>
        </thead>
        <tbody className="font-semibold">
          <tr>
            <td className="py-2 px-4 white-border-all">200</td>
            <td className="py-2 px-4 white-border-all">
              The response is good and you get the requested data.
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 white-border-all">400</td>
            <td className="w-[70%] py-2 px-4 white-border-all">
              The response is bad. Check all the details before sending a request.
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 white-border-all">500</td>
            <td className="w-[70%] py-2 px-4 white-border-all">
              The response is bad due to an error originating in the server. You should try again
              after sometime.
            </td>
          </tr>
          {column && column}
        </tbody>
      </table>
    </>
  );
}
