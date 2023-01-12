import Box from '@mui/material/Box';
import styles from '../styles/Home.module.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from 'next/link'
import { useState, useEffect } from "react"
import { doc, deleteDoc, updateDoc, getDocs, collection, query, where, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from '../firebase1';
import { AnyARecord } from 'dns';



const ListIn = (props: any) => {
    const [addWal, setAdd] = useState(props.walletAddress)
    let oldOne = ''
    let walletChanged = props.walletAddress

    const [notesArray, setNotesArray] = useState([]);


    let list: any = []
    let listId: any = []


    const queryBlog = async () => {

        console.log("test Loop -------");

        const q = query(collection(db, "public"), where("addressWallet", "==", props.walletAddress));
        const querySnapshot = await getDocs(q);


        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            //push each data where data.address == current user 

            list.push(doc.data())
            listId.push(doc.id)




        });

        let j = 0
        list.map((i: any) => {
            i.id = listId[j]
            j++

        })
        console.log("Final ------", list);
        setNotesArray(list)








    }

    useEffect(()=>{
        if(oldOne != walletChanged){
            console.log("---test list");
        
        queryBlog()
        oldOne=walletChanged

        }
        

    },[walletChanged])



    const deleteFun = async (blog: any) => {
        await deleteDoc(doc(db, "public", blog));
        queryBlog()
    }






    function returnItem(w: string) {
        console.log(w);


    }





    return (
        <>


            {notesArray.map((i: any) => {
                return (
                    <Box
                        sx={{
                            width: 500,

                            color: '#fff',
                            backgroundColor: '#2196f3',
                            '&:hover': {
                                backgroundColor: '#0d47a1',
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        className={styles.container}
                        key={i.id}
                    >

                        <h3>{i.title}</h3>

                        <Stack direction="row" spacing={2}>
                            <Link href={'/userBlog/userWrite/' + i.id}>
                                <Button 
                                    className={styles.buttonEdit}
                                    variant="contained">Edit

                                </Button>
                            </Link>



                            <Button onClick={() => deleteFun(i.id)} variant="contained" color="error">
                                Delete
                            </Button>
                        </Stack>

                    </Box>

                )

            })}

        </>
    );
}

export default ListIn;
