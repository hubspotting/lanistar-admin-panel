export default {
  msLandingUrl:
    process.env.NODE_ENV == "development"
      ? "http://localhost:5001" : (
        process.env.NODE_ENV == "production" ?
        "https://landing-api.iamlanistar.com" :
        "https://lanistar-api-server.herokuapp.com"
      ),
  contractStatuses: [
    { label: 'Waiting to be contacted', value: 0 },
    { label: 'Contacted / pitch booked', value: 1 },
    { label: 'Didn\'t attend pitch / to be re-booked', value: 2 },
    { label: 'Non contactable / Disappeared', value: 3 },
    { label: 'Contract Signed', value: 4 },
    { label: 'Contract Not Signed', value: 5 }
  ],
  assignedToCases: [
    { label: 'Not assigned yet', value: 0 },
    { label: 'Carol', value: 1 },
    { label: 'Mohanned', value: 2 },
    { label: 'Amani', value: 3 }
  ],
  assignFilterCases: [
      { label: 'All', value: -1 },
      { label: 'Not assigned yet', value: 0 },
      { label: 'Carol', value: 1 },
      { label: 'Mohanned', value: 2 },
      { label: 'Amani', value: 3 }
  ]
};
