import { useContext } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  Container,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { TimerContext } from './../store/timer';

const useStyles = makeStyles((theme) => ({}));

function NewItem() {
  const router = useRouter();
  const classes = useStyles();
  const { addItem } = useContext(TimerContext);

  const formik = useFormik({
    initialValues: {
      title: '',
      hour: 0,
      minute: 0,
      second: 0,
    },

    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      hour: Yup.number().min(0, 'Min value 0.').max(59, 'Max value 59.'),
      minute: Yup.number()
        .min(0, 'Min value 0.')
        .max(59, 'Max value 59.')
        .notOneOf(['']),
      second: Yup.number().min(0, 'Min value 0.').max(59, 'Max value 59.'),
      // .when(['hour', 'minute'], {
      //   is: (hour, minute) => Boolean(hour) + Boolean(minute) == 0,
      //   then: Yup.number().min(1, 'Min value 1.'),
      // }),
    }),

    onSubmit: (formData) => {
      const seconds =
        formData.hour * 60 * 60 + formData.minute * 60 + formData.second;

      addItem({
        id: Date.now(),
        title: formData.title,
        seconds,
        timerOn: false,
        intervalTimer: null,
      });

      router.push('/');
    },
  });

  return (
    <Container maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <Grid container marginY={4} spacing={3} alignItems="center">
          <Grid item xs={12}>
            <IconButton variant="text" onClick={() => router.push('/')}>
              <ArrowBackIosNewIcon />
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Title"
              variant="outlined"
              name="title"
              onChange={formik.handleChange}
              fullWidth
              error={formik.errors.title && true}
              helperText={formik.errors.title}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Hour(s)"
              variant="outlined"
              type="number"
              name="hour"
              onChange={formik.handleChange}
              fullWidth
              error={formik.errors.hour && true}
              helperText={formik.errors.hour}
              inputProps={{ min: 0, max: 59 }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Minute(s)"
              variant="outlined"
              type="number"
              name="minute"
              onChange={formik.handleChange}
              fullWidth
              error={formik.errors.minute && true}
              helperText={formik.errors.minute}
              inputProps={{ min: 0, max: 59 }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Second(s)"
              variant="outlined"
              type="number"
              name="second"
              onChange={formik.handleChange}
              fullWidth
              error={formik.errors.second && true}
              helperText={formik.errors.second}
              inputProps={{ min: 0, max: 59 }}
            />
          </Grid>

          {formik.values.hour + formik.values.minute + formik.values.second ===
            0 && (
            <Grid item xs={12}>
              <FormHelperText error sx={{ textAlign: 'center' }}>
                Minimum timer of 1s
              </FormHelperText>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={
                !Boolean(
                  formik.values.title !== '' &&
                    (Boolean(formik.values.hour) ||
                      Boolean(formik.values.minute) ||
                      Boolean(formik.values.second))
                )
              }>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default NewItem;
