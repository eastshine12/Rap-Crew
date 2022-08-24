import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';
import { useSession, signIn } from "next-auth/react";

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
  })
  

export default function noti() {

    const router = useRouter();
    const styles = useStyles();
    const { data: session, status } = useSession();



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
                      8월 23일 월요일
                    </Typography>
                    <Box 
                        sx={{ 
                            minWidth: 275,
                    }}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography fontSize="14px">
                                    test1님께서 모집합니다~~~ 게시글에 좋아요를 눌렀습니다.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box 
                        sx={{ 
                            minWidth: 275,
                    }}>
                        <Card variant="outlined">
                            <Typography fontSize="12px">
                                test2님께서 모집합니다~~~ 게시글에 참여 요청을 보냈습니다.
                            </Typography>
                        </Card>
                    </Box>
                  </Box>
                </Grid>



              </Grid>
            </Card>
          </Box>
        </Container>
    );

}