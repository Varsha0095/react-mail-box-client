import { createSlice } from "@reduxjs/toolkit";

const initialEmailState = {sent: [], receive: []};

const manageEmailSlice = createSlice({
    name: "email-manager",
    initialState: initialEmailState,
    reducers: {
        setSendMail(state,action) {},
        setReceiveMail(state,action){
            let arr = [];
            let obj = action.payload;
            for(let id in obj) {
                arr.push({
                    id: id,
                    message: obj[id].message,
                    subject: obj[id].subject,
                    seen: obj[id].seen,
                });
            }
            console.log(arr);
            state.receive = arr;
        },
        deleteMail(state,action){
            let arr = state.receive.filter((arr) => arr.id !== action.payload);
            state.receive = arr;
        },

        setSentServerMail(state, action){
            let arr = [];
            let obj = action.payload;
            for(let id in obj){
                arr.push({
                    id: id,
                    message: obj[id].message,
                    subject: obj[id].subject,
                    seen: obj[id].seen,
                });
            }
            state.sent = arr;
        },
        seenSentMessageHandler(state, action) {
            let message = state.sent.find((data) => data.id === action.payload);
            message.seen = true;
        },
    },
});

export const manageEmailActions = manageEmailSlice.actions;
export default manageEmailSlice.reducer;