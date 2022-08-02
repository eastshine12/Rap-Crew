import * as React from 'react';
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/router'

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

    const [card, setCard] = useState ({
      title: '',
      content: '',
    });

    const onChangeText = (e) => {
      setCard({
        ...card,
        [e.target.name] : e.target.value,
      });
    };

    const submitCardHandler = (e) => {
      e.preventDefault();

      console.log(`title : ${card.title}`);
      console.log(`content : ${card.content}`);
    
      const reqData = {
        userNo: 1,
        title: card.title,
        content: card.content,
      }
      
      axios.post('/api/addCard', reqData, {
        headers: {
          'Content-type': 'application/json'
        },
      })
      .then(res => resultHandler(res));

    }


    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
    };


    const router = useRouter();
    const resultHandler = (res) => {
      if(res.data === 'OK') {
        alert('게시글이 등록되었습니다.');
        router.push('/');
      } else {
        alert('게시글 작성에 실패했습니다.')
      }
    };


    
    const styles = useStyles();

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
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="userPwd"
                            label="비밀번호"
                            name="userPwd"
                            type="password"
                            autoComplete="new-password"
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