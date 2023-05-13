interface City {
  id: string;
  name: string;
  votingPopulation: number;
  absence: number;
  presence: number;
}

interface Candidate {
  id: string;
  name: string;
  username: string;
}

interface Election {
  id: string;
  cityId: string;
  candidateId: string;
  votes: number;
}

export interface GetElection {
  cities: City[];
  candidates: Candidate[];
  election: Election[];
}
