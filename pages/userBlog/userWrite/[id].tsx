import styles from '../../../styles/text.module.scss'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import main from '../../../styles/Home.module.css'
import { useRouter } from 'next/router'
import { doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase1';
import { useEffect, useState } from 'react';





const EditPage = () => {

    const router = useRouter()
    const pid = router.query
    const id = pid.id
    const [dataTest, setData] = useState({})
    const [titleTxt,setTitle] = useState('')
    const [blogTxt,setBlogTxt] = useState('')
  
  


    const test = async () => {

        

        const docRefin = doc(db, "public", pid.id);
     
        let docSnap = await getDoc(docRefin)
        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setData(docSnap.data())
            setTitle(docSnap.data().title)
            setBlogTxt(docSnap.data().contentBlog)


        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        


    }
    useEffect(() => {
        test()

    }, [])

    const updateData = async () => {
        const docRefin = doc(db, "public", pid.id);
       

        
        await updateDoc(docRefin, {
            title: titleTxt,
            contentBlog: blogTxt
        });
        console.log('Updated -----');
        router.push("/userBlog")
        

    }

    return (
        <div className={main.main}>
            <h2>Edit</h2>

            <Box
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
            >

                <div className={`${styles.form__group} ${styles.field}`}>
                    <input type="input" onChange={(e:any)=>setTitle(e.target.value)} className={styles.form__field} placeholder="Title" name="name" id='name' defaultValue={dataTest.title} required />
                    <label className={styles.form__label}>Titile</label>
                </div>

                <textarea onChange={(e:any)=>setBlogTxt(e.target.value)} className={`${styles.form_textarea} ${styles.form__group}`} name="text" defaultValue={dataTest.contentBlog} placeholder="Enter text"></textarea>
                <Button variant="contained" onClick={updateData} color="error">Save</Button>

            </Box>

        </div>
    );
}

export default EditPage
