import * as React from 'react';
import { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';
import { useSession, signIn } from "next-auth/react";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';


const useStyles = makeStyles({
  container: {
    paddingTop: 70,
    maxWidth: 1200,
  },
  boxContent: {
    paddingTop: 70,
    paddingBottom: 10,
    display: 'flex',
    flexWrap: 'wrap',
    '& > :not(style)': {
      m: 1,
      height: '100%',
    },
  },
})

const marks = [
  {
    value: 1,
    label: '1명',
  },
  {
    value: 10,
    label: '10명',
  },
];

export default function card_add() {
    

    const { data: session, status } = useSession();
    console.log(`현재 세션 : ${JSON.stringify(session)}`);


    const [card, setCard] = useState ({
      title: '',
      content: '',
      recruitNum: 1,
    });

    const onChangeValue = (e) => {
      setCard({
        ...card,
        [e.target.name] : e.target.value,
      });
    };


    const submitCardHandler = (e) => {
      e.preventDefault();

      const reqData = {
        userNo: 1,
        title: card.title,
        content: card.content,
        recruitNum: card.recruitNum,
      }
      
      axios.post('/api/addCard', reqData, {
        headers: {
          'Content-type': 'application/json'
        },
      })
      .then(res => resultHandler(res));

    }

    const router = useRouter();
    const resultHandler = (res) => {
      if(res.data === 'OK') {
        alert('게시글이 등록되었습니다.');
        router.push('/');
      }
      else if(res.data === 'LOGIN') {
        alert('로그인 후에 이용 가능합니다.');
        router.push('/login');
      }
      else {
        alert('게시글 작성에 실패했습니다.')
      }
    };


    
    const styles = useStyles();

    return (
        <Container className={styles.container}>
          <Box className={styles.boxContent}>
            <Card className={styles.cardContent}>
              <Grid container spacing={2} sx = {{ padding: '2em'}}>
                <Grid item xs={12} sm={12} md={12} sx={{ bgcolor: 'none', padding: '1em' }}>
                  <Box
                    sx={{
                      width: 1200,
                      maxWidth: '100%',
                    }}
                  > 
                    <Typography fontSize="18px" fontWeight="600" padding="0 0 10px 0">
                      제목
                    </Typography>
                    <TextField fullWidth label="제목을 입력하세요." id="fullWidth" name="title" onChange={onChangeValue} />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12} sx={{ bgcolor: 'none', padding: '1em' }}>
                  <Box
                    sx={{
                      width: 1200,
                      maxWidth: '100%',
                    }}
                  >
                    <Typography fontSize="18px" fontWeight="600" padding="0 0 10px 0">
                      내용
                    </Typography>
                    <TextField 
                      fullWidth 
                      multiline 
                      label="내용을 입력하세요." 
                      id="fullWidth"
                      rows={16}
                      name="content"
                      onChange={onChangeValue}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12} sx={{ bgcolor: 'none', padding: '1em' }}>
                  <Box
                    sx={{
                      width: 1200,
                      maxWidth: '100%',
                    }}
                  >
                    <Typography fontSize="18px" fontWeight="600" padding="0 0 10px 0">
                      음원 링크 (사운드클라우드)
                    </Typography>
                    <TextField fullWidth label="SoundCloud 링크 삽입" placeholder="" id="fullWidth" name="soundcloud" onChange={onChangeValue} />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12} sx={{ bgcolor: 'none', padding: '1em' }}>
                  <Box
                    sx={{
                      width: 700,
                      maxWidth: '100%',
                    }}
                  >
                    <Typography display="inline" fontSize="18px" fontWeight="600" padding="0 0 10px 0">
                      모집 인원 :&nbsp;
                    </Typography>
                    <Typography display="inline" fontSize="18px" fontWeight="600" padding="0 0 10px 0">
                      {card.recruitNum}명
                    </Typography>
                    <Slider
                      aria-label="recruit"
                      defaultValue={1}
                      valueLabelDisplay="auto"
                      step={1}
                      marks={marks}
                      min={1}
                      max={10}
                      name="recruitNum"
                      onChange={onChangeValue}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12} sx={{ bgcolor: 'none', padding: '1em' }}>
                  <Box
                    sx={{
                      width: 700,
                      maxWidth: '100%',
                    }}
                  >
                    <Typography fontSize="18px" fontWeight="600" padding="0 0 10px 0">
                      모집 기간
                    </Typography>

                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12} sx={{ bgcolor: 'none', padding: '1em' }}>
                  <Box
                    sx={{
                      width: 1200,
                      maxWidth: '100%',
                    }}
                  >
                    <Button variant="contained" size="large" onClick={submitCardHandler}>
                      등록하기
                    </Button>
                  </Box>
                </Grid>

              </Grid>
            </Card>
          </Box>
        </Container>
    )
}