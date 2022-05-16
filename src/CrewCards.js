import * as React from 'react';
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



const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const useStyles = makeStyles({
  card: {
    minWidth: 320,
    position: 'relative',
    boxShadow: '0 8px 24px 0 rgba(0,0,0,0.12)',
    overflow: 'visible',
    borderRadius: '1.5rem',
    transition: '0.4s',
    '&:hover': {
      transform: 'translateY(-2px)',
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
      background: 'linear-gradient(to top, #014a7d, rgba(0,0,0,0))',
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

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={8}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>

            <Card className={styles.card}>
              <Box className={styles.main} minHeight={300} position={'relative'}>
                <CardMedia
                  image='images/card-default.png'
                  component="img"
                  height="300"
                />
                <div className={styles.content}>
                  <div className={styles.tag}>New</div>
                  <Typography variant={'h2'} className={styles.title}>
                    {/* 제 비트에 같이 작업하실분! 피쳐링 필요하신분 */}
                    Test
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
                    src={'images/Post-Malone.jpg'}
                  ></Avatar>
                  {/* <AccountCircleRoundedIcon 
                    color='action'
                    sx={{ fontSize: 50 }}
                  /> */}
                  <span className={styles.userId}>nickname</span>
                </div>
                <div>
                  
                  <p>2022.05.16
                    <FavoriteBorderIcon className={styles.favoIcon}/>
                    <ShareIcon className={styles.shareIcon}/>

                  </p>
                </div>
              </Box>
              <div className={styles.shadow} />
              <div className={`${styles.shadow} ${styles.shadow2}`} />
            </Card>

          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
