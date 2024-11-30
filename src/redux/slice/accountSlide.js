import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { callFetchAccount } from '../../services/api';

export const fetchAccount = createAsyncThunk(
    'account/fetchAccount',
    async () => {
        const response = await callFetchAccount();
        return response.data;
    }
)

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    // isRefreshToken: false,
    // errorRefreshToken: "",
    user: {
        id: "",
        email: "",
        name: "",
    },
};


export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    doLoginAction: (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAccount.pending, (state, action) => {
        if (action.payload) {
            state.isAuthenticated = false;
            state.isLoading = true;
        }
    })

    builder.addCase(fetchAccount.fulfilled, (state, action) => {
        if (action.payload) {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user.id = action?.payload?.user?.id;
            state.user.email = action.payload.user?.email;
            state.user.name = action.payload.user?.name;
        }
    })

    builder.addCase(fetchAccount.rejected, (state, action) => {
        if (action.payload) {
            state.isAuthenticated = false;
            state.isLoading = false;
        }
    })
},
})

export const { doLoginAction} = accountSlice.actions;

export default accountSlice.reducer;