import styles from '../../../styles/text.module.scss'

import Box from '@mui/material/Box';
import main from '../../../styles/Home.module.css'

import Button from '@mui/material/Button';

const Write = () => {

    const valueDic = {
        buttonName: "Save",
        buttonColor: "#2c9cbe",
        buttonColorHover: "#237c97"
    }
    
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
                    <input type="input" className={styles.form__field} placeholder="Name" name="name" id='name' required />
                    <label className={styles.form__label}>Titile</label>
                </div>

                <textarea className={`${styles.form_textarea} ${styles.form__group}`} name="text" placeholder="Enter text"></textarea>
                <Button  variant="contained"  color="error">Save</Button>

            </Box>

        </div>
    );
}

export default Write;