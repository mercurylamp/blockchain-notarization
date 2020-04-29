import React from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Networks from '../../components/Networks';
import Notarization from '../../components/Notarization';
import Verification from '../../components/Verification';
import Infos from '../../components/Infos';

import {send, verify} from './actions';

const App = ({ send, verify, eth, etc, btc, bch }) => {
  const [state, setState] = React.useState({
    ethereum: false,
    ethereum_classic: false,
    bitcoin: false,
    bitcoin_cash: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const hashes = {
    eth: eth.hash,
    etc: etc.hash,
    btc: btc.hash,
    bch: bch.hash
  };

  const txs = {
    eth: {
      loading: eth.loading,
      tx: eth.tx ? eth.tx.transactionHash : null
    },
    etc: {
      loading: etc.loading,
      tx: etc.tx ? etc.tx.transactionHash : null
    },
    btc: {
      loading: btc.loading,
      tx: btc.tx
    },
    bch: {
      loading: bch.loading,
      tx: bch.tx
    }
  };

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      justify="center"
      alignItems="stretch"
    >
      <Grid item xs={4}>
        <Networks handleChange={handleChange} />
        <Infos networks={state} />
      </Grid>
      <Grid item xs={8}>
        <Notarization networks={state} send={send} txs={txs} />
        <Verification verify={verify} hashes={hashes} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    eth: state.app.eth,
    etc: state.app.etc,
    btc: state.app.btc,
    bch: state.app.bch
  }
};

const mapDispatchToProps = {
  send: (hash, networks) => send(hash, networks),
  verify: (txs) => verify(txs)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
