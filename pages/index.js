import { useContext } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';

import { TimerContext } from '../store/timer';
import { Container, Fab, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import TimerItem from './../components/timerItem';

const useStyles = makeStyles((theme) => ({
  add: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    margin: '50px',
    transform: 'scale(1.2)',
    [theme.breakpoints.up('md')]: {
      transform: 'scale(1)',
    },
  },
}));

const Home = () => {
  const router = useRouter();
  const classes = useStyles();
  const { data } = useContext(TimerContext);

  return (
    <Container maxWidth="md">
      <Grid
        container
        padding={2}
        marginY={4}
        rowSpacing={2}
        columnSpacing={4}
        alignItems="center">
        <Grid item xs={12} textAlign="end">
          <div className={classes.add}>
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => router.push('/new')}>
              <AddIcon />
            </Fab>
          </div>
        </Grid>

        {data.length == 0 && (
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4">Add timer</Typography>
          </Grid>
        )}

        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <TimerItem item={item} index={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
