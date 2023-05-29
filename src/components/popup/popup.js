import * as React from 'react';
import { Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, u } from '../../redux/utility.slice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    padding: '20px',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    boxShadow: 24,
    borderRadius: '5px',
};
export default function DeleteModal({ open, handleClose, selectedDiscountId }) {

    const dispatch = useDispatch();
    const { discountList } = useSelector(u);

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box style={style}>
                <Close className='text-gray-300 cursor-pointer relative float-right' onClick={handleClose} />
                <div className='flex flex-col gap-2 mb-5'>
                    <label className='font-bold text-lg text-gray-400'>Delete discount</label>
                    <span>Are you sure you want to delete this discount?</span>
                </div>
                <Button onClick={() => {
                    dispatch(deleteItem(discountList.filter((ele) => ele.id !== selectedDiscountId)));
                    handleClose();
                }} style={{ backgroundColor: '#CC4B37', textTransform: 'capitalize', color: 'white', position: 'relative', float: 'right' }}>Delete discount</Button>
            </Box>
        </Modal>
    );
}
