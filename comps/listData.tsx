import Box from '@mui/material/Box';
import styles from '../styles/Home.module.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from 'next/link'

const ListIn = () => {
    const valueDic = {
        buttonName: "Delete",
        buttonColor: "#d50000",
        buttonColorHover: "#e53935"
    }

    const testList = [
        {
            id: 1,
            name: "Zhuanen",
            age: 21,
            gender: "male",
            post: "My name is Zhuaenn Blablabla laljdlasjdla"
        },
        {
            id: 2,
            name: "Nonphawat",
            age: 22,
            gender: "male",
            post: "My name is Nonphawat Blablabla laljdlasjdla"
        },
        {
            id: 3,
            name: "Tanyaret",
            age: 21,
            gender: "female",
            post: "My name is Tanyaret Blablabla laljdlasjdla"
        },
        {
            id: 4,
            name: "Sakaodun",
            age: 21,
            gender: "female",
            post: "My name is Sakaodun Blablabla laljdlasjdla"
        },
        {
            id: 5,
            name: "Zack",
            age: 14,
            gender: "male",
            post: "My name is Zack Blablabla laljdlasjdla"
        },
    ]

    function returnItem(w: string) {
        console.log(w);


    }

    const listItem = testList.map((item) => {
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
                key={item.id}

            >

                <h3>{item.post}</h3>

                <Stack direction="row" spacing={2}>
                    <Link href={'/userBlog/userWrite/' + item.id}>
                        <Button onClick={() => returnItem("Edit")}
                            className={styles.buttonEdit}
                            variant="contained">Edit

                        </Button>
                    </Link>

                    

                    <Button onClick={() => returnItem("Delete")} variant="contained" color="error">
                        Delete
                    </Button>
                </Stack>

            </Box>

        )

    })


    return (
        <>
            {listItem}

        </>
    );
}

export default ListIn;
