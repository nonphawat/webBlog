import styBody from '../../styles/Home.module.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import { useState, useEffect } from 'react';
import styles from '../../styles/text.module.scss'


const Blog = (props: any) => {


    
    const [param, setParam] = useState()
    console.log(param);


    return (
        <div className={styBody.blogSea}>
            <Box sx={{
                width: 500
            }}

            >
                
                        <div className={`${styles.form__group} ${styles.field}`}>
                            <input type="input" onChange={(e: any) => setParam(e.target.value)} className={styles.form__field} required />
                            <label className={styles.form__label}>Search by Key</label>
                        </div>
                  
                <Link href={'/blogcon/' + param}>
                            <Button
                                
                                variant="contained"
                            >Go

                            </Button>
                        </Link>


            </Box>
        </div>
    );
}



export default Blog;