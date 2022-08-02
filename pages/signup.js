import React from 'react';
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

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


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


const 이용약관 = "제 1조 목적\n본 약관은 Rap-Crew(이하 \"회사\")에서 운영하는 커뮤니티 서비스를 이용함에 있어 회사와 커뮤니티 서비스를 이용하는 커뮤니티 구성원 사이에 커뮤니티 개설 및 운영에 관한 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.\n제 2조 용어의 정의\n본 약관에서 사용되는 주요한 용어는 다음과 같습니다."


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function signup() {
        
    const styles = useStyles();


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [user, setUser] = useState ({
      userId: '',
      password: '',
      password2: '',
      email: '',
      agreeChk: false,
    });

    const onChangeText = (e) => {
      setUser({
        ...user,
        [e.target.name] : e.target.value,
      });
    };

    const onChangeValue = (e) => {
      setUser({
        ...user,
        [e.target.name] : e.target.checked,
      });
    };


    const [confirm, setConfirm] = React.useState({
      state: false,
      msg: '',
    });

    const handleClickSnackbar = (msg) => {
      setConfirm({
        state: true,
        msg,
      });
    };
  
    const handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setConfirm({
        state: false,
        msg: '',
      });
    };

    const submitUserHandler = (e) => {
      e.preventDefault();

      if(!user.userId) {
        handleClickSnackbar('아이디를 입력해주세요.');
      } else if(!(user.password && user.password2)) {
        handleClickSnackbar('비밀번호를 입력해주세요.');
      } else if(user.password !== user.password2) {
        handleClickSnackbar('입력한 비밀번호가 서로 다릅니다. 다시 확인해주세요.');
      }else if(!user.email) {
        handleClickSnackbar('이메일을 입력해주세요.');
      } else if(!user.agreeChk) {
        handleClickSnackbar('필수항목에 체크해주세요.');
      } else {
        
        const reqData = {
          userId: user.userId,
          password: user.password,
          email: user.email,
          agreement: user.agreeChk,
        }
        
        axios.post('/api/addUser', reqData, {
          headers: {
            'Content-type': 'application/json'
          },
        })
        .then(res => resultHandler(res));
        
      }
    };

    const router = useRouter();
    const resultHandler = (res) => {
      if(res.data === 'OK') {
        alert('회원가입이 완료되었습니다.');
        router.push('/login');
      } else {
        alert('회원가입에 실패했습니다.')
      }
    };


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
                      회원가입
                    </Typography>
                    <Box sx={{ mt: 3 }}>
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
                            id="password"
                            label="비밀번호"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            onChange={onChangeText}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="password2"
                            label="비밀번호 확인"
                            name="password2"
                            type="password"
                            autoComplete="new-password"
                            onChange={onChangeText}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="email"
                            label="이메일"
                            id="email"
                            autoComplete="email"
                            onChange={onChangeText}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={<Checkbox value="allowService" color="primary" name="agreeChk" onChange={onChangeValue}/>}
                            label="[필수] 서비스 이용 정책에 대한 동의"
                          />
                          <Button onClick={handleOpen}>자세히 보기</Button>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Typography id="modal-modal-title" variant="h6" component="h2">
                              서비스 이용 정책에 대한 동의
                              </Typography>
                              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {이용약관}
                              </Typography>
                            </Box>
                          </Modal>
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={submitUserHandler}
                      >
                        회원가입하기
                      </Button>
                      
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
            </Card>
          </Box>
          <Snackbar open={confirm.state} autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
              {confirm.msg}
            </Alert>
          </Snackbar>
        </Container>
    )
}