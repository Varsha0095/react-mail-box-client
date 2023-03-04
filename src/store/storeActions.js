import { manageEmailActions } from "../store/ManageEmailReducer";
import axios from "axios";

export const ActionCreator = (userEmail) => {
  return async (dispatch) => {
    const fetchData = async () => {
      try {
        let res = await axios.get(``);
        console.log(res);
        dispatch(manageEmailActions.setReceiveMail(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  };
};

export const ActionForSentMail = (userEmail) => {
  return async (dispatch) => {
    const fetchData = async () => {
      try {
        let res = await axios.get(``);
        dispatch(manageEmailActions.setSentServerMail(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  };
};
