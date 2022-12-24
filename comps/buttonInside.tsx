import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const ButtonIn = (props: { value: any; }) => {
    const allButton = props.value
    
    const ColorButton = styled(Button)<ButtonProps >(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: allButton.buttonColor,
        '&:hover': {
          backgroundColor: allButton.buttonColorHover,
        },
      }));
    return ( 
        <ColorButton   variant="contained">{allButton.buttonName}</ColorButton>
     );
}
 
export default ButtonIn;