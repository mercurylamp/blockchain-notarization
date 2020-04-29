import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import path from 'path';

const Networks = ({ ethereum, ethereum_classic, bitcoin, bitcoin_cash, handleChange }) => {
  return (
    <Card>
      <CardHeader title="네트워크" />
      <CardContent>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={bitcoin} onChange={handleChange} name="bitcoin" />}
            label={
              <React.Fragment>
                <img src={path.join(__static, 'BTC.svg')} height="50" width="50" />
                Bitcoin
              </React.Fragment>
            }
          />
          <FormControlLabel
            control={<Checkbox checked={bitcoin} onChange={handleChange} name="bitcoin_cash" />}
            label={
              <React.Fragment>
                <img src={path.join(__static, 'BCH.svg')} height="50" width="50" />
                Bitcoin Cash
              </React.Fragment>
            }
          />
          <FormControlLabel
            control={<Checkbox checked={ethereum} onChange={handleChange} name="ethereum" />}
            label={
              <React.Fragment>
                <img src={path.join(__static, 'ETH.svg')} height="50" width="50" />
                Ethereum
              </React.Fragment>
            }
          />
          <FormControlLabel
            control={<Checkbox checked={ethereum_classic} onChange={handleChange} name="ethereum_classic" />}
            label={
              <React.Fragment>
                <img src={path.join(__static, 'ETC.png')} height="50" width="50" />
                Ethereum Classic
              </React.Fragment>
            }
          />
        </FormGroup>
      </CardContent>
    </Card>
  )
};

export default Networks;
