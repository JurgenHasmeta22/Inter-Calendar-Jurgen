import { configureStore, current, getDefaultMiddleware } from '@reduxjs/toolkit';
import IUser from '../../interfaces/IUser';
import { setUser } from '../stores/user/user.store';
import rootReducer from './rootReducer';
import { RootState } from './rootState';

const initStore = (currentUser:IUser) => {

  const appStore = configureStore({

    reducer: rootReducer,
    
    // middleware: getDefaultMiddleware({
    //   serializableCheck: false,
    // }),

    // devTools: { 
    //   // options as if you were setting it up by hand
    //   // https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#windowdevtoolsextensionconfig
    //   stateSanitizer: (state: RootState) => state.dashboard.eventClick ? { ...state, data: '<<LONG_BLOB>>' } : state
    // }

  });

  if(currentUser)
      appStore.dispatch(setUser(currentUser));

  return appStore;
  
};

export default initStore;