import styles from '../../styles/Home.module.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import stylesText from '../../styles/text.module.scss'
import OutlinedInput from '@mui/material/OutlinedInput';

import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';



const Blog = () => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log("sent!");

        setOpen(false);
    };

    // const text = () => {
    //     document.getElementById("areaText").defaultValue = longtext;
    // };
    const [longtext, setLong] = useState(
    `Hutchinson said she also visited her biological father, who she does not have a relationship with and who is a "very big Trump supporter," to seek help. But she said, "he just didn't get it."

    In her testimony, Hutchinson said Passantino pressured her to withhold information from the committee, and that others connected to Trump dangled the possibility of a job over her.
    
    Passantino denied the allegations, in a statement previously sent to Insider, and claimed the committee did not contact him "to get the facts."`
    )
    
    
        
    return (
        <div className={styles.blogMain}>

            <Box sx={{
                width: 500
            }}
                className={styles.blogBody}
            >
                <h1>hello poke</h1>

                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <h3>@zhuanen</h3>
                    </Grid>
                    <Grid  >
                        <Button
                            className={styles.redeemButtonPro}
                            variant="contained"
                            onClick={handleClickOpen}>Tip

                        </Button>
                    </Grid>

                </Grid>


                {/* <pre>
                    {longtext}
                </pre> */}
                <textarea id="areaText" readOnly={true} className={`${stylesText.showBlog}`} name="text" >{longtext}</textarea>


            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Tip</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Wallet address: 0x0900232312312312312adasdasdasdasdas
                    </DialogContentText>

                    <FormControl sx={{ width: '100%' }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-weight"

                            endAdornment={<InputAdornment position="end">eth</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                        />

                    </FormControl>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
            





        </div>
    );
}

export default Blog;