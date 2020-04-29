import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  SEND,
  sendFinish,
  SEND_ETH,
  sendEth,
  sendEthSuccess,
  sendEthError,
  SEND_ETC,
  sendEtc,
  sendEtcSuccess,
  sendEtcError,
  VERIFY,
  VERIFY_ETH,
  verifyEth,
  verifyEthSuccess,
  verifyEthError,
  VERIFY_ETC,
  verifyEtc,
  verifyEtcSuccess,
  verifyEtcError,
  SEND_BTC,
  sendBtc,
  sendBtcSuccess,
  sendBtcError,
  SEND_BCH,
  sendBch,
  sendBchSuccess,
  sendBchError,
  VERIFY_BTC,
  verifyBtc,
  verifyBtcSuccess,
  verifyBtcError,
  VERIFY_BCH,
  verifyBch,
  verifyBchSuccess,
  verifyBchError
} from './actions';

import request from 'request-promise-native';
import bitcore from 'bitcore-lib';
import bitcorecash from 'bitcore-lib-cash';

import {
  ETH_MAIN_URL, ETH_TEST_URL,
  ETC_MAIN_URL, ETC_TEST_URL
} from './constants';

import Web3 from 'web3';
import { v4 as uuidv4 } from 'uuid';

const ethUrl = process.env.NODE_ENV === 'production' ?
  ETH_MAIN_URL : ETH_TEST_URL;

const etcUrl = process.env.NODE_ENV === 'production' ?
  ETC_MAIN_URL : ETC_TEST_URL;

// Send
export function* send({hash, networks}) {
  if (networks.ethereum) {
    yield put(sendEth(hash));
  }
  if (networks.ethereum_classic) {
    yield put(sendEtc(hash));
  }
  if (networks.bitcoin) {
    yield put(sendBtc(hash));
  }
  if (networks.bitcoin_cash) {
    yield put(sendBch(hash));
  }
  yield put(sendFinish());
}

export function* watchSend() {
  yield takeLatest(SEND, send);
}

export function* verify({txs}) {
  if (txs.ethereum) {
    yield put(verifyEth(txs.ethereum));
  }
  if (txs.ethereum_classic) {
    yield put(verifyEtc(txs.ethereum_classic));
  }
  if (txs.bitcoin) {
    yield put(verifyBtc(txs.bitcoin));
  }
  if (txs.bitcoin_cash) {
    yield put(verifyBch(txs.bitcoin_cash));
  }
}

export function* watchVerify() {
  yield takeLatest(VERIFY, verify);
}

export function* ethVerify({tx}) {
  async function verifyHash() {
    try {
      const web3 = new Web3(ethUrl);
      const notarizationTx = await web3.eth.getTransaction(tx);
      const {hash} = JSON.parse(web3.utils.toAscii(notarizationTx.input));

      return hash;
    } catch (err) {
      return 'There is no data';
    }
  }

  try {
    const verification = yield call(verifyHash);
    yield put(verifyEthSuccess(verification));
  } catch (err) {
    yield put(verifyEthError(err));
  }
}

export function* watchEthVerify() {
  yield takeLatest(VERIFY_ETH, ethVerify);
}

export function* etcVerify({tx}) {
  async function verifyHash() {
    try {
      const web3 = new Web3(etcUrl);
      const notarizationTx = await web3.eth.getTransaction(tx);
      const {hash} = JSON.parse(web3.utils.toAscii(notarizationTx.input));

      return hash;
    } catch (err) {
      return 'There is no data';
    }
  }

  try {
    const verification = yield call(verifyHash);
    yield put(verifyEtcSuccess(verification));
  } catch (err) {
    yield put(verifyEtcError(err));
  }
}

export function* watchEtcVerify() {
  yield takeLatest(VERIFY_ETC, etcVerify);
}

const sleep = (ms) => {
  return new Promise(resolve=>{
    setTimeout(resolve,ms)
  })
};

