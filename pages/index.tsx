import Head from 'next/head'

import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

import TextField from '@mui/material/TextField';

import * as React from 'react';

import Link from 'next/link'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';



export default function Home() {

  return (
    <div className={styles.main}>
      <h1>Blue Bird</h1>
      <Box sx={{
        width: 500
      }}
        className={styles.upDown}
      >

        <Stack
          direction="row"
          
          
          spacing={3}
          className={styles.spaceBottom}
        >
          <Button
            className={styles.buttonIndex1}
            variant="contained">Sign Up

          </Button>
          <Button
            className={styles.buttonIndex1}
            variant="contained">Sign in

          </Button>
        </Stack>
       

      </Box>

    </div>
  )
}
