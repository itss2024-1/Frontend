import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

const initialState = {
    orderList: [] // thông tin order
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        doAddOrderAction: (state, action) => {
            let orderList = state.orderList;
            const item = action.payload;

            let isExistIndex = orderList.findIndex(c => c.id === item.id);
            if (isExistIndex > -1) {
                orderList[isExistIndex].quantity = orderList[isExistIndex].quantity + 1;
            } else {
                orderList.push({
                    quantity: 1,
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    dateTime: item.dateTime,
                });
            }
            //update redux
            state.orderList = orderList;
            message.success("Đặt lịch thành công");
        },

        doUpdateOrderAction: (state, action) => {
            let orderList = state.orderList;
            const item = action.payload;

            let isExistIndex = orderList.findIndex(c => c.id === item.id);
            if (isExistIndex > -1) {
                orderList[isExistIndex].quantity = item.quantity;
                orderList[isExistIndex].startTime = item.startTime;
                orderList[isExistIndex].endTime = item.endTime;
                if (orderList[isExistIndex].quantity > orderList[isExistIndex].detail.quantity) {
                    orderList[isExistIndex].quantity = orderList[isExistIndex].detail.quantity;
                }
            } else {
                orderList.push({
                    quantity: item.quantity,
                    id: item.id,
                    detail: item.detail,
                    startTime: item.startTime,
                    endTime: item.endTime
                });
            }
            //update redux
            state.orderList = orderList;
        },

        doDeleteItemOrderAction: (state, action) => {
            state.orderList = state.orderList.filter(c => c.id !== action.payload.id);
        },

        doPlaceOrderAction: (state, action) => {
            state.orderList = [];
        }

    },
    extraReducers: (builder) => {

    },
});

export const { doAddOrderAction, doUpdateOrderAction, doDeleteItemOrderAction, doPlaceOrderAction } = orderSlice.actions;

export default orderSlice.reducer;