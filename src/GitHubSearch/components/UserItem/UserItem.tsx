import ListItem from '@mui/material/ListItem';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

import IUser from '../../api/interfaces/IUser';

interface IUserItem {
  user: IUser
}

const UserItem = ({ user }: IUserItem) => (
  <ListItem>
    <Card sx={{ display: 'flex', width: '100%' }}>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={user.avatar_url}
        alt={`${user.login } avatar`}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {user.login}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Type: {user.type}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" href={user.html_url} target="_blank">
            GitHub page
          </Button>
        </CardActions>
      </Box>
    </Card>
  </ListItem>
);

export default UserItem;
