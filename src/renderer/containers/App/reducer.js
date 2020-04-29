import produce from 'immer';
import {
  SEND,
  SEND_FINISH,
  SEND_ETH,
  SEND_ETH_SUCCESS,
  SEND_ETH_ERROR,
  SEND_ETC,
  SEND_ETC_SUCCESS,
  SEND_ETC_ERROR,
  VERIFY,
  VERIFY_ETH,
  VERIFY_ETH_SUCCESS,
  VERIFY_ETH_ERROR,
  VERIFY_ETC,
  VERIFY_ETC_SUCCESS,
  VERIFY_ETC_ERROR,
  SEND_BTC,
  SEND_BTC_SUCCESS,
  SEND_BTC_ERROR,
  SEND_BCH,
  SEND_BCH_SUCCESS,
  SEND_BCH_ERROR,
  VERIFY_BTC,
  VERIFY_BTC_SUCCESS,
  VERIFY_BTC_ERROR,
  VERIFY_BCH,
  VERIFY_BCH_SUCCESS,
  VERIFY_BCH_ERROR
} from './actions';

export const initialState = {
  loading: false,
  error: false,
  eth: {
    loading: false,
    error: false,
    tx: null,
    hash: null
  },
  etc: {
    loading: false,
    error: false,
    tx: null,
    hash: null
  },
  btc: {
    loading: false,
    error: false,
    tx: null,
    hash: null
  },
  bch: {
    loading: false,
    error: false,
    tx: null,
    hash: null
  }
};

const AppReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SEND:
        draft.loading = true;
        draft.error = false;
        draft.eth.tx = null;
        draft.etc.tx = null;
        draft.btc.tx = null;
        draft.bch.tx = null;
        break;

      case SEND_FINISH:
        draft.loading = false;
        break;

      case SEND_ETH:
        draft.eth.loading = true;
        draft.eth.error = false;
        draft.eth.tx = null;
        break;

      case SEND_ETH_SUCCESS:
        draft.eth.loading = false;
        draft.eth.tx = action.tx;
        break;

      case SEND_ETH_ERROR:
        draft.eth.loading = false;
        draft.eth.error = action.error;
        break;

      case SEND_ETC:
        draft.etc.loading = true;
        draft.etc.error = false;
        draft.etc.tx = null;
        break;

      case SEND_ETC_SUCCESS:
        draft.etc.loading = false;
        draft.etc.tx = action.tx;
        break;

      case SEND_ETC_ERROR:
        draft.etc.loading = false;
        draft.etc.error = action.error;
        break;

      case VERIFY:
        draft.loading = true;
        draft.error = false;
        draft.eth.hash = null;
        draft.etc.hash = null;
        draft.btc.hash = null;
        draft.bch.hash = null;
        break;

      case VERIFY_ETH:
        draft.eth.error = false;
        draft.eth.hash = null;
        break;

      case VERIFY_ETH_SUCCESS:
        draft.eth.hash = action.result;
        break;

      case VERIFY_ETH_ERROR:
        draft.eth.error = action.error;
        break;

      case VERIFY_ETC:
        draft.etc.error = false;
        draft.etc.hash = null;
        break;

      case VERIFY_ETC_SUCCESS:
        draft.etc.hash = action.result;
        break;

      case VERIFY_ETC_ERROR:
        draft.etc.error = action.error;
        break;

      case SEND_BTC:
        draft.btc.loading = true;
        draft.btc.error = false;
        draft.btc.tx = null;
        break;

      case SEND_BTC_SUCCESS:
        draft.btc.loading = false;
        draft.btc.tx = action.tx;
        break;

      case SEND_BTC_ERROR:
        draft.btc.loading = false;
        draft.btc.error = action.error;
        break;

      case SEND_BCH:
        draft.bch.loading = true;
        draft.bch.error = false;
        draft.bch.tx = null;
        break;

      case SEND_BCH_SUCCESS:
        draft.bch.loading = false;
        draft.bch.tx = action.tx;
        break;

      case SEND_BCH_ERROR:
        draft.bch.loading = false;
        draft.bch.error = action.error;
        break;

      case VERIFY_BTC:
        draft.btc.error = false;
        draft.btc.hash = null;
        break;

      case VERIFY_BTC_SUCCESS:
        draft.btc.hash = action.result;
        break;

      case VERIFY_BTC_ERROR:
        draft.btc.error = action.error;
        break;

      case VERIFY_BCH:
        draft.bch.error = false;
        draft.bch.hash = null;
        break;

      case VERIFY_BCH_SUCCESS:
        draft.bch.hash = action.result;
        break;

      case VERIFY_BCH_ERROR:
        draft.bch.error = action.error;
        break;
    }
  });

export default AppReducer;
