export const SEND = 'SEND';
export const SEND_FINISH = 'SEND_FINISH';
export const SEND_ETH = 'SEND_ETH';
export const SEND_ETH_SUCCESS = 'SEND_ETH_SUCCESS';
export const SEND_ETH_ERROR = 'SEND_ETH_ERROR';
export const SEND_ETC = 'SEND_ETC';
export const SEND_ETC_SUCCESS = 'SEND_ETC_SUCCESS';
export const SEND_ETC_ERROR = 'SEND_ETC_ERROR';
export const VERIFY = 'VERIFY';
export const VERIFY_ETH = 'VERIFY_ETH';
export const VERIFY_ETH_SUCCESS = 'VERIFY_ETH_SUCCESS';
export const VERIFY_ETH_ERROR = 'VERIFY_ETH_ERROR';
export const VERIFY_ETC = 'VERIFY_ETC';
export const VERIFY_ETC_SUCCESS = 'VERIFY_ETC_SUCCESS';
export const VERIFY_ETC_ERROR = 'VERIFY_ETC_ERROR';
export const SEND_BTC = 'SEND_BTC';
export const SEND_BTC_SUCCESS = 'SEND_BTC_SUCCESS';
export const SEND_BTC_ERROR = 'SEND_BTC_ERROR';
export const SEND_BCH = 'SEND_BCH';
export const SEND_BCH_SUCCESS = 'SEND_BCH_SUCCESS';
export const SEND_BCH_ERROR = 'SEND_BCH_ERROR';
export const VERIFY_BTC = 'VERIFY_BTC';
export const VERIFY_BTC_SUCCESS = 'VERIFY_BTC_SUCCESS';
export const VERIFY_BTC_ERROR = 'VERIFY_BTC_ERROR';
export const VERIFY_BCH = 'VERIFY_BCH';
export const VERIFY_BCH_SUCCESS = 'VERIFY_BCH_SUCCESS';
export const VERIFY_BCH_ERROR = 'VERIFY_BCH_ERROR';

export function send(hash, networks) {
  return {
    type: SEND,
    hash,
    networks
  }
}

export function sendFinish() {
  return {
    type: SEND_FINISH
  }
}

export function sendEth(hash) {
  return {
    type: SEND_ETH,
    hash
  }
}

export function sendEthSuccess(tx) {
  return {
    type: SEND_ETH_SUCCESS,
    tx
  }
}

export function sendEthError(error) {
  return {
    type: SEND_ETH_ERROR,
    error
  }
}

export function sendEtc(hash) {
  return {
    type: SEND_ETC,
    hash
  }
}

export function sendEtcSuccess(tx) {
  return {
    type: SEND_ETC_SUCCESS,
    tx
  }
}

export function sendEtcError(error) {
  return {
    type: SEND_ETC_ERROR,
    error
  }
}

export function verify(txs) {
  return {
    type: VERIFY,
    txs
  }
}

export function verifyEth(tx) {
  return {
    type: VERIFY_ETH,
    tx
  }
}

export function sendBtc(hash) {
  return {
    type: SEND_BTC,
    hash
  }
}

export function sendBtcSuccess(tx) {
  return {
    type: SEND_BTC_SUCCESS,
    tx
  }
}

export function verifyEthSuccess(result) {
  return {
    type: VERIFY_ETH_SUCCESS,
    result
  }
}

export function verifyEthError(error) {
  return {
    type: VERIFY_ETH_ERROR,
    error
  }
}

export function sendBtcError(error) {
  return {
    type: SEND_BTC_ERROR,
    error
  }
}

export function verifyEtc(tx) {
  return {
    type: VERIFY_ETC,
    tx
  }
}

export function verifyEtcSuccess(result) {
  return {
    type: VERIFY_ETC_SUCCESS,
    result
  }
}

export function verifyEtcError(error) {
  return {
    type: VERIFY_ETC_ERROR,
    error
  }
}

export function verifyBtc(tx) {
  return {
    type: VERIFY_BTC,
    tx
  }
}

export function verifyBtcSuccess(result) {
  return {
    type: VERIFY_BTC_SUCCESS,
    result
  }
}

export function verifyBtcError(error) {
  return {
    type: VERIFY_BTC_ERROR,
    error
  }
}

export function sendBch(hash) {
  return {
    type: SEND_BCH,
    hash
  }
}

export function sendBchSuccess(tx) {
  return {
    type: SEND_BCH_SUCCESS,
    tx
  }
}

export function sendBchError(error) {
  return {
    type: SEND_BCH_ERROR,
    error
  }
}

export function verifyBch(tx) {
  return {
    type: VERIFY_BCH,
    tx
  }
}

export function verifyBchSuccess(result) {
  return {
    type: VERIFY_BCH_SUCCESS,
    result
  }
}

export function verifyBchError(error) {
  return {
    type: VERIFY_BCH_ERROR,
    error
  }
}
