import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';

import { TimerContext } from './../../store/timer';
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
  });

  const handleInputChange = (event) => {
    setFormData({
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addItem({ ...formData, id: new Date() });
  };

  console.log(formData);

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
              placeholder="title"
              name="title"
              required
            />
            <input
              type="number"
              onChange={handleInputChange}
              placeholder="seconds"
              name="seconds"
              required
            />
            <input
              type="submit"
              value="submit"
              disabled={formData.title == '' && formData.seconds == 0}
            />
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NewItem;
