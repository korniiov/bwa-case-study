import IUser from './IUser';

interface IUserSearchResponse {
  total_count: number,
  incomplete_results: boolean,
  items: IUser[],
}

export default IUserSearchResponse;
