export const KPIS = {
  fleetAvailability: 92.5,
  punctuality: 99.5,
  brandingSLA: 97.2,
  maintenanceCost: 1200000
};

export const mileageData = Array.from({ length: 25 }, (_, i) => ({
  name: `Train-${i+1}`,
  mileage: Math.floor(Math.random() * 1000) + 500
}));

export const allocationCounts = { revenue: 15, standby: 6, maintenance: 4 };

export function generateTrainsets(n = 25) {
  const statuses = ['Revenue','Standby','IBL'];
  const fitness = ['Valid','Expired'];
  const job = ['Open','Closed'];
  const branding = ['High','Medium','Low'];
  const slots = ['Slot 1','Slot 2','Slot 3'];

  return Array.from({length: n}, (_, i) => ({
    trainId: `Train-${i+1}`,
    status: statuses[Math.floor(Math.random()*statuses.length)],
    fitnessCertificate: fitness[Math.floor(Math.random()*fitness.length)],
    jobCardStatus: job[Math.floor(Math.random()*job.length)],
    brandingPriority: branding[Math.floor(Math.random()*branding.length)],
    mileage: Math.floor(Math.random()*1000)+500,
    cleaningSlot: slots[Math.floor(Math.random()*slots.length)],
    stablingBay: `Bay ${Math.floor(Math.random()*20)+1}`
  }));
}

export const dummyAuditLogs = [
  { id: 1, action: 'Generated Plan', timestamp: '2023-10-01T10:00:00Z' },
  { id: 2, action: 'Approved Plan ID: 123', timestamp: '2023-10-01T11:00:00Z' }
];

export const dummyAlerts = [
  { id: 1, title: 'Fitness Certificate Expired', message: 'Train-5 has expired certificate.', timestamp: new Date().toISOString() }
];
