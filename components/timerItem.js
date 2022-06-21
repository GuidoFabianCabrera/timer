import { useContext, useState } from 'react';
import { makeStyles } from '@mui/styles';

import { TimerContext } from '../store/timer';
import { useRouter } from 'next/router';
import {
  Button,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const useStyles = makeStyles((theme) => ({
  card: {
    border: '1px solid #132f4c',
    background: '#001e3c',
    borderRadius: '10px',
    textAlign: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  timer: {
    padding: '20px',
  },
  text: {
    marginBottom: '5px',
  },
  buttonReset: {
    marginLeft: '10px',
  },
  actions: {
    position: 'absolute',
    top: '0',
    right: '0',
    padding: '10px 10px 0 0',
  },
}));

const timerItem = ({ item, index }) => {
  const classes = useStyles();
  const router = useRouter();
  const { removeItem, startTimer, stopTimer, resetTimer, timerFormat } =
    useContext(TimerContext);

  //--------------------------------------------

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const timer = timerFormat(item.timer);

  return (
    <div className={classes.card}>
      <div className={classes.timer}>
        <div className={classes.actions}>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            disabled={item.timerOn}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            <MenuItem
              onClick={() => {
                handleClose();
                router.push(`/${item.id}/update`);
              }}>
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                removeItem(index);
              }}>
              Delete
            </MenuItem>
          </Menu>
        </div>

        <Typography className={classes.text} variant="h4">
          {item.title}
        </Typography>
        <Typography className={classes.text} variant="body1" component="div">
          {timer
            .map((v) => (v < 10 ? '0' + v : v))
            .filter((v, i) => v !== '00' || i > 0)
            .join(':')}
        </Typography>

        {!item.timerOn && item.timer > 0 && (
          <Button
            variant="contained"
            size="small"
            onClick={() => startTimer(index)}>
            Start
          </Button>
        )}
        {item.timerOn && (
          <Button
            variant="contained"
            size="small"
            onClick={() => stopTimer(index, item)}>
            Stop
          </Button>
        )}
        {(item.timerOn || item.timer < item.seconds) && (
          <Button
            className={classes.buttonReset}
            variant="outlined"
            size="small"
            onClick={() => resetTimer(index)}
            disabled={item.timerOn}>
            Reset
          </Button>
        )}
      </div>

      <LinearProgress
        variant="determinate"
        color="primary"
        value={Math.abs((item.timer * 100) / item.seconds - 100)}
      />
    </div>
  );
};

export default timerItem;
