import * as React from 'react';
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
import Reply from '../../src/reply';


const useStyles = makeStyles({
  container: {
    paddingTop: 50,
    maxWidth: 1200,
  },
  boxContent: {
    paddingTop: 50,
    paddingBottom: 10,
    display: 'flex',
    flexWrap: 'wrap',
    '& > :not(style)': {
      m: 1,
      height: 1200,
    },
  },
  soundCloud: {
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



export default function card_view() {
  
  const styles = useStyles();

  return (
    <Container className={styles.container}>
      <Box className={styles.boxContent}>
        <Card className={styles.cardContent}>
          <Grid container spacing={4}>

            <Grid item xs={12} sm={12} md={7} sx={{ bgcolor: '#f5f5f5' }}>
              <img className={styles.soundCloud} src='/images/card-default.png' />
            </Grid>

            <Grid container item md={5}>
              <Grid item xs={12} sm={12} md={12} sx={{ 
                bgcolor: '#f5f5f5', 
                margin: 'auto',
                }}
              >
                <Typography
                sx={{ 
                  fontSize: 23,
                }}
                >
                제 비트에 같이 작업하실분! 피쳐링 필요하신분
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} sx={{ 
                bgcolor: '#f5f5f5', 
                margin: 'auto'
                }}
              >
                <div>
                  <p>
                    nickname
                    2022.05.16
                    <FavoriteBorderIcon className={styles.favoIcon}/>
                    <ShareIcon className={styles.shareIcon}/>
                  </p>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} sx={{ 
                bgcolor: '#f5f5f5', 
                margin: 'auto'
                }}
              >
                <img className={styles.soundCloud} src='/images/soundcloud.PNG' />
              </Grid>
              
            </Grid>

            <Grid item xs={12} sm={7} md={7}
              sx={{ 
                bgcolor: '#f5f5f5',
              }}
            > 
              <Box
                sx={{
                  minHeight: 300,
                  borderRadius: 3,
                  border: 1,
                  borderColor: 'gray',
                  p: 3
                }}
              >
                <Typography
                  sx={{ 
                    fontSize: 15,
                  }}
                >
                같이 작업하시거나 피쳐링 필요하신분들 편하게 연락주세요 붐뱁 트랩 싱잉 다 합니다!
                </Typography>
              </Box>
            </Grid>


            <Grid item xs={12} sm={5} md={5} sx={{ bgcolor: '#f5f5f5' }}>
              <Grid container>
                <Grid item xs={12} sm={12} md={12} sx={{pb: 4,}}>
                  참여중인 인원
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <span>Leader</span>
                </Grid>
                <Grid item xs={8} sm={8} md={8}>
                  <span>Member</span>
                </Grid>

                <Grid item xs={4} sm={4} md={4}>
                <Avatar
                  className={styles.avatar}
                  src={''}
                >

                </Avatar>
                </Grid>
                
                <Grid item xs={8} sm={8} md={8}>
                  <AvatarGroup sx={{float: 'left'}} max={4}>
                    <Avatar className={styles.avatar} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar className={styles.avatar} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar className={styles.avatar} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    <Avatar className={styles.avatar} alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    <Avatar className={styles.avatar} alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                  </AvatarGroup>
                </Grid>

              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12} sx={{ bgcolor: '#f5f5f5' }}>
              댓글
              <Reply />  
            </Grid>

          </Grid>
        </Card>
      </Box>
    </Container>
  );
}