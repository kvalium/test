const fakeFactory = (template) => (overrides = []) =>
  overrides.map((override) => ({
    ...template,
    ...override
  }));

export const aalTemplate = {
  id: "412347a5-7982-46f9-b175-1c3a3ad570cf",
  name: "CAMO - MISCELLANEOUS ACTIVITIES",
  code: "CAMO-MIS",
  createdAt: "2020-05-04T15:36:53.789Z",
  createdById: "702d7b3c-8b06-4304-8665-7807d0b93c03",
  updatedAt: "2020-05-04T15:36:53.789Z",
  updatedById: "702d7b3c-8b06-4304-8665-7807d0b93c03",
  deletedAt: null,
  deletedById: null
};

export const fakeAalFactory = fakeFactory(aalTemplate);
export const fakeAals = fakeAalFactory([
  {
    id: "8f8d31eb-bb8e-4a78-b36d-779504c33958",
    code: "CON-MP",
    name: "CONSULTING - MAINTENANCE PROGRAM AUTHORING"
  },
  {
    id: "d2752ea8-c4a3-4e7c-9dad-2197c9fee930",
    code: "ACTR-DEL",
    name: "AIRCRAFT TRANSITION - DELIVERY"
  },
  {
    id: "7f600b01-01d1-47f8-b51d-fdcf87c4601e",
    code: "ACTR-MOD",
    name: "AIRCRAFT TRANSITION - AIRCRAFT MODIFICATION",
    deletedAt: "2020-05-04T15:36:53.789Z",
    deletedById: "702d7b3c-8b06-4304-8665-7807d0b93c03"
  }
]);
