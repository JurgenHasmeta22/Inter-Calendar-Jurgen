import AuthManager from '../../../utils/authManager';
import { AppThunk } from '../../redux/appThunk';
import { navigateTo } from '../navigation/navigation.store';
import { setUser } from './user.store';
import IUser from '../../../interfaces/IUser';

const onRegister = (payload: IUser): AppThunk => async (dispatch) => {

  try {
    await AuthManager.register({ ...payload });
  } 
  
  catch (err:any) {
    Error( err.message);
  }

};

export default onRegister;