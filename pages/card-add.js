import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';


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



export default function card_add() {

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
                <Grid container item md={5}>
                  <h2>dwdwdwd</h2>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Container>
    )
}