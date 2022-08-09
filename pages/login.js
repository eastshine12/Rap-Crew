import * as React from 'react';
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/router'
import { useSession, signIn } from "next-auth/react";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';


const theme = createTheme();

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles({
  container: {
    paddingTop: 70,
    maxWidth: 1200,
  },
  boxContent: {
    paddingTop: 50,
    paddingBottom: 100,
    display: 'flex',
    flexWrap: 'wrap',
  },
  logoImg: {
    width: 80,
    height: 80,
  },
})


export default function login() {
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const router = useRouter();
    const { data: session, status } = useSession();
    const styles = useStyles();

    const [user, setUser] = useState ({
      userId: '',
      password: '',
    });

    const onChangeText = (e) => {
      setUser({
        ...user,
        [e.target.name] : e.target.value,
      });
    };

    const submitUserHandler = async (e) => {
      e.preventDefault();

      console.log(`user : ${JSON.stringify(user)}`);
    
      const reqData = {
        redirect : false,
        userId: user.userId,
        password: user.password,
      };
      
      const result = await signIn("credentials", reqData);
      if (!result.error) {
        router.replace("/");
      };
    };

    if (status === "authenticated") {
      router.replace("/");
      return (
        <div>
          <h1>Log in</h1>
          <div>You are already logged in.</div>
          <div>Now redirect to main page.</div>
        </div>
      );
    }

    return (
        <Container className={styles.container}>
          <Box className={styles.boxContent}  sx = {{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}>
            <Card className={styles.cardContent} >
              <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ 
                      width: 80,
                      height: 80, 
                      m:2,
                    }}>
                      <img className={styles.logoImg} src={'/images/logo2.png'} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      로그인
                    </Typography>
                    <Box component="form" noValidate onSubmit={submitUserHandler} sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            autoComplete="given-name"
                            name="userId"
                            required
                            fullWidth
                            id="userId"
                            label="아이디"
                            autoFocus
                            onChange={onChangeText}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="userPwd"
                            label="비밀번호"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            onChange={onChangeText}
                          />
                        </Grid>
                        
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        로그인
                      </Button>
                      
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
            </Card>
          </Box>
        </Container>
    )
}