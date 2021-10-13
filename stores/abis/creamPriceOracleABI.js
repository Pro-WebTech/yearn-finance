export const creamPriceOracleABI = [
  {
    inputs: [{ internalType: "address", name: "admin_", type: "address" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "cTokenAddress",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "source",
        type: "address"
      }
    ],
    name: "AggregatorUpdated",
    type: "event"
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "_admin", type: "address" }],
    name: "_setAdmin",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address[]", name: "cTokenAddresses", type: "address[]" },
      { internalType: "address[]", name: "sources", type: "address[]" }
    ],
    name: "_setAggregators",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "aggregators",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "curveSwap",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "cyY3CRVAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { internalType: "contract CToken", name: "cToken", type: "address" }
    ],
    name: "getUnderlyingPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "yVaults",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];
