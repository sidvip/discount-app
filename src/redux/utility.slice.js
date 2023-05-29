import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    discountList: [
        {
            name: 'Discount name',
            offer: '- € 250,00 one time',
            id: 'a-1',
            priceCategory: 'one-time',
            discountType: '€',
            discount: '-250',
            duration: '',
            price: '',
            type: 'system',
        },
        {
            name: 'Discount name',
            offer: '- 5 % one time',
            id: 'a-2',
            priceCategory: 'one-time',
            discountType: '%',
            discount: '-5',
            duration: '',
            price: '',
            type: 'system',
        },
        {
            name: 'Discount name',
            offer: '- € 250,00 monthly',
            id: 'a-3',
            priceCategory: 'monthly',
            discountType: '€',
            discount: '-250',
            duration: '',
            price: '',
            type: 'system',
        },
        {
            name: 'Discount name',
            offer: ' - 25 % monthly first 3 months',
            id: 'a-4',
            priceCategory: 'months',
            discountType: '%',
            discount: '-25',
            duration: '3',
            price: '',
            type: 'system',
        },
        {
            name: 'Discount name',
            offer: '- € 250,00 one time',
            id: 'a-5',
            priceCategory: 'one time',
            discountType: '€',
            discount: '-250',
            duration: '',
            price: '',
            type: 'system',
        },
        {
            name: 'Discount name',
            offer: '- € 50,00 monthly first 3 months',
            id: 'a-6',
            priceCategory: 'monthly',
            discountType: '€',
            discount: '-50',
            duration: '3',
            price: '',
            type: 'system',
        },
        {
            name: 'Discount name',
            offer: '- 25 % one time',
            id: 'a-7',
            priceCategory: 'one-time',
            discountType: '%',
            discount: '-25',
            duration: '',
            price: '',
            type: 'system',
        },
        {
            name: 'Discount name',
            offer: '- 25 % monthly',
            id: 'a-8',
            priceCategory: 'monthly',
            discountType: '%',
            discount: '-25',
            duration: '',
            price: '',
            type: 'system',
        }
    ],
    selectedDiscounts: {
        'a-1': true,
        'a-3': true,
    },
    discountForm: {
        name: '',
        priceCategory: 'monthly',
        discountType: '%',
        discount: '',
        duration: '',
        price: '',
        type: 'manual',
        isEditing: false
    }
}

export const utilitySlice = createSlice({
    name: 'utility',
    initialState,
    reducers: {
        updateList: (state, action) => {
            state.discountList.push(action.payload);
        },
        modifyList: (state, action) => {
            state.discountList = action.payload;
        },
        updateSelectedDiscount: (state, action) => {
            if (!state.selectedDiscounts[action.payload]) {
                state.selectedDiscounts[action.payload] = true;
            } else {
                state.selectedDiscounts[action.payload] = false;
            }
        },
        addDiscountFormDetails: (state, action) => {
            state.discountForm = {
                ...state.discountForm,
                ...action.payload
            };
        },
        resetForm: (state) => {
            state.discountForm = initialState.discountForm;
        }
    },
})

export const { updateList, updateSelectedDiscount, addDiscountFormDetails, modifyList, resetForm } = utilitySlice.actions;
export const u = (state) => state.utility;

export default utilitySlice.reducer;