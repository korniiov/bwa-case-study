import UserItem from '../UserItem';
import IUser from '../../api/interfaces/IUser';

interface IUserList {
  users?: IUser[],
}

const UserList = ({ users = [] }: IUserList) => (
  <ul>
    {
      users?.map(user => <UserItem user={user} key={user.id} />)
    }
  </ul>
)

export default UserList;
