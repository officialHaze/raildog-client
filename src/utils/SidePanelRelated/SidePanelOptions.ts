import { SidePanelOptionsId } from "../../classes/Constants";

const sidePanelOptions = [
  {
    name: "API keys",
    id: SidePanelOptionsId.API_KEYS,
    suboptions: [],
  },

  {
    name: "Raildog",
    id: SidePanelOptionsId.RAILDOG_API,
    suboptions: [
      {
        name: "Sniff Trains",
        id: SidePanelOptionsId.RAILDOG_SUB_SNIFF_TRAINS,
      },
    ],
  },
];

export default sidePanelOptions;
