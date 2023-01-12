import styles from '../../styles/Home.module.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import stylesText from '../../styles/text.module.scss'
import OutlinedInput from '@mui/material/OutlinedInput';

import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';
import { useRouter } from 'next/router'

import { db } from '../../firebase1';
import { doc, getDoc } from "firebase/firestore";
import { ethers } from "ethers";
import conAbi from "../api/blogAbi.json"
import { InferGetServerSidePropsType } from 'next'


const Blog = (props: any) => {

    const [open, setOpen] = useState(false);
    const router = useRouter()
    const pid = router.query


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log("sent!");

        setOpen(false);
    };




    const [dataDoc, setData] = useState({})
    const [title, setTitle] = useState()
    const [content, setContent] = useState('')
    const [address, setAddress] = useState()
    const [contenter, setContenter] = useState()
    const [tipping, setEth] = useState('');
    const contractAddress = "0xA39fd84D28b08C0688eaf9274767fE092eB9A837";

    const test = async () => {

        const docRefin = await doc(db, "public", pid.id);

        let docSnap = await getDoc(docRefin)
        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setData(docSnap.data())
            setTitle(docSnap.data().title)
            setContent(docSnap.data().contentBlog)
            setAddress(docSnap.data().addressWallet)
            const contenter5 = await doc(db, "user", docSnap.data().addressWallet);
            const docUser = await getDoc(contenter5)
            setContenter(docUser.data().userName)


        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }



    }
    useEffect(() => {
        if (pid.id != undefined) test()
    }, [pid])


    const sendETH = async (e: any) => {
        e.preventDefault();
        let chainId = await props.provider.chainId;
        const goeliChainId = "0x5";
        if (chainId !== goeliChainId) {
            alert("Please connect to the Goeli testnet");
        } else {


            try {
                const { ethereum } = window;
                if (ethereum) {
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();



                    const BlogContract = new ethers.Contract(
                        contractAddress,
                        conAbi,
                        signer
                    );
                    const options = { value: ethers.utils.parseEther(tipping) }

                    BlogContract.tip(address, options)


                } else {
                    console.log("ethereum object does not exist!!!");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }






    return (
        <div className={styles.blogMain}>
          
            


            <Box sx={{
                width: 500
            }}
                className={styles.blogBody}
            >
                <h1>{title}</h1>

                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <h3>@{contenter}</h3>
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
                <textarea id="areaText" readOnly={true} className={`${stylesText.showBlog}`} name="text" defaultValue={content}></textarea>


            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Tip</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Wallet address: {address}
                    </DialogContentText>

                    <FormControl sx={{ width: '100%' }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            type="number"
                            onChange={(e: any) => setEth(e.target.value)}
                            endAdornment={<InputAdornment position="end">eth</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                        />

                    </FormControl>
                </DialogContent>
                <DialogActions>

                    <Button onClick={sendETH}>Donate</Button>
                </DialogActions>
            </Dialog>






        </div>
    );
}



export default Blog;