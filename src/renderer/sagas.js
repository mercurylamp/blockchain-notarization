import {all} from 'redux-saga/effects';
import {
  watchBchVerify,
  watchBtcVerify,
  watchEtcVerify,
  watchEthVerify,
  watchSend, watchSendBch, watchSendBtc,
  watchSendEtc,
  watchSendEth,
  watchVerify
} from './containers/App/sagas';

export function* rootSaga() {
  yield all([
    watchSend(),
    watchSendEth(),
    watchSendEtc(),
    watchSendBtc(),
    watchSendBch(),
    watchVerify(),
    watchEthVerify(),
    watchEtcVerify(),
    watchBtcVerify(),
    watchBchVerify()
  ]);
}
