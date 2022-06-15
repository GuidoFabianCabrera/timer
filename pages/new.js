import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';

import { TimerContext } from './../store/timer';
import { Container, Grid } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  box: {
    border: '1px solid red',
  },
  gridContainer: {
    background: '#00000022',
    borderRadius: '15px',
  },
}));

function NewItem() {
  const router = useRouter();
  const classes = useStyles();
  const { addItem } = useContext(TimerContext);

  const [formData, setFormData] = useState({
    id: null,
    title: '',
    seconds: 0,
    timerOn: false,
    intervalTimer: null,
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addItem({ ...formData, id: Date.now() });
    router.push('/');
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        className={classes.gridContainer}
        padding={2}
        marginY={4}
        alignItems="center">
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={handleInputChange}
              name="title"
              required
            />
            <input
              type="number"
              onChange={handleInputChange}
              name="seconds"
              required
            />
            <input type="submit" value="submit" />
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NewItem;
