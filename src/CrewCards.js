import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { red } from '@mui/material/colors';
import Link from 'next/link';
import axios from 'axios';


const testCards = [
  {
    boardNo : 1,
    title: '제 비트에 같이 작업하실분! 피쳐링 필요하신분',
    userId : 'RE:ON',
    userImgUrl: 'images/user1.PNG',
    likeCount: 7,
    boardImgUrl : 'images/card1.PNG',
  },
  {
    boardNo : 2,
    title: '보컬or랩 같이 작업하실 분????',
    userId : '허슬',
    userImgUrl: 'images/user2.PNG',
    likeCount: 7,
    boardImgUrl : 'images/card2.PNG',
  },
  {
    boardNo : 3,
    title: '안녕하세요 제 비트에 피처링 해주실 래퍼분들 구합니다',
    userId : 'Jala Beatz',
    userImgUrl: 'images/user3.PNG',
    likeCount: 7,
    boardImgUrl : 'images/card3.PNG',
  },
  {
    boardNo : 4,
    title: '크루원 구합니다.',
    userId : 'THE COMMON',
    userImgUrl: 'images/Post-Malone.jpg',
    likeCount: 7,
    boardImgUrl : 'images/card4.PNG',
  },
  {
    boardNo : 5,
    title: '같이 작업하고 싶습니다!!',
    userId : 'Mr.Kim',
    userImgUrl: '',
    likeCount: 7,
    boardImgUrl : 'images/card-default.png',
  },
];

const useStyles = makeStyles({
  card: {
    minWidth: 320,
    position: 'relative',
    boxShadow: '0 8px 24px 0 rgba(0,0,0,0.12)',
    overflow: 'visible',
    borderRadius: '1.5rem',
    transition: '0.2s',
    '&:hover': {
      cursor: "pointer",
      transform: 'translateY(-5px)',
      '& $shadow': {
        bottom: '-1.5rem',
      },
      '& $shadow2': {
        bottom: '-2.5rem',
      },
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      zIndex: 0,
      display: 'block',
      width: '100%',
      bottom: -1,
      height: '100%',
      borderRadius: '1.5rem',
      backgroundColor: 'rgba(0,0,0,0.08)',
    },
  },
  main: {
    overflow: 'hidden',
    borderTopLeftRadius: '1.5rem',
    borderTopRightRadius: '1.5rem',
    zIndex: 1,
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      display: 'block',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(to top, #00112a, rgba(0,0,0,0))',
    },
  },
  content: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
    padding: '1.5rem 1.5rem 1rem',
  },
  avatar: {
    width: 48,
    height: 48,
  },
  tag: {
    display: 'inline-block',
    fontFamily: "'Sen', sans-serif",
    backgroundColor: '#ff5dac',
    borderRadius: '0.5rem',
    padding: '2px 0.5rem',
    color: '#fff',
    marginBottom: '0.5rem',
  },
  title: {
    fontFamily: "'Sen', sans-serif",
    fontSize: '2rem',
    fontWeight: 800,
    color: '#fff',
  },
  author: {
    zIndex: 1,
    position: 'relative',
    borderBottomLeftRadius: '1.5rem',
    borderBottomRightRadius: '1.5rem',
  },
  shadow: {
    transition: '0.2s',
    position: 'absolute',
    zIndex: 0,
    width: '88%',
    height: '100%',
    bottom: 0,
    borderRadius: '1.5rem',
    backgroundColor: 'rgba(0,0,0,0.06)',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  shadow2: {
    bottom: 0,
    width: '72%',
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  userId: {
    fontSize: '13',
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
});




export default function CrewCards() {
  

  const styles = useStyles();
  // const mediaStyles = useCoverCardMediaStyles();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get('api/getAllCards')
    .then(res => {
      setCards(res.data);
    })
  }, []);


  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={8}>
        {cards.map((card) => (
          <Grid item key={card.cardId} xs={12} sm={6} md={4}>

            <Link href={`./view/${card.cardId}`}>
              <Card className={styles.card}>
                <Box className={styles.main} minHeight={300} position={'relative'}>
                  <CardMedia
                    image="images/card-default.png"
                    component="img"
                    height="300"
                  />
                  <div className={styles.content}>
                    <div className={styles.tag}>New</div>
                    <Typography variant={'h2'} className={styles.title}>
                      {card.title}
                    </Typography>
                  </div>
                </Box>
                
                <Box
                  className={styles.author}
                  m={0}
                  p={3}
                  pt={2}
                  gap={2}
                  bgcolor={'common.white'}
                >
                  <div>
                    <Avatar
                      className={styles.avatar}
                      src={`images/user3.PNG`}
                    ></Avatar>
                    {/* <AccountCircleRoundedIcon 
                      color='action'
                      sx={{ fontSize: 50 }}
                    /> */}
                    <span className={styles.userId}>{``}</span>
                  </div>
                  <div>
                    
                    <p>{card.createAt.substring(0, 10).replaceAll('-','.')}
                      <FavoriteBorderIcon className={styles.favoIcon}/>
                      <ShareIcon className={styles.shareIcon}/>

                    </p>
                  </div>
                </Box>
                <div className={styles.shadow} />
                <div className={`${styles.shadow} ${styles.shadow2}`} />
              </Card>
            </Link>

          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
