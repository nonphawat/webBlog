import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router';
import ListIn from '../../comps/listData';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from '../../firebase1';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import conAbi from "../api/blogAbi.json"

const Index = (props: any) => {
    const router = useRouter();

    
    const [open, setOpen] = useState(false);
    const [newName, setNew] = useState();
    const [updateName, setUpdate] = useState();
    const [profit, setProfit] = useState(0);
    const contractAddress = "0xA39fd84D28b08C0688eaf9274767fE092eB9A837";

    useEffect(()=>{
      
        
        if(props.walletAddress==undefined){
            
            router.push("/")
        }
    },[])
  




    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChage = (e: { target: { value: any; }; }) => {
        setNew(e.target.value)

    }

    const changeName = async () => {
        setUpdate(newName)
        const user = doc(db, "user", props.walletAddress);
        await updateDoc(user, {
            userName: newName
        });
        handleClose()
    }

    const updatePage = async () => {
        const user = doc(db, "user", props.walletAddress);
        const docSnap = await getDoc(user)
        setUpdate(docSnap.data().userName)

    }

    useEffect(() => {
        balance()
        console.log('---rrrrr');

        updatePage()

    }, [props.walletAddress])
    



    const balance = async () => {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const BlogContract = new ethers.Contract(contractAddress, conAbi, signer);
            const c = await BlogContract.mybalance()
            const x = Math.pow(10, 18);
            setProfit(c._hex / x)

        }

    }

    const redeemVault = async () => {

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


                    BlogContract.withdraw().then(()=>{
                        setProfit(0)
                    })
                    
                  
                    





                } else {
                    console.log("ethereum object does not exist!!!");
                }
            } catch (error) {
                console.log(error);
            }
        }

    }
    
    




    return (
        <div className={styles.main}>
            <Box sx={{
                width: 500
            }}
                className={styles.profile}
            >
                <h1 >{updateName ? updateName : props.userName}</h1>
                <Button variant="contained" onClick={handleClickOpen} size='small'>Change Name</Button>

                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <h3 >Profit: {profit} Eth</h3>

                    </Grid>
                    <Grid  >
                        <Button
                            className={styles.redeemButtonPro}
                            onClick={redeemVault}

                            variant="contained">Redeem

                        </Button>
                    </Grid>

                </Grid>


            </Box>


            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change Name</DialogTitle>
                <DialogContent>



                    <OutlinedInput
                        id="new"
                        onChange={handleChage}

                    />
                </DialogContent>
                <DialogActions>

                    <Button onClick={changeName}>Save</Button>
                </DialogActions>
            </Dialog>



            <Link href={'/userBlog/userWrite'}>
                <Button
                    className={styles.spaceBottom}
                    variant="contained">New Blog

                </Button>
            </Link>
            {/* <p>{props.walletAddress}</p> */}


            <ListIn walletAddress={props.walletAddress} />

        </div>
    );
}

export default Index;