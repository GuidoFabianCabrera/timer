import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';

import { TimerContext } from '../store/timer';
import { Container, Grid } from '@mui/material';

import TimerItem from './../components/timerItem';

const useStyles = makeStyles((theme) => ({
  box: {
    border: '1px solid red',
  },
  gridContainer: {
    background: '#00000022',
    borderRadius: '15px',
  },
}));

const Home = () => {
  const router = useRouter();
  const classes = useStyles();
  const { data, list } = useContext(TimerContext);

  return (
    <Container maxWidth="sm">
      <Grid
        container
        className={classes.gridContainer}
        padding={2}
        marginY={4}
        alignItems="center">
        <Grid item xs={12} textAlign="end">
          <button onClick={() => router.push('/new')}>add</button>
        </Grid>
        {list.map((item, index) => (
          <Grid item xs={4} key={item.id}>
            <TimerItem item={item} index={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
