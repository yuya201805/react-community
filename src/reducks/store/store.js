import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk'

// Import reducers
import {UsersReducer} from '../users/reducers';
import {ProductsReducer} from '../products/reducers';
import {TargetsReducer} from '../targets/reducers';

// createStoreの再定義 - historyを引数で受け、connected-react-routerの利用を抽象化
export default function createStore(history) {


  return reduxCreateStore( // オリジナル createStore の別名
      combineReducers({
          products: ProductsReducer,  
          router: connectRouter(history),
          users: UsersReducer,
          targets: TargetsReducer,
      }),
      applyMiddleware(
          routerMiddleware(history),
          thunk
      )
  );
}