import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router';
import ListIn from '../../comps/listData';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Index = () => {
    const router = useRouter();
    const testProfit = 0.05;
    return (
        <div className={styles.main}>
            <Box sx={{
                width: 500
            }}
                className={styles.profile}
            >
                <h1 >Nonphawat Srinual</h1>

                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <h3 >Profit: {testProfit} Eth</h3>
                    </Grid>
                    <Grid  xs={4}>
                        <Button
                            className={styles.redeemButtonPro}
                            variant="contained">Redeem

                        </Button>
                    </Grid>

                </Grid>


            </Box>
            <Link href={'/userBlog/userWrite'}>
                <Button
                    className={styles.spaceBottom}
                    variant="contained">New Blog

                </Button>
            </Link>


            <ListIn />

        </div>
    );
}

export default Index;