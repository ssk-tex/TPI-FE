import { agencyDetailsSend2Nrlm, agencyDetailsSend2Ommas, budgetAllocationSend, componentSend2Ommas, ddoAllocationSend2Nrlm, ddoAllocationSend2Ommas, fetchBudgetAllocationDetails, msDetailsSend2Nrlm, msDetailsSend2Ommas, slsDetailsSend2Nrlm, slsDetailsSend2Ommas } from "../services/tpiService";

export const sendData2SchemeApi = [
  { slsCode: 'WB3', slsFn: slsDetailsSend2Nrlm, agencyFn: agencyDetailsSend2Nrlm, msFn: msDetailsSend2Nrlm, daFn: ddoAllocationSend2Nrlm, baFn: budgetAllocationSend },
  { slsCode: 'WB144', slsFn: slsDetailsSend2Nrlm, agencyFn: agencyDetailsSend2Nrlm, msFn: msDetailsSend2Nrlm, daFn: ddoAllocationSend2Nrlm, baFn: budgetAllocationSend },
  { slsCode: 'WB247', slsFn: slsDetailsSend2Nrlm, agencyFn: agencyDetailsSend2Nrlm, msFn: msDetailsSend2Nrlm, daFn: ddoAllocationSend2Nrlm, baFn: budgetAllocationSend },
  { slsCode: 'WB70', slsFn: slsDetailsSend2Ommas, agencyFn: agencyDetailsSend2Ommas, msFn: msDetailsSend2Ommas, daFn: ddoAllocationSend2Ommas, ComFn: componentSend2Ommas },
]

export const menuDataNrlm = [
  {
    type: "section",
    title: "MASTER DATA",
    items: [
      { label: "SLS Data", icon: "database", to: "/send-data-to-department/sls" },
      { label: "Agency Data", icon: "university", to: "/send-data-to-department/agency" },
      // { label: "Component (ommas)", icon: "file", to: "/component" },
    ],
  },
  {
    type: "section",
    title: "SANCTION DATA",
    items: [
      {
        label: "JIT Sanction Data",
        icon: "file",
        children: [
          { label: "Mother Sanction", to: "/send-data-to-department/jit-ms" },
          { label: "State Sanction", to: "/send-data-to-department/state-sanction" },
        ],
      },
      {
        label: "Scheme sanction Data",
        icon: "file",
        children: [
          { label: "Mother Sanction", to: "/send-data-to-department/ms" },
          { label: "DDO Allocation", to: "/send-data-to-department/ddo-allocation" },
          { label: "Budget Allocation", to: "/send-data-to-department/budget-allocation" },
        ],
      },
    ],
  },
  {
    type: "section",
    title: "FTO",
    items: [
      { label: "FTO List", icon: "file", to: "/fto-list" },
    ],
  },
  {
    type: "section",
    title: "MIS",
    items: [
      { label: "MIS Report", icon: "file", to: "/mis" },
    ],
  },
];

export const menuDataOmmas = [
  {
    type: "section",
    title: "MASTER DATA",
    items: [
      { label: "SLS Data", icon: "database", to: "/send-data-to-department/sls" },
      { label: "Agency Data", icon: "university", to: "/send-data-to-department/agency" },
      { label: "Component (ommas)", icon: "file", to: "/send-data-to-department/component" },
    ],
  },
  {
    type: "section",
    title: "SANCTION DATA",
    items: [
      {
        label: "JIT Sanction Data",
        icon: "file",
        children: [
          { label: "Mother Sanction", to: "/send-data-to-department/jit-ms" },
          { label: "State Sanction", to: "/send-data-to-department/state-sanction" },
        ],
      },
      {
        label: "Scheme sanction Data",
        icon: "file",
        children: [
          { label: "Mother Sanction", to: "/send-data-to-department/ms" },
          { label: "DDO Allocation", to: "/send-data-to-department/ddo-allocation" }
        ],
      },
    ],
  },
  {
    type: "section",
    title: "FTO",
    items: [
      { label: "FTO List", icon: "file", to: "/fto-list" },
    ],
  },
  {
    type: "section",
    title: "MIS",
    items: [
      { label: "MIS Report", icon: "file", to: "/mis" },
    ],
  },
];