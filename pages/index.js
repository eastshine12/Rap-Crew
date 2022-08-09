import * as React from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import CssBaseline from '@mui/material/CssBaseline';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSession, signIn } from "next-auth/react";

import CrewCards from '../src/CrewCards';
import { useRouter } from 'next/router';



export default function index() {

  const router = useRouter();
  const { data: session, status } = useSession();
  const theme = createTheme();

  const routeSignUp = function() {
    router.push('/signup');
  }

  const routeCardCreate = function() {
    if(status !== "authenticated") {
      if (confirm("로그인이 필요한 서비스입니다. 로그인 화면으로 이동합니다.")) {
        router.push('/login');
      }
    } else {
      router.push('/card-add');
    }
  }

  return (
    <> 
      <Box
        sx={{
          backgroundImage: `url(/images/main-title.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "70vh",
          pt: 8,
          pb: 10,
        }}
      >
        <Container sx={{
          pt: 15,
          }}
          maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="white"
            fontWeight="400"
            gutterBottom
            fontFamily="-apple-system"
          >
            지금 바로 시작하세요.
          </Typography>
          <Typography variant="h5" align="center" color="white" fontFamily="-apple-system" paragraph>
            국내 최고의 크루원들과 함께.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" size="large" onClick={routeSignUp}>가입하기</Button>
            <Button variant="outlined" size="large" onClick={routeCardCreate}>모집하기</Button>
          </Stack>
        </Container>
      </Box>
      
      <CrewCards />
    </>
  )
}
