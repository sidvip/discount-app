import { Button } from '@mui/material';
import Product from '../product/product';
import DiscountList from '../discount-list/list';

export default function Layout() {
    return (
        <div>
            <Button variant="contained" style={{ background: '#767676', color: 'white', borderRadius: 0, textTransform: 'capitalize' }} disabled>Previous</Button>
            <div className='flex mt-5 gap-2'>
                <div className='flex-1 bg-white'>
                    <DiscountList />
                </div>
                <div className='bg-gray-100 flex-grow-1'>
                    <Product />
                </div>
            </div>
        </div>
    )
}