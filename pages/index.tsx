import Head from 'next/head'
import Alert from '@mui/material/Alert';
import styles from '../styles/Home.module.css'
import { useState, useEffect, useRef } from 'react'
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';



export default function Home(props: any) {
  const router = useRouter();
  const [show, setShow] = useState("none");
  const timer = useRef<number>();
  const logIn = async () => {
    // Determine whether to show the component or not
    console.log(props.walletAddress);

    if (props.walletAddress == undefined) {

      setShow("unset");
      timer.current = await window.setTimeout(() => {
        setShow("none");

      }, 2500);

    } else {
      router.push("/userBlog")
    }

  }



  return (
    <div className={styles.main}>
      <h1>Write Your Content on BlueBird Blog</h1>
      <br />
      <br />
      <Box sx={{
                width: 500
            }}

            >
      <Grid container spacing={3}>
      <Grid  xs={3}>
          
        </Grid>
        <Grid  xs={4}>
          <Button
            className={styles.buttonIndex1}
            onClick={logIn}
            variant="contained">Log in

          </Button>
        </Grid>
        <Grid  >
          <Link href={'/blogcon/'}>
            <Button
              className={styles.buttonIndex1}
             
              variant="contained">Search

            </Button>
          </Link>

        </Grid>

      </Grid>
      </Box>



      




      <br /><br />
      <div style={{ display: show }}>
        <Alert variant="filled" severity="warning">
          Please Connect Your Wallet First!
        </Alert>
      </div>






    </div>
  )
}
