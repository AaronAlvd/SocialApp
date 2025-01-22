const groupUsers = [
  {
    id: "3af4e505-7a13-4bb8-bd62-d59f962b3121",
    groupId: "4af42174-4a84-4202-b1a8-ebe4a701535b",
    userId: "4b47f743-1357-47c6-88b8-9dd41699b2bf",
    role: "owner",
  },
  {
    id: "126ed641-6224-41d4-9bdd-891cdf2b2973",
    groupId: "856bc081-fb37-40db-a042-fa19f0938c6a",
    userId: "5fe8bd83-9891-4c5c-b92e-ba34ec34332b",
    role: "owner",
  },
  {
    id: "0748c061-221d-44b4-9f6d-8b5899422a5b",
    groupId: "7b8c5015-e7a7-4504-8f8a-b0b5509b8414",
    userId: "09236cd6-b480-444e-b0ae-a85d2ca7df47",
    role: "owner",
  },
  {
    id: "df0f834c-f262-4de2-a63b-c060a4f1c5b5",
    groupId: "11ecb6d6-29d8-48be-b912-ae7fda5ae442",
    userId: "fffbd13b-428a-4d50-a03e-2f65c1f20b0a",
    role: "owner",
  },
  {
    id: "c4c4f78c-d936-4a6e-b0a6-a84e7a135cea",
    groupId: "d8e49de9-a7b6-4166-be56-02aad30d8b2e",
    userId: "d7a7750e-1e84-4c0e-aa14-a5465059501f",
    role: "owner",
  },
  {
    id: "fbad9f0a-d355-495d-80b7-6d9ba88fb2e5",
    groupId: "d0014920-8fbd-4b5b-8e86-f8971f7ddbe1",
    userId: "b22d58d6-4c03-4ef6-8c8f-e4a311e5e670",
    role: "owner",
  },
  {
    id: "d1e1ff1f-5f2f-4a32-9d85-ef0d5e1b4c59",
    groupId: "971ad97e-15a9-4b19-be38-9c0e9765b462",
    userId: "272dea17-2492-43d5-bbaa-a43ae230c675",
    role: "owner",
  },
  {
    id: "91720fdb-500e-475e-b95d-f821228e6cff",
    groupId: "3f79b54e-bee9-4b25-bd4a-bc2f81a0bcc6",
    userId: "61db0476-b475-4247-9d93-3c7948d5251d",
    role: "owner",
  },
  {
    id: "545e48c9-c650-47c2-8ae9-7cfbe026c9bf",
    groupId: "5a4cd34d-adc0-45c3-b035-366fc819edd8",
    userId: "1ad16070-9a18-4f7e-898e-25236a1470a7",
    role: "owner",
  },
  {
    id: "7d6131be-4ddf-49aa-8399-9853dfc00226",
    groupId: "0d0b734b-b50d-4c7d-99fd-94fd655964a7",
    userId: "16cd7e30-852a-40e1-8d34-8310130a11f9",
    role: "owner",
  },
  {
    id: "e94f206e-f945-4648-8198-73cdf052f8b9",
    groupId: "00cc0aae-86ff-4ea6-bb9c-d956d9fd5cc1",
    userId: "609ade28-3fb5-4060-a11f-09c3c0e18e13",
    role: "owner",
  },
  {
    id: "b2f2893c-1137-4d81-9662-2e8ce911704a",
    groupId: "8f70e6b9-79ca-42a8-b279-5ee115e1bc22",
    userId: "53273810-9847-4e6e-9c1f-cdcee005eba0",
    role: "owner",
  },
  {
    id: "2ac0d2ef-3eb1-4042-ba93-ae6bb2a0b023",
    groupId: "33eb6bfa-cf74-461e-b1c0-5792645daa0e",
    userId: "4da8e1d7-313c-4e56-a120-f1ffe840f8cc",
    role: "owner",
  },
  {
    id: "877010f4-5338-42b0-bdef-a7777b794c28",
    groupId: "9c420b87-20d3-4f9d-a00f-bf95acd54c97",
    userId: "8e461ff7-d9d8-4900-ab7f-6071231bb574",
    role: "owner",
  },
  {
    id: "ad179096-9124-4c09-bd03-04a9825de44e",
    groupId: "e7113d2a-4259-4879-9097-d58cf1352e37",
    userId: "7412c154-e28d-4597-adbc-eede33bd5764",
    role: "owner",
  },
  {
    id: "6d306bd8-aaf6-4814-af5d-cabeb367270f",
    groupId: "b248d6cb-d25d-4ff2-b793-243324d51b37",
    userId: "4a464f76-cbb9-4b16-8046-6247f15942ab",
    role: "owner",
  },
  {
    id: "d9b18555-32cf-4c85-a695-70c6d5173cb7",
    groupId: "c5acca48-5e2f-46ba-b05a-83007ff4ec01",
    userId: "a41c64d9-aea4-4537-b1a3-500f4c3076d8",
    role: "owner",
  },
  {
    id: "8fe50fc5-0d35-4651-85c8-6bcb979612a0",
    groupId: "e7e6b344-d1cc-4050-a05d-238f66b42cb8",
    userId: "fd61cac0-c9b0-468f-9acf-d91cc8988d7b",
    role: "owner",
  },
  {
    id: "dec7338e-0933-436b-95d3-c4be1f8423bf",
    groupId: "a8ceb419-6c98-4e1b-81ac-7b20dc094a2b",
    userId: "408545bd-bba6-46b1-9a3e-356f607555e3",
    role: "owner",
  },
  {
    id: "f0d7f4d8-7cdf-49f8-ab5f-0a4434467d2b",
    groupId: "29a176f1-ca7b-43b9-8f3e-d14260e0992d",
    userId: "6ce74aa2-3a43-4e37-996a-13f79e1fe920",
    role: "owner",
  },
];

module.exports = { groupUsers };
