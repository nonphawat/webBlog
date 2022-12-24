import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useRef, useState } from 'react';
import textStyles from '../styles/text.module.scss'

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [address,setAddress] = useState("Connect Wallet");

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);


    const timer = useRef<number>();

    const handleButtonClick =async () => {
        if (!loading) {
            
            setLoading(true);
            timer.current =await window.setTimeout(() => {
                setLoading(false);
                
            }, 2000);
            
            setAddress("0x000...123B");
        }
    };

    return (
        <div className={styles.registerMain}>
            <h1>Sign Up</h1>
            <Box sx={{
                width: 500
            }}
                className={styles.registerMain}
            >


                <Box sx={{ m: 1, position: 'relative' }}>
                    <Button
                        variant="contained"
                        size="large"
                        disabled={loading}
                        onClick={handleButtonClick}
                        className={styles.buttonConnect}
                    >
                        {address}
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{

                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </Box>
                <div className={`${textStyles.form__group} ${textStyles.field}`}>
                    <input type="input" className={textStyles.form__field} placeholder="Name" name="name" id='name' required />
                    <label className={textStyles.form__label}>User Name</label>
                </div>


                <Box sx={{ m: 14, position: 'relative' }}>
                    <Button
                        variant="contained"
                        size="large"
                        disabled={loading}
                        onClick={handleButtonClick}
                    >
                        Sign Up
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{

                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </Box>



            </Box>


        </div>
    );
}

export default Register
