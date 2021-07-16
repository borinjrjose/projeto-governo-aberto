import React from 'react';

import Typography from '@material-ui/core/Typography';
import { Dialog, Container } from '@material-ui/core';

import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(5, 4),
  },
}));

function Modal({ children, open, onClose, title }) {
  const classes = useStyles();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <Container className={classes.content} maxWidth="xs">
        <Typography component="h2" variant="h5">
          { title }
        </Typography>

        {children}
      </Container>
    </Dialog>
  );
}

export default Modal;
