import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles({
  soundCloud: {
    width: '100%'
  },
});



export default function card_view() {
  
  const styles = useStyles();

  return (
    <Container 
          sx={{
            pt: 8,
          }}
          maxWidth="lg"
          
    >
      <Box
        sx={{
          pt: 10,
          pb: 10,
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            // width: 900,
            height: 1200,
          },
        }}
      >
          <Card 
            // elevation={16} 
            sx={{
              width: '100%',
              height: '140px',
              color: 'black',
              borderRadius: 5,
              p: 5,
              border: 1,
              borderColor: '#cccccc',
              '& > .MuiBox-root > .MuiBox-root': {
                p: 3,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
              },
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 1,
                gridTemplateRows: 'repeat(10, 1fr)',
                gridTemplateAreas: `"header header header header header"
                                    "image image image sidebar sidebar"
                                    "image image image sidebar sidebar"
                                    "image image image sidebar2 sidebar2"
                                    "image image image sidebar2 sidebar2"
                                    "main main main sidebar2 sidebar2"
                                    "main main main sidebar2 sidebar2"
                                    "main main main sidebar2 sidebar2"
                                    "footer footer footer footer footer"
                                    "footer footer footer footer footer"`,
              }}
            >
              <Box 
                sx={{ 
                  gridArea: 'header', 
                  bgcolor: '#f5f5f5',
                }}
              > 
                <Typography
                  sx={{ 
                    fontSize: 23,
                  }}
                >
                제 비트에 같이 작업하실분! 피쳐링 필요하신분
                </Typography>
              </Box>
              <Box sx={{ gridArea: 'main', bgcolor: '#f5f5f5' }}>Main</Box>
              <Box sx={{ gridArea: 'image', bgcolor: '#f5f5f5' }}>
                <img className={styles.soundCloud} src='/images/card-default.png' />
              </Box>
              <Box sx={{ 
                gridArea: 'sidebar', 
                bgcolor: '#f5f5f5', 
                margin: 'auto'
                }}
              >
                <img className={styles.soundCloud} src='/images/soundcloud.PNG' />
              </Box>
              <Box sx={{ gridArea: 'sidebar2', bgcolor: '#f5f5f5', }}>Sidebar2</Box>
              <Box sx={{ gridArea: 'footer', bgcolor: '#f5f5f5' }}>Footer</Box>
            </Box>
          </Card>
      </Box>
    </Container>
  );
}