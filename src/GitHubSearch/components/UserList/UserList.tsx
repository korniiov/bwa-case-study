import List from '@mui/material/List';

import UserItem from '../UserItem';
import UserItemSkeleton from '../UserItem/UserList.skeleton';
import IUser from '../../api/interfaces/IUser';

interface IUserList {
  users?: IUser[],
  isLoading?: boolean,
}

const UserList = ({ users, isLoading = false }: IUserList) => (
  <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'scroll' }}>
    {
      isLoading ? (
        [...Array(3).keys()].map((i) => <UserItemSkeleton key={i} />)
      ) : (
        users?.map(user => <UserItem user={user} key={user.id} />)
      )
    }
  </List>
)

export default UserList;
