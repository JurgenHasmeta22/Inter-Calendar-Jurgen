import AuthManager from "../../../utils/authManager";
import { AppThunk } from "../../redux/appThunk";
import { navigateTo } from "../navigation/navigation.store";
import { setUser } from "./user.store";
import ILoginRequest from "../../../interfaces/ILoginRequest";
import { toast } from "react-toastify";

const onLogin =
  (payload: ILoginRequest): AppThunk =>
  async (dispatch) => {
    try {
      const response = await AuthManager.loginWithCredentials({ ...payload });
      // console.log(response)

      if (response.user && response.token) {
        dispatch(setUser(response.user));
        dispatch(navigateTo("/dashboard"));
        toast.success("Welcome to the page");
      } else if (response.user === null && response.token === "") {
        toast.warn("Combination of email/password is incorrect");
      }
    } catch (err: any) {
      Error(err.message);
      // toast.warn("Combination of email/password is incorrect")
    }
  };

export default onLogin;
