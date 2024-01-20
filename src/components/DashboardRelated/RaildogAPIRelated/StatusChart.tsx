import { ReactNode } from "react";
import FindTrainsAPIStatusChart from "./FindTrainsAPIStatusChart";
import Constants from "../../../classes/Constants";

interface Props {
  apiName: string;
}

const mapAPIStatusChart: Record<string, ReactNode> = {
  [Constants.GET_TRAINS]: <FindTrainsAPIStatusChart />,
};

export default function StatusChart({ apiName }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <td>Status</td>
          <td>Meaning</td>
        </tr>
      </thead>
      {mapAPIStatusChart[apiName]}
    </table>
  );
}
