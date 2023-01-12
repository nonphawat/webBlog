import styles from '../../../styles/text.module.scss'
import { collection, doc, updateDoc, arrayUnion, arrayRemove, addDoc } from "firebase/firestore";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import main from '../../../styles/Home.module.css'
import { db } from '../../../firebase1';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useRouter } from 'next/router'

const Write = (props: any) => {

    const [loading, setLoading] = useState(false);
    const [titleTxt,setTitle] = useState()
    const [blogTxt,setBlogTxt] = useState()
    const router = useRouter()

    // const test = () => {
    //     console.log(props.walletAddress);

    // }

    const addNew = async () => {

        if (!loading) {
            
            setLoading(true);
            const docRef = await addDoc(collection(db, "public"), {
                addressWallet: props.walletAddress,
                title: titleTxt,
                contentBlog: blogTxt
            });
    
            // const user = doc(db,"user",props.walletAddress)
    
            // await updateDoc(user, {
            //     blogList: arrayUnion(docRef.id)
            // });
            setLoading(false);
            
        }
        
        router.push("/userBlog")

    }

    // const handleTxt = (e:any) =>{
    //     console.log(e.target.value);
        

    // }

    return (
        <div className={main.main}>
            <h2>New post</h2>
       
            <Box
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
            >

                <div className={`${styles.form__group} ${styles.field}`}>
                    <input type="input" onChange={(e:any)=>setTitle(e.target.value)} className={styles.form__field} placeholder="Name" name="name" id='name' required />
                    <label className={styles.form__label}>Titile</label>
                </div>

                <textarea onChange={(e:any)=>setBlogTxt(e.target.value)} className={`${styles.form_textarea} ${styles.form__group}`} name="text" placeholder="Enter text"></textarea>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Button
                        variant="contained"
                        size="large"
                        disabled={loading}
                        onClick={addNew}
                        
                       
                    >
                        Save
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

export default Write;