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

const Update = () => {
  const classes = useStyles();
  const router = useRouter();
  const { updateItem, getDataById } = useContext(TimerContext);

  const [formData, setFormData] = useState({
    id: null,
    title: '',
    seconds: 0,
  });

  useEffect(() => {
    if (!router.isReady) return;

    setFormData(getDataById(router.query.id));
  }, [router.isReady]);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateItem(formData);
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
              value={formData.title}
              required
            />
            <input
              type="number"
              onChange={handleInputChange}
              name="seconds"
              value={formData.seconds}
              required
            />
            <input type="submit" value="submit" />
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Update;
