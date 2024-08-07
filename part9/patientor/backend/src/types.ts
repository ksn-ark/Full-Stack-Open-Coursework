type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

type BaseEntry = {
  id: string;
  description: string;
  date: string;
  specialist: string;

  diagnosisCodes?: Array<Diagnosis['code']>;
};

export type Discharge = {
  date: string;
  criteria: string;
};

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

export type SickLeave = {
  startDate: string;
  endDate: string;
};

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export const entryTypes: Set<string> = new Set([
  'Hospital',
  'OccupationalHealthcare',
  'HealthCheck',
]);

export type EntryType = Entry['type'];

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewEntry = UnionOmit<Entry, 'id'>;
export type NewPatient = Omit<Patient, 'id'>;
