import { useState, useEffect, } from 'react'
import { useTheme } from 'next-themes'
import * as React from 'react';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import styles from '../styles/Navbar.module.css'
import { doc, setDoc, collection, addDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase1"
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { LogDescription } from 'ethers/lib/utils';


function Navbar(props: any) {
    const [textButton, setText] = useState("Connect Wallet");
    const [mounted, setMounted] = useState(false);
    const [checked, setChecked] = useState(true);
    const [address, setAddress] = useState('');
    const [provider, setProvider] = useState(undefined);
    const [library, setLibrary] = useState("");
    const [account, setAccount] = useState("");
    const { theme, setTheme } = useTheme();
    let addressTest = ''


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);

    }, []);

    useEffect(() => {
        
        
        if (provider?.on) {
            const handleAccountsChanged = (accounts) => {
                console.log("accountsChanged", accounts);
                if (accounts) {
                    addressTest = accounts[0]
                    inData()
                    const first5 = addressTest.substring(0, 5);

                    // Get the last 5 characters
                    const last5 = addressTest.substring(addressTest.length - 5);
                    setText(first5 + '...' + last5)

                    setAccount(accounts[0]);
                }
            };

            provider.on("accountsChanged", handleAccountsChanged);

            return () => {
                if (provider.removeListener) {
                    provider.removeListener("accountsChanged", handleAccountsChanged);
                }
            };
        }
    }, [provider]);

    useEffect(() => {
        // console.log(checked);
        if (checked) {

            setTheme('dark');
        } else {
            setTheme('light');
        }

    }, [checked]);
    if (!mounted) {
        return null;
    }
    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        '#fff'
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#4CAF50' : '#000000',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
            width: 32,
            height: 32,
            '&:before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff'
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#fff',
            borderRadius: 20 / 2,
        },
    }));



    const connectWallet = async () => {
        try {
            let web3Modal = new Web3Modal({
                cacheProvider: false,
            });
            const providerIn = await web3Modal.connect();
            const library = new ethers.providers.Web3Provider(providerIn);
            const accounts = await library.listAccounts();
            props.getProvider(providerIn)

            setProvider(providerIn);



            if (accounts) {
                console.log(accounts[0]);
                addressTest = accounts[0].toLowerCase()
                inData()
                const first5 = addressTest.substring(0, 5);

                // Get the last 5 characters
                const last5 = addressTest.substring(addressTest.length - 5);
                setText(first5 + '...' + last5)

                setAccount(accounts[0]);
            }
        } catch (error) {
            console.log("Error");
        }

    };

    const inData = async () => {


        const docRef = doc(db, "user", addressTest);
        let docSnap = await getDoc(docRef)



        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            props.getWallet(docSnap.id, docSnap.data())
        } else {
            setDoc(doc(db, "user", addressTest), {
                userName: addressTest
            })
            docSnap = await getDoc(docRef)
            props.getWallet(docSnap.id, docSnap.data(),provider)
        }




    }




    return (
        <>

            <AppBar style={{ background: '#29b6f6' }}>
                <Toolbar>
                    <Typography variant="h4" component="div">
                        BlueBird
                       

                    </Typography>
                    <div className={styles.navflex}>
                        <button className={` ${styles.buttonFirst}`} onClick={connectWallet}>{textButton}</button>


                        <MaterialUISwitch checked={checked} onChange={handleChange} />
                    </div>



                </Toolbar>
            </AppBar>



            <Toolbar />
        </>
    );
}

export default Navbar; 