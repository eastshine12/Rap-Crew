import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from "axios";

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const useStyles = makeStyles({
  avatarSmall: {
    width: 28,
    height: 28,
  },
});

const replyData = [
  {
    'replyNo' : 1,
    'userId' : '닉네임1',
    'content' : '비트가 너무 좋네요!! 같이 작업하고 싶어요',
    'createdAt' : '3분 전',
    'goodCount' : 13
  },
  {
    'replyNo' : 2,
    'userId' : '닉네임2',
    'content' : '저도 참여하고 싶습니다~',
    'createdAt' : '1시간 전',
    'goodCount' : 8
  },
  {
    'replyNo' : 3,
    'userId' : '닉네임3',
    'content' : '잘 듣고 가요',
    'createdAt' : '3시간 전',
    'goodCount' : 3
  },
]


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const ReplyBtn = (disabled) => {
  return <Button disabled={disabled} variant="contained">등록</Button>
}

export default function Reply() {

  const styles = useStyles();
  const router = useRouter();
  const { cardId }  = router.query;
  const [replyContent, setReplyContent] = useState('');
  const [replyFocus, setReplyFocus] = useState(false);
  
  const replyOnChangeHandler = (e) => {
    setReplyContent(e.target.value);
    // console.log(replyContent);
  };

  const replyBtnClickHandler = (e) => {
    e.preventDefault();

    const reqData = {
      cardId,
      content: replyContent,
    }

    axios.post('/api/addReply', reqData, {
      headers: {
        'Content-type': 'application/json'
      },
    })
    .then(res => resultHandler(res));
  };

  const resultHandler = (res) => {
    if(res.data === 'OK') {
      alert('댓글이 등록되었습니다.');
    }
    else if(res.data === 'LOGIN') {
      alert('로그인 후에 이용 가능합니다.');
      router.push('/login');
    }
    else {
      alert('댓글 작성에 실패했습니다.')
    }
  };


  return (
    <>
    <Grid container sx = {{ padding: '5em, 1em, 1em, 1em' }}>
      <Box sx={{ width: '100%' }}>

        <Box sx={{ width: '100%'}}>
          <div style={{display: 'flex', verticalAlign: 'middle', padding: '0.5em 0 1em 0'}}>
            <Avatar sx={{margin: '0.3em'}}>

            </Avatar>

            <TextField fullWidth multiline
              label="댓글 입력"
              placeholder='댓글을 입력하세요.' 
              id="fullWidth"
              sx={{
                ml: 2
              }} 
              onChange={replyOnChangeHandler}
            />
            <Button variant="contained" onClick={replyBtnClickHandler}>등록</Button>
          </div>
        </Box>

        <Stack 
          spacing={0}
          direction="column"
          divider={<Divider orientation="vertical" flexItem />}
        >

          {replyData.map((data) => (

            <Item key={data.replyNo}
            sx = {{
              boxShadow: 'none'
            }}
            > 
              <Grid container>
                <Grid item xs={12} sm={12} md={12} sx={{pt : 1}}>
                  <div style={{display: 'flex'}}>
                    <Avatar
                      className={styles.avatarSmall}
                      src= {"/images/user" + data.replyNo + ".PNG"} 
                    >
                    </Avatar>
                    <Typography
                      sx={{ 
                        fontSize: 17,
                        fontWeight: 700,
                        color: 'black',
                        pl: 1.5
                      }}
                    >
                    {data.userId}
                    </Typography>
                  </div>
                  
                </Grid>
                <Grid item xs={12} sm={12} md={12} sx={{pt: 0.3, pl: 1,}}>
                  <Typography
                    sx={{ 
                      fontSize: 15,
                      pl: 4,
                      color: 'black'
                    }}
                  >
                  {data.content}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} sx={{pt: 1, pl: 1}}>
                  <div style={{display: 'flex'}}>
                    <Typography
                      sx={{ 
                        fontSize: 13,
                        pl: 4,
                        pr: 2,
                      }}
                    >
                    {data.createdAt}
                    </Typography>
                    <ThumbUpOffAltIcon style={{height: '0.8em'}}/> {data.goodCount}
                    <Typography
                      sx={{ 
                        fontSize: 13,
                        pl: 3,
                      }}
                    >
                    답글
                    </Typography>
                  </div>
                </Grid>
              </Grid>  
            </Item>

          ))}
          
        </Stack>
      </Box>
    </Grid>
    </>
  )
}
