import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';

import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchCards } from "./api/getCard";
import { getFeeds } from './api/testApi';

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


// 리액트 쿼리 수정
/*
export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('testApi', getFeeds);

  return {
    props: {
      dehydratedState : JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }

}
*/

export default function card_add() {

    const { isLoading, error, data } = useQuery('testApi', () =>
      getFeeds(),
      {
        keepPreviousData: true,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }
    );

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
                    <TextField fullWidth label="제목을 입력하세요." id="fullWidth" />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12} sx={{ bgcolor: 'none', padding: '1em' }}>
                  <Box
                    sx={{
                      width: 1200,
                      maxWidth: '100%',
                    }}
                  >
                    <TextField 
                      fullWidth 
                      multiline 
                      label="내용을 입력하세요." 
                      id="fullWidth"
                      rows={16}
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
                    <Button variant="contained" size="large">
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