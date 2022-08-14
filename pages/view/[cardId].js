import React, { useEffect, useState } from 'react';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/router';
import axios from 'axios';
import Reply from '../../src/reply';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import { border, padding } from '@mui/system';
import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


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
  thumbnail: {
    width: '100%',
    borderRadius: 10,
  },
  favoIcon: {
    color: '#ff7171',
    float: 'right',
  },
  shareIcon: {
    color: '#acacac',
    float: 'right',
    marginRight: 8,
  },
  avatar: {
    width: 48,
    height: 48,
  },
  avatarSmall: {
    width: 28,
    height: 28,
  },
  avatarGroup: {
    height: 70,
  },
  cardContent : {
    width: '100%',
    height: '140px',
    color: 'black',
    borderRadius: 5,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    border: 1,
    borderColor: '#cccccc',
    '& > .MuiBox-root > .MuiBox-root': {
      p: 3,
      borderRadius: 2,
      fontSize: '0.875rem',
      fontWeight: '700',
    },
  }
});




export async function getServerSideProps({ req, query }) {
  
  try {
    const res = await axios.get(`http://${req.headers.host}/api/getCard/${query.cardId}`);

    if(res.status === 200) {
      const card = res.data;
      return {
        props : { card },
      }
    }
  } catch(err) {
    console.log(err);
    return { props: {} };
  }
}



export default function card_view({ card }) {
  
  const styles = useStyles();
  const router = useRouter();
  
  const [title, content, userId, createAt] = card && [card.title, card.content, card.userId, card.createAt];

  const { cardId } = router.query;
  const { data: session, status } = useSession();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = (variant) => () => {
      enqueueSnackbar('참여 요청이 완료되었습니다.', {variant});
  };

  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    if(!router.isReady) return;
  }, []);


  const deleteCardHandler = () => {
    
    if (confirm("게시글을 삭제하시겠습니까?")) {
      axios.delete('/api/deleteCard', {
          data:{ cardId }
        }, {
          headers: {
            'Content-type': 'application/json'
          },
        })
        .then(res => deleteResultHandler(res));
    }
  };

  const deleteResultHandler = (res) => {
    if(res.data === 'OK') {
      alert('게시글이 삭제되었습니다.');
      router.push('/');
    }
    else if(res.data === 'LOGIN') {
      alert('로그인 후에 이용 가능합니다.');
      router.push('/login');
    }
    else {
      alert('게시글 삭제에 실패했습니다.')
    }
  };


  return (
    <Container className={styles.container}>
      <Box className={styles.boxContent}>
        <Card className={styles.cardContent}>
          <Grid container spacing={2} sx = {{ padding: '2em'}}>

            <Grid item xs={12} sm={12} md={7} sx={{ bgcolor: 'none', padding: '1em' }}>
              <img className={styles.thumbnail} src={`/images/card1.PNG`} />
            </Grid>

            <Grid container item md={5}>

              <Grid item xs={12} sm={12} md={12} sx={{ 
                bgcolor: 'none', 
                padding: '0 0em 0.7em 0',
                }}
              >
                <Stack direction="row">

                  <Typography
                  sx={{ 
                    fontSize: 30,
                    fontWeight: 700,
                  }}
                  >
                  {title}
                  </Typography>

                  { cardData.userNo === session?.user.userNo ? 
                  (<>
                    <IconButton aria-label="update">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={deleteCardHandler}>
                      <DeleteIcon />
                    </IconButton>
                  </>) : '' }

                </Stack>

              </Grid>

              <Grid item xs={12} sm={12} md={12} sx={{ 
                bgcolor: 'none', 
                padding: '0 1em 2em 0'
                }}
              >
                <div>
                  <Typography
                    sx={{ 
                      fontSize: 20,
                      fontWeight: 600
                    }}
                  >
                    { userId }
                    <FavoriteBorderIcon className={styles.favoIcon}/>
                    <ShareIcon className={styles.shareIcon}/>
                  </Typography>
                  <Typography
                    sx={{ 
                      fontSize: 15,
                    }}
                  >
                    { String(createAt).substring(0, 10).replaceAll('-','.') }
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} sx={{ 
                bgcolor: 'none', 
                padding: '0 1em 1em 0'
                }}
              >
                <iframe width="100%" height="140" scrolling="no" frameBorder="no" allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/671765165&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true">
                </iframe>
              </Grid>
              
            </Grid>

            <Grid item xs={12} sm={12} md={7}
              sx={{ 
                bgcolor: 'none',
                pb: 4,
              }}
            > 
              <Box
                sx={{
                  minHeight: 300,
                  borderRadius: 3,
                  border: 1,
                  borderColor: 'gray',
                  padding: '1em',
                  mr: '1em'
                }}
              >
                <Typography
                  sx={{ 
                    fontSize: 16,
                  }}
                >
                {content}
                </Typography>
              </Box>
            </Grid>


            <Grid item xs={12} sm={12} md={5} sx={{ bgcolor: 'none',}}>
              <Grid container sx = {{ padding: '0 1em 1em 0' }}>
                <Grid item xs={12} sm={12} md={12} sx={{pb: 3,}}>
                  <Typography
                    sx={{ 
                      fontSize: 17,
                      fontWeight: 600
                    }}
                  >
                  참여중인 인원
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <span>리더</span>
                </Grid>
                <Grid item xs={8} sm={8} md={8}>
                  <span>멤버</span>
                </Grid>
                

                <Grid item xs={4} sm={4} md={4} sx={{pt : 1}}>
                  <Avatar
                    className={styles.avatar}
                    src="/images/user1.PNG"
                  >
                  </Avatar>
                </Grid>
                
                <Grid item xs={8} sm={8} md={8} sx={{pt : 1}}>
                  <AvatarGroup sx={{float: 'left'}} max={4}>
                    <Avatar className={styles.avatar} alt="Remy Sharp" src="/images/user3.PNG" />
                    <Avatar className={styles.avatar} alt="Travis Howard" src="/images/user2.PNG" />
                    <Avatar className={styles.avatar} alt="Cindy Baker" src="/images/user4.PNG" />
                    <Avatar className={styles.avatar} alt="Agnes Walker" src="/images/user4.PNG" />
                    <Avatar className={styles.avatar} alt="Trevor Henderson" src="/images/user2.PNG" />
                  </AvatarGroup>
                </Grid>

                <Grid item xs={12} sm={12} md={12} sx={{pt : 14}}>
                  <Button variant="contained" fullWidth color='info'
                    onClick={handleClick('success')}
                    sx={{
                      fontSize: '1.1em',
                      height: '3em',
                      fontWeight: 700
                    }}>참여 요청하기</Button>
                </Grid>

              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12} sx={{ bgcolor: 'none', margin: '3em 1em 1em 0' }}>
              <Typography
                sx={{ 
                  fontSize: 18,
                  mb: 1,
                }}
              >
                댓글 <b>3</b>
              </Typography>
              
              <Reply /> 
            </Grid>

          </Grid>
        </Card>
      </Box>
    </Container>
  );
}