// BTC
export function* btcSendCoin({hash}) {
  async function sendCoin() {
    const getUnspentTransaction = {
      uri: 'https://blockchain.info/unspent?active=ADDRESS',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    return request(getUnspentTransaction, async (error, response, body) => {
      const calledBody = JSON.parse(body);
      const unspent_outputs = calledBody.unspent_outputs[0];
      const privateKey = new bitcore.PrivateKey('PRIVATEKEY');
      console.log('1 > ', calledBody.unspent_outputs);
      const utxo = {
        "txId" : unspent_outputs.tx_hash_big_endian,
        "outputIndex" : unspent_outputs.tx_output_n,
        "address" : 'ADDRESS',
        "script" : unspent_outputs.script,
        "satoshis" : unspent_outputs.value
      };
      const transaction = bitcore.Transaction()
        .from(utxo)
        .addData(`1,${Date.now()},${hash},korbit`)
        .change('ADDRESS')
        .fee(1000)
        .sign(privateKey);
      const broadcast = {
        uri: 'https://blockchain.info/pushtx',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          tx: transaction.toString(),
        }
      };
      request(broadcast)
        .then((parsedBody) => {
          console.log(parsedBody);
        })
        .catch((err) => {
          console.log(err);
        });
    }).then(async () => {
      for (let i=0; i<10; i++){
        await sleep(1000);
      }
    }).then(async () => {
      console.log('last');
      const afterUtxo = await request(getUnspentTransaction);
      const parsedUtxo = JSON.parse(afterUtxo);

      return parsedUtxo.unspent_outputs[0].tx_hash_big_endian;
    });
  }

  try {
    const response = yield call(sendCoin);
    yield put(sendBtcSuccess(response));
  } catch (err) {
    console.log(err);
    yield put(sendBtcError(err));
  }
}

export function* watchSendBtc() {
  yield takeLatest(SEND_BTC, btcSendCoin);
}

