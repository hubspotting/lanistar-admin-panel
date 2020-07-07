export default {
  msLandingUrl:
    (process.env.NODE_ENV == "development"
      ? "http://localhost:5001" : (
        process.env.NODE_ENV == "production" ?
        "https://landing-api.iamlanistar.com" :
        "https://lanistar-api-server.herokuapp.com"
      )),
  contractStatuses: [
    { label: 'Waiting to be contacted', value: 0 },
    { label: 'Contacted / awaiting response', value: 9 },
    { label: 'Contacted / Pitch booked / Zoom', value: 7 },
    { label: 'Contacted / Pitch booked / HQ', value: 8 },
    { label: 'Didn\'t attend pitch / to be re-booked', value: 2 },
    { label: 'Non contactable / Disappeared', value: 3 },
    { label: 'Contract Signed', value: 4 },
    { label: 'Contract Not Signed', value: 5 },
    { label: 'Rejected', value: 6 }
  ],
  assignedToCases: [
    { label: 'Not assigned yet', value: null },
  ],
  assignFilterCases: [
      { label: 'All', value: -1 },
      { label: 'Not assigned yet', value: null },
  ]
};
