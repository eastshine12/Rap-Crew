import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const navStyle = {
  background : '#3c3c3c'
}

const CustomButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  borderColor: '#ffffff6b',
  color: '#ffffff6b',
});

const useStyles = makeStyles({
  logo: {
    width: 115,
    height: 32,
    margin: '10px 0px 0px 15px',
    cursor: 'pointer',
    // backgroundColor: 'white'
  },
});


export default function Nav(props) {

  const styles = useStyles();
  const router = useRouter();

  const goMain = function() {
    router.push("/");
  }

  const goLogin = () => {
    router.push('/login');
  }

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar style={navStyle}>
          <Toolbar>
            {/* <CameraIcon sx={{ mr: 2 }} /> */}
            <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }} noWrap>
              {/* <Link href="/">Rap-Crew</Link> */}
              <img src="/images/logo4.png" alt="logo" className={styles.logo} onClick={goMain} />
            </Typography>
            <CustomButton variant="outlined" onClick={goLogin}>로그인</CustomButton>
          </Toolbar>
          
        </AppBar>
      </ElevationScroll>
    </>
  )
}
