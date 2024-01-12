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
        name: "Find Trains",
        reqMethod: "GET",
        id: SidePanelOptionsId.RAILDOG_SUB_SNIFF_TRAINS,
      },

      {
        name: "Get Live Status",
        reqMethod: "GET",
        id: SidePanelOptionsId.RAILDOG_SUB_SNIFF_LIVE_STATUS,
      },
    ],
  },

  {
    name: "Documentation",
    id: SidePanelOptionsId.DOC,
    suboptions: [],
  },
];

export default sidePanelOptions;
