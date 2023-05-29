import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './discount-form.css';
import { Link, Button } from "@mui/material";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDiscountFormDetails, modifyList, resetForm, u, updateList } from '../../redux/utility.slice';

const DISCOUNT_TYPES = {
    'monthly': 'monthly',
    'one-time': 'one time'
};

function FormInput({ name, type, prefix, suffix, isLabeled, placeholder, onChange }) {

    const dispatch = useDispatch();
    const { discountForm } = useSelector(u);
    const [isDropDownOpen, setIsOpen] = useState(false);

    return (
        <div className='flex border border-gray-300 text-lg h-10'>
            {prefix ? <span className='flex items-center p-2'>{prefix}</span> : ''}
            {isLabeled ?
                <div className='bg-gray-100 w-14 justify-center flex items-center cursor-pointer relative' onClick={() => {
                    setIsOpen(!isDropDownOpen);
                }}>
                    <label>{discountForm.discountType}</label>
                    {/* <label>€</label> */}
                    {isDropDownOpen ? <ArrowDropDownIcon className='rotate-180' /> : <ArrowDropDownIcon />}
                    {isDropDownOpen ?
                        <div className='bg-white w-[160px] border absolute flex flex-col left-0 right-0 top-10 p-2'>
                            <label className='cursor-pointer p-2 hover:bg-[#F3F3F5]' onClick={() => {
                                dispatch(addDiscountFormDetails({ discountType: '%' }));
                            }}>% Percentage</label>
                            <label className='cursor-pointer p-2 hover:bg-[#F3F3F5]' onClick={() => {
                                dispatch(addDiscountFormDetails({ discountType: '€' }));
                            }}>€ Euro</label>
                        </div> : null}
                </div> : null}
            <input className='outline-none flex-1 pl-2' placeholder={placeholder || ""} onChange={onChange} name={name} type={type} value={discountForm[name]} />
            {suffix ? <span className='flex items-center p-2'>{suffix}</span> : ''}
        </div>
    )
}

function FormRadioOption() {

    const dispatch = useDispatch();
    const { discountForm } = useSelector(u);

    return (
        <div className='flex gap-4'>
            <span className={`discount-type flex gap-2 items-center cursor-pointer hover:shadow-lg ` + (discountForm.priceCategory === 'one-time' ? 'selected' : '')} onClick={() => {
                dispatch(addDiscountFormDetails({ priceCategory: 'one-time' }));
            }}>
                One time price
                {discountForm.priceCategory === 'one-time' ?
                    <CheckIcon style={{ color: '#26B7CD', height: '14px', width: '14px', padding: '1px', background: 'white', borderRadius: '50%' }} /> :
                    <div className='circle'></div>
                }
            </span>
            <span className={`discount-type flex gap-2 items-center cursor-pointer hover:shadow-lg ` + (discountForm.priceCategory === 'monthly' ? 'selected' : '')} onClick={() => {
                dispatch(addDiscountFormDetails({ priceCategory: 'monthly' }));
            }}>
                Monthly price
                {discountForm.priceCategory === 'monthly' ?
                    <CheckIcon style={{ color: '#26B7CD', height: '14px', width: '14px', padding: '1px', background: 'white', borderRadius: '50%' }} /> :
                    <div className='circle' />}
            </span>
        </div>
    )
}

export default function DiscountForm({ isOpen, onClose }) {

    const { discountForm, discountList } = useSelector(u);
    const [isWarning, setWarned] = useState(false);
    const dispatch = useDispatch();

    function onChange(event) {
        dispatch(addDiscountFormDetails({ [event.target.name]: event.target.value }));
    }

    function addDiscount() {
        let isFilled = 0;
        Object.values(discountForm).forEach((ele) => {
            if (ele) {
                isFilled += 1;
            }
        })
        if (isFilled === (Object.keys(discountForm).length - 1)) {
            dispatch(updateList({
                ...discountForm,

                ...{
                    id: 'a-' + Math.round(Math.random() * 100),
                    offer: discountForm.discount + ' ' + discountForm.discountType + ' ' + DISCOUNT_TYPES[discountForm.priceCategory]
                }
            }));
            dispatch(resetForm());
            onClose();
        } else {
            setWarned(true);
        }
    }

    function editDiscount() {
        dispatch(modifyList(discountList.map((ele) => {
            if (ele.id === discountForm.id) {
                return discountForm;
            } else {
                return ele;
            }
        })));
        dispatch(resetForm());
        onClose();
    }

    return (
        <Dialog open={isOpen} onClose={onClose} className='h-[764px]' maxWidth='sm' fullWidth={true} >
            <DialogTitle>
                <label className='font-bold text-base'>
                    {discountForm.isEditing ? 'Edit Discount' : 'Add manual discount'}
                </label>
            </DialogTitle>
            <DialogContent>
                <div className='text-sm flex flex-col gap-4'>
                    <div className='flex flex-col gap-2 mt-2'>
                        <label>For which price do you calculate the discount?</label>
                        <FormRadioOption />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Discount</label>
                        <FormInput placeholder='Discount' isLabeled={true} name='discount' onChange={onChange} type='number' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Duration</label>
                        <FormInput placeholder='Number of months' suffix='months' name='duration' onChange={onChange} type='number' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>New Price</label>
                        <FormInput placeholder='Price' prefix='€' name='price' onChange={onChange} type='number' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Description</label>
                        <FormInput placeholder='Description of discount' name='name' onChange={onChange} type='text' />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <div className='flex justify-between items-center gap-2 w-full p-2 pt-0'>
                    <Link
                        component="button"
                        variant="body2"
                        style={{ color: '#24B7CD' }}
                        onClick={() => {
                            onClose();
                        }}
                        underline="none"
                        className="relative float-right"
                    >
                        Cancel
                    </Link>
                    <Button variant="contained" style={{ background: '#24B7CD', color: 'white', borderRadius: 0, textTransform: 'capitalize' }} onClick={discountForm.isEditing ? editDiscount : addDiscount}>
                        {discountForm.isEditing ? 'Save' : 'Add'}
                    </Button>
                </div>
            </DialogActions>
            {isWarning ? <label className='flex justify-center text-red-400 mb-2'>Please fill all of the fields</label> : null}
        </Dialog>
    );
}
