import { Link } from "@mui/material";
import Toggle from '../toggle/toggle';
import { useState } from "react";
import { Button } from '@mui/material';
import DiscountForm from '../discount-form/discount-form';
import { useDispatch, useSelector } from "react-redux";
import { addDiscountFormDetails, u, updateSelectedDiscount } from "../../redux/utility.slice";
import { Delete, Edit } from "@mui/icons-material";
import DeleteModal from '../popup/popup';

function ListItems({ setFormOpen }) {

    const { discountList, selectedDiscounts } = useSelector(u);
    const dispatch = useDispatch();
    const [isDeleting, setDeleted] = useState(false);
    const [selectedDiscountId, setSelectedDiscountId] = useState('');

    return (
        <div>
            {
                discountList.map((ele, id) => (
                    <div key={ele.id} className="text-sm grid grid-cols-[1fr_1fr_auto] justify-between p-6 border-b border-gray-100">
                        <label>{ele.name}</label>
                        <label>
                            {ele.type !== 'manual' ?
                                <Edit style={{ color: '#26B7CD', fontSize: 20 }} className="mr-2 cursor-pointer" onClick={() => {
                                    setFormOpen(true);
                                    dispatch(addDiscountFormDetails({
                                        ...ele,
                                        isEditing: true,
                                    }));
                                }} /> : null}
                            {ele.offer}
                        </label>
                        {ele.type !== 'manual' ?
                            <Toggle isOpen={selectedDiscounts[ele.id]} setOpen={() => {
                                dispatch(updateSelectedDiscount(ele.id));
                            }} /> :
                            <div>
                                <Edit style={{ color: '#26B7CD', fontSize: 20 }} className="mr-2 cursor-pointer" onClick={() => {
                                    setFormOpen(true);
                                    dispatch(addDiscountFormDetails({
                                        ...ele,
                                        isEditing: true,
                                    }));
                                }} />
                                <Delete style={{ color: '#26B7CD', fontSize: 20 }} className="mr-2 cursor-pointer" onClick={() => {
                                    setDeleted(true);
                                    setSelectedDiscountId(ele.id);
                                }} />
                            </div>
                        }
                    </div>
                ))
            }
            <div className="flex justify-between p-8">
                <Link
                    component="button"
                    variant="body2"
                    style={{ color: '#24B7CD' }}
                    onClick={() => {
                        console.info("I'm a button.");
                    }}
                    underline="none"
                    className="relative float-right"
                >
                    Previous
                </Link>
                <Button variant="contained" style={{ background: '#24B7CD', color: 'white', borderRadius: 0, textTransform: 'capitalize' }} disabled>Next</Button>
            </div>
            <div className="bg-[#CACACA] flex flex-col p-6 gap-2 text-sm">
                <label className="text-[#959595]">Klantgegevens</label>
                <label className="text-[#959595]">Productgegevens</label>
                <label className="text-[#959595]">Checkout</label>
            </div>
            <DeleteModal open={isDeleting} handleClose={() => setDeleted(false)} selectedDiscountId={selectedDiscountId} />
        </div>
    )
}


export default function DiscountList() {
    const [isOpen, setFormOpen] = useState(false);

    return (
        <div>
            <div className="bg-[#24B7CD] p-4 text-white">Discounts</div>
            <div>
                <div className="p-6 flex items-center justify-end border-b border-gray-100">
                    <Link
                        component="button"
                        variant="body2"
                        style={{ color: '#24B7CD' }}
                        onClick={() => {
                            setFormOpen(true);
                        }}
                        underline="none"
                        className="relative float-right outline-none"
                    >
                        + Add manual discount
                    </Link>
                </div>
                <ListItems setFormOpen={setFormOpen} />
            </div>
            <DiscountForm isOpen={isOpen} onClose={() => { setFormOpen(false); }} />
        </div>
    )
}