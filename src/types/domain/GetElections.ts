interface Cities {
  id: string;
  name: string;
  votingPopulation: number;
  absence: number;
  presence: number;
}

interface Candidates {
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

export interface GetElections {
  cities: Cities[];
  candidates: Candidates[];
  election: Election[];
}
