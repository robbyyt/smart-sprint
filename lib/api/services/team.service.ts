import axios from 'axios';

export const createTeam = async (name: string) => {
  return axios.post('/api/team', { name });
};
