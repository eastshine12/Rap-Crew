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
})


const 이용약관 = "제 1조 목적\n본 약관은 Rap-Crew(이하 \"회사\")에서 운영하는 커뮤니티 서비스를 이용함에 있어 회사와 커뮤니티 서비스를 이용하는 커뮤니티 구성원 사이에 커뮤니티 개설 및 운영에 관한 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.\n제 2조 용어의 정의\n본 약관에서 사용되는 주요한 용어는 다음과 같습니다."


export default function signup() {
    
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      회원가입
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
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="userPwd"
                            label="비밀번호 확인"
                            name="userPwdConfirm"
                            type="password"
                            autoComplete="new-password"
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
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={<Checkbox value="allowService" color="primary" />}
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
                      >
                        회원가입하기
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