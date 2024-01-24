import { ReactNode } from "react";

interface Props {
  column?: ReactNode;
}

export default function StatusChart({ column }: Props) {
  return (
    <>
      <div className="py-4 px-2 white-border">
        <h2>Response status and their meaning</h2>
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
            <td className="py-2 px-4 white-border-all text-green-500">200</td>
            <td className="py-2 px-4 white-border-all">
              Good response. You get all the requested data.
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 white-border-all text-red-500">400</td>
            <td className="w-[70%] py-2 px-4 white-border-all">
              Bad response. Check all the details before sending a request.
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 white-border-all text-red-500">500</td>
            <td className="w-[70%] py-2 px-4 white-border-all">
              Bad response. There was an error in the server. Try again after sometime.
            </td>
          </tr>
          {column && column}
        </tbody>
      </table>
    </>
  );
}