export function* btcVerify({tx}) {
  async function verifyHash() {
    try {
      const getTransaction = {
        uri: `https://api.blockcypher.com/v1/btc/main/txs/${tx}`,
        method: 'GET',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const transaction = await request(getTransaction);
      const parsedTx = JSON.parse(transaction);
      const opReturnValue = parsedTx.outputs[0].data_string.split(',');
      const parsedOpReturn = {
        id: opReturnValue[0],
        time: opReturnValue[1],
        hash: opReturnValue[2],
        signer: opReturnValue[3],
      };

      return parsedOpReturn.hash;
    } catch (err) {
      return 'There is no data';
    }
  }

  try {
    const verification = yield call(verifyHash);
    yield put(verifyBtcSuccess(verification));
  } catch (err) {
    yield put(verifyBtcError(err));
  }
}

export function* watchBtcVerify() {
  yield takeLatest(VERIFY_BTC, btcVerify);
}

// BCH
export function* bchSendCoin({hash}) {
  async function sendCoin() {
    const getUnspentTransaction = {
      uri: 'https://api.blockchair.com/bitcoin-cash/dashboards/xpub/XPUBLICKEY?limit=1,2',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const body = await request(getUnspentTransaction);

    const calledBody = JSON.parse(body);
    console.log(calledBody);
    const utxoScrpit = calledBody.data['XPUBLICKEY'].addresses['ADDRESS'].script_hex;
    const txId = calledBody.data['XPUBLICKEY'].utxo[0].transaction_hash;
    const utxoIndex = calledBody.data['XPUBLICKEY'].utxo[0].index;
    const utxoValue = calledBody.data['XPUBLICKEY'].utxo[0].value;
    const privateKey = new bitcorecash.PrivateKey('PRIVATEKEY');
    const utxo = {
      "txId" : txId,
      "outputIndex" : utxoIndex,
      "address" : "ADDRESS",
      "script" : utxoScrpit,
      "satoshis" : utxoValue
    };
    const transaction = bitcorecash.Transaction()
      .from(utxo)
      .addData(`1,${Date.now()},${hash},korbit`)
      .change("ADDRESS")
      .fee(1000)
      .sign(privateKey);

    const broadcast = {
      uri: `https://rest.bitcoin.com/v2/rawtransactions/sendRawTransaction/${transaction.toString()}`,
      method: 'GET'
    };
    const response = await request(broadcast);
    console.log(response);

    return response.slice(1, -1);
  }

  try {
    const response = yield call(sendCoin);
    yield put(sendBchSuccess(response));
  } catch (err) {
    console.log(err);
    yield put(sendBchError(err));
  }
}

export function* watchSendBch() {
  yield takeLatest(SEND_BCH, bchSendCoin);
}

export function* bchVerify({tx}) {
  async function verifyHash() {
    try {
      const getTransaction = {
        uri: `https://rest.bitcoin.com/v2/transaction/details/${tx}`,
        method: 'GET'
      };
      const transaction = await request(getTransaction);
      const parsedTx = JSON.parse(transaction);

      const rawHex = parsedTx.vout[0].scriptPubKey.hex.substr(4);

      const opReturnValue = Buffer.from(rawHex, 'hex').toString('utf8').split(',');
      const parsedOpReturn = {
        id: opReturnValue[0],
        time: opReturnValue[1],
        hash: opReturnValue[2],
        signer: opReturnValue[3],
      };

      return parsedOpReturn.hash;
    } catch (err) {
      return 'There is no data';
    }
  }

  try {
    const verification = yield call(verifyHash);
    yield put(verifyBchSuccess(verification));
  } catch (err) {
    yield put(verifyBchError(err));
  }
}

export function* watchBchVerify() {
  yield takeLatest(VERIFY_BCH, bchVerify);
}

// ETH
export function* ethSendCoin({hash}) {
  async function sendCoin() {
    const web3 = new Web3(ethUrl);
    const prv = 'PRIVATEKEY';
    const nonce = await web3.eth.getTransactionCount('ADDRESS');
    const gasPrice = (await web3.eth.getGasPrice() * 5).toString();
    const gasLimit = 200000;

    const uuid = uuidv4();
    const time = new Date().toISOString();
    const data = web3.utils.toHex(JSON.stringify({
      id: uuid,
      time,
      hash,
      signer: 'korbit'
    }));

    const tx = {
      nonce,
      to: 'TOADDRESS',
      value: 1,
      gasLimit,
      gasPrice,
      data,
    };

    const signTx = await web3.eth.accounts.signTransaction(tx, prv);

    return web3.eth.sendSignedTransaction(signTx.rawTransaction);
  }

  try {
    const response = yield call(sendCoin);
    yield put(sendEthSuccess(response));
  } catch (err) {
    console.log(err);
    yield put(sendEthError(err));
  }
}

export function* watchSendEth() {
  yield takeLatest(SEND_ETH, ethSendCoin);
}

// ETC
export function* etcSendCoin({hash}) {
  async function sendCoin() {
    const web3 = new Web3(etcUrl);
    const prv = 'PRIVATEKEY';
    const nonce = await web3.eth.getTransactionCount('ADDRESS');
    const gasPrice = (await web3.eth.getGasPrice() * 5).toString();
    const gasLimit = 200000;

    const uuid = uuidv4();
    const time = new Date().toISOString();
    const data = web3.utils.toHex(JSON.stringify({
      id: uuid,
      time,
      hash,
      signer: 'korbit'
    }));

    const tx = {
      nonce,
      to: 'TOADDRESS',
      value: 1,
      gasLimit,
      gasPrice,
      data,
    };

    const signTx = await web3.eth.accounts.signTransaction(tx, prv);

    return web3.eth.sendSignedTransaction(signTx.rawTransaction);
  }

  try {
    const response = yield call(sendCoin);
    yield put(sendEtcSuccess(response));
  } catch (err) {
    console.log(err);
    yield put(sendEtcError(err));
  }
}

export function* watchSendEtc() {
  yield takeLatest(SEND_ETC, etcSendCoin);
}





