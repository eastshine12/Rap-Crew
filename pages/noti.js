import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';
import { useSession, signIn } from "next-auth/react";
import moment from 'moment';
import 'moment/locale/ko';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import DatePickers from '../src/DatePickers';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyIcon from '@mui/icons-material/Reply';
import CommentIcon from '@mui/icons-material/Comment';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';


const useStyles = makeStyles({
    container: {
      paddingTop: 70,
      maxWidth: 1000,
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
  });

const notis = [
    {
        notiNo: 1,
        notiType: 'like',
        userNo: 1,        
        title: '모집합니다~~~',
        targetUserId: 'test1',
        createAt: new Date('2022-08-25 1:23:45'),
        ack: false,
    },
    {
        notiNo: 2,
        notiType: 'reply',
        userNo: 1,        
        title: '댓글달아주세요~',
        targetUserId: 'test2',
        createAt: new Date('2022-08-20 15:24:45'),
        ack: true,
    },
    {
        notiNo: 3,
        notiType: 'recruit',
        userNo: 1,        
        title: '같이하실 크루원 5명 모집합니다.',
        targetUserId: 'jenny125',
        createAt: new Date('2022-08-20 09:09:45'),
        ack: true,
    },
    {
        notiNo: 4,
        notiType: 'replyLike',
        userNo: 1,        
        title: '같이하실 크루원 5명 모집합니다.',
        targetUserId: 'kim9212',
        createAt: new Date('2022-07-07 07:29:45'),
        ack: true,
    },
];

const YearHeader = (props) => {
    const data = props.data;
 return (
    <Typography fontSize="28px" fontWeight="600" padding="1.2em 0 0.2em 0">
        {moment(data.createAt).format('YYYY년')}
    </Typography>
 );
};

const TodayHeader = (props) => {
    const data = props.data;
 return (
    <Typography fontSize="18px" fontWeight="600" padding="2em 0 0.8em 0">
        {moment(data.createAt).format('MM월 DD일 dd요일')}
    </Typography>
 );
};

const CardPreset = (props) => {

    const data = props.data;

    let iconType = '';
    let suffixText = '';

    switch(data.notiType) {
        case 'like':
            iconType = <FavoriteIcon sx={{color:'#ff5353', mr: 1.1, fontSize: '30px'}}/>;
            suffixText = '게시글에 좋아요를 눌렀습니다.';
            break;
        case 'reply':
            iconType = <CommentIcon sx={{color:'#6469ff', mr: 1.1, fontSize: '30px'}}/>;
            suffixText = '게시글에 댓글을 남겼습니다.';
            break;
        case 'recruit':
            iconType = <AddReactionIcon sx={{color:'#ffa338', mr: 1.1, fontSize: '30px'}}/>;
            suffixText = '게시글에 참여 신청하였습니다.';
            break;
        case 'replyLike':
            iconType = <ThumbUpIcon sx={{color:'#3a83ff', mr: 1.1, fontSize: '30px'}}/>;
            suffixText = '게시글에 작성한 내 댓글을 추천하였습니다.';
            break;
        case 'reReply':
            iconType = <CommentIcon sx={{color:'#6469ff', mr: 1.1, fontSize: '30px'}}/>;
            suffixText = '게시글에 작성한 내 댓글에 대댓글을 남겼습니다.';
            break;
      };

    return (
        <Box sx={{ minWidth: 275, mb: 1.5,}}>
            <Card variant="outlined">
                <Grid container spacing={1} padding='1em'>

                    <Grid item xs={12} sm={7} md='auto'>
                        <Stack direction="row">
                            {iconType}
                            <Typography fontSize="15px" lineHeight='2.0em'>
                                <b>{data.targetUserId}</b>님께서 <Link>{data.title}</Link> {suffixText}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={3} md={2}>
                        <Typography 
                            fontSize="15px" 
                            color='gray' 
                            lineHeight='2.0em' 
                            whiteSpace='nowrap'
                            sx={{
                                ml: 1,
                                mr: 1,
                            }}
                        >
                            {moment(data.createAt).format('a h시 mm분')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} md={1.5}>
                        {data.notiType==='recruit'?
                            (<Button 
                                variant="contained" 
                                sx={{
                                    width: '100%', 
                                    height: 32, 
                                    fontSize: '1em', 
                                    backgroundColor: "#0470f2",
                                }}
                            >수락</Button>
                            ):''}
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
};


  

export default function noti() {

    const router = useRouter();
    const styles = useStyles();
    const { data: session, status } = useSession();

    let beforeDataYear = moment().add(1, 'years').format('yyyy');
    let beforeDataToday = moment().add(1, 'days').format('MM월 DD일 dd요일');

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

                    {notis.map((noti) => {

                        const dataYear = moment(noti.createAt).format('yyyy');
                        const dataToday = moment(noti.createAt).format('MM월 DD일 dd요일');

                        if(beforeDataYear!==dataYear) {
                            beforeDataYear=dataYear;
                            return (
                                <React.Fragment key={noti.notiNo}>
                                    <YearHeader data={noti}/>
                                    <TodayHeader data={noti} />
                                    <CardPreset data={noti} />
                                </React.Fragment>
                            )
                        } else if(beforeDataToday!==dataToday) {
                            beforeDataToday=dataToday;
                            return (
                                <React.Fragment key={noti.notiNo}>
                                    <TodayHeader data={noti} />
                                    <CardPreset data={noti} />
                                </React.Fragment>
                            )
                        } else {
                            return (
                                <React.Fragment key={noti.notiNo}>
                                    <CardPreset data={noti} />
                                </React.Fragment>
                            )
                        }
                    })}
                
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Container>
    );

}