import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

interface Props {
    onClick: () => {}
}

const hoverButton = (props: Props) => {

    const [hover, setHover] = useState(false);

    return (
        <IconButton
            color={hover ? "error" : "default"}
            onClick={() => { console.log('clicked'); props.onClick(); }}
            onMouseEnter={() => { setHover(true); }}
            onMouseLeave={() => { setHover(false); }}
        >
            <DeleteIcon />
        </IconButton>
    )
}

export default hoverButton;