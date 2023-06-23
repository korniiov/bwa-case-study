import IUser from '../../api/interfaces/IUser';

interface IUserItem {
  user: IUser
}

const UserItem = ({ user }: IUserItem) => (
  <li>
    <img src={user.avatar_url} alt="Avatar" />
    <span>Username: {user.login}</span>
  </li>
)

export default UserItem;
