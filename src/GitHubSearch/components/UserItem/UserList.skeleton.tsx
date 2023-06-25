import ListItem from '@mui/material/ListItem';

import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const UserItemSkeleton = () => (
  <ListItem>
    <Card sx={{ display: 'flex', width: '100%' }}>
      <Skeleton variant="rectangular" width={150} height={150} />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            <Skeleton animation="wave" width="100%" />
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            <Skeleton animation="wave" width={100} />
          </Typography>
        </CardContent>
        <CardActions>
          <Skeleton animation="wave" height={10} width={50} />
        </CardActions>
      </Box>
    </Card>
  </ListItem>
)


export default UserItemSkeleton;
