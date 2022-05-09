import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '4px solid #000',
  boxShadow: 44,
  p: 8
};

export default function KeepMountedModal() {

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

    <div className='modal-wrapper'>

      <Button onClick={handleOpen}>Open modal test</Button>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >

        <Box sx={style}>

			<Typography id="keep-mounted-modal-title" variant="h6" component="h2">
				Text in a modal
			</Typography>

			<Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
				Just random modal test
			</Typography>

        </Box>

      </Modal>

    </div>

  );

}