import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from "axios";
import { useSession, signIn } from "next-auth/react";

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
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const useStyles = makeStyles({
  avatarSmall: {
    width: 28,
    height: 28,
  },
});



/*
const replyData = [
  {
    'replyId' : 1,
    'userId' : '닉네임1',
    'content' : '비트가 너무 좋네요!! 같이 작업하고 싶어요',
    'createdAt' : '3분 전',
    'goodCount' : 13
  },
  {
    'replyId' : 2,
    'userId' : '닉네임2',
    'content' : '저도 참여하고 싶습니다~',
    'createdAt' : '1시간 전',
    'goodCount' : 8
  },
  {
    'replyId' : 3,
    'userId' : '닉네임3',
    'content' : '잘 듣고 가요',
    'createdAt' : '3시간 전',
    'goodCount' : 3
  },
]
*/


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));



const ReplyBtn = (disabled) => {
  return <Button disabled={disabled} variant="contained">등록</Button>
}



const changeTimeSet = (time) => {
  const today = new Date();
  const timeValue = new Date(time);

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  const betweenTimeHour = Math.floor(betweenTime / 60);
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);

  if (betweenTime < 1) return '방금 전';
  if (betweenTime < 60) return `${betweenTime}분 전`;
  if (betweenTimeHour < 24) return `${betweenTimeHour}시간 전`;
  if (betweenTimeDay < 365) return `${betweenTimeDay}일 전`;

  return `${Math.floor(betweenTimeDay / 365)}년 전`;
};





export default function Reply({replys}) {

  const styles = useStyles();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { cardId }  = router.query;
  const [repls, setRepls] = useState(replys);
  const [replyContent, setReplyContent] = useState('');
  const [replyFocus, setReplyFocus] = useState(false);



  const refreshReply = async () => {
    try {
      const res = await axios.get(`/api/getReply/${cardId}`);

      if(res.status === 200) {
        setRepls(res.data);
      }
    } catch(err) {
      console.log(err);
    }
  };



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
      refreshReply();
      setReplyContent('');
    }
    else if(res.data === 'LOGIN') {
      alert('로그인 후에 이용 가능합니다.');
      router.push('/login');
    }
    else {
      alert('댓글 작성에 실패했습니다.')
    }
  };


  const deleteReplyHandler = (reply) => {
    
    if (confirm("댓글을 삭제하시겠습니까?")) {
      console.log(JSON.stringify(reply));
      axios.delete('/api/deleteReply', {data : reply}, {
        headers: {
          'Content-type': 'application/json'
        },
      })
      .then(res => deleteResultHandler(res));
    }
  };



  const deleteResultHandler = (res) => {
    if(res.data === 'OK') {
      // alert('댓글이 삭제되었습니다.');
      refreshReply();
    }
    else if(res.data === 'LOGIN') {
      alert('로그인 후에 이용 가능합니다.');
      router.push('/login');
    }
    else {
      alert('댓글 삭제에 실패했습니다.')
    }
  };




  return (
    <>
    <Typography
      sx={{ 
        fontSize: 18,
        mb: 1,
      }}
    >
      댓글 <b>{repls.length}</b>
    </Typography>
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
              value={replyContent}
            />
            <Button variant="contained" onClick={replyBtnClickHandler}>등록</Button>
          </div>
        </Box>

        <Stack 
          spacing={0}
          direction="column"
          divider={<Divider orientation="vertical" flexItem />}
        >

          {!repls? "" : repls.map((data) => (

            <Item key={data.replyId}
            sx = {{
              boxShadow: 'none'
            }}
            > 
              <Grid container>
                <Grid item xs={12} sm={12} md={12} sx={{pt : 1}}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <Avatar
                      className={styles.avatarSmall}
                      src= {"/images/user1.PNG"} 
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
                    {data.tb_user.userId}
                    </Typography>
                    { session && data.userNo === session.user.userNo ? 
                      (<>
                        &nbsp;&nbsp;
                        <IconButton aria-label="update" >
                          <EditIcon color="primary" fontSize="small"/>
                        </IconButton>
                        <IconButton aria-label="delete" onClick={()=> deleteReplyHandler(data)}>
                          <DeleteIcon fontSize="small"/>
                        </IconButton>
                      </>) : '' 
                    }
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
                    {changeTimeSet(data.createAt)}
                    </Typography>
                    <ThumbUpOffAltIcon style={{height: '0.8em'}}/> {data.goodCount?data.goodCount:0}
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
