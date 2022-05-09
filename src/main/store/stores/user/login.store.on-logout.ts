import AuthManager from '../../../utils/authManager';
import { AppThunk } from '../../redux/appThunk';
import { navigateTo } from '../navigation/navigation.store';
import { invalidateUser } from './user.store';

const onLogout = (): AppThunk => async (dispatch) => {

  dispatch(invalidateUser());
  AuthManager.logout();
  dispatch(navigateTo('/login'));
  
};

export default onLogout;