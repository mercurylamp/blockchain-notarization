import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import crypto from "crypto";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import path from 'path';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import _ from 'lodash';

const DynamicForm = ({ values, onCurrencyChange, onTxChange, onRemove }) => {
  return (
    values.map((el, i) =>
      <div key={i} style={{ display: 'flex', alignItems: 'baseline' }}>
        <FormControl>
          <Select name={i.toString()} value={values[i].currency} onChange={onCurrencyChange}>
            <option value="bitcoin">BTC</option>
            <option value="bitcoin_cash">BCH</option>
            <option value="ethereum">ETH</option>
            <option value="ethereum_classic">ETC</option>
          </Select>
        </FormControl>
        <FormControl>
          <TextField name={i.toString()} label="tx" onChange={onTxChange} style={{ width: 600 }} />
        </FormControl>
        <Fab color="secondary" size="small" onClick={() => onRemove(i)}>
          <RemoveIcon />
        </Fab>
      </div>)
  );
};

const Verification = ({ verify, hashes }) => {
  const [state, setState] = React.useState({
    hash: '',
    values: []
  });

  const { hash, values } = state;

  const handleCurrencyChange = (event) => {
    let changes = [...values];
    values[event.target.name].currency = event.target.value;
    setState(state => ({...state, values: changes}));
  };

  const handleTxChange = (event) => {
    let changes = [...values];
    values[event.target.name].tx = event.target.value;
    setState(state => ({...state, values: changes}));
  };

  const handleFormAddition = () => {
    if (values.length >= 4) return;
    setState(state => ({...state, values: [...state.values, { currency: 'bitcoin', tx: '' }]}))
  };

  const handleFormRemove = (i) => {
    let changes = [...values];
    changes.splice(i, 1);
    setState(state => ({...state, values: changes}));
  };

  const handleFileRead = ({ target }) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      const file = e.target.result.split(',')[1];
      const hash = crypto.createHmac('md5', 'korbit').update(file).digest('hex');
      setState(state => ({...state, hash: hash}));
    };
  };

  const txs = {
    ethereum: values.find(x => x.currency === 'ethereum') ? values.find(x => x.currency === 'ethereum').tx : null,
    ethereum_classic: values.find(x => x.currency === 'ethereum_classic') ? values.find(x => x.currency === 'ethereum_classic').tx : null,
    bitcoin: values.find(x => x.currency === 'bitcoin') ? values.find(x => x.currency === 'bitcoin').tx : null,
    bitcoin_cash: values.find(x => x.currency === 'bitcoin_cash') ? values.find(x => x.currency === 'bitcoin_cash').tx : null
  };

  return (
    <Card>
      <CardHeader title="검증" />
      <CardContent>
        <form>
          <DynamicForm values={values} onCurrencyChange={handleCurrencyChange} onTxChange={handleTxChange} onRemove={handleFormRemove} />
        </form>
        <Typography>
          Hash from image = {hash}
        </Typography>
        <List>
          {!hashes.btc ? null :
            <ListItem>
              <ListItemAvatar>
                <Avatar src={path.join(__static, 'BTC.svg')} />
              </ListItemAvatar>
              <ListItemText secondary={hashes.btc} />
              <ListItemIcon>
                {
                  hashes.btc === hash ?
                    <CheckIcon color="primary" /> : <ErrorIcon color="secondary" />
                }
              </ListItemIcon>
            </ListItem>
          }
          {!hashes.bch ? null :
            <ListItem>
              <ListItemAvatar>
                <Avatar src={path.join(__static, 'BCH.svg')} />
              </ListItemAvatar>
              <ListItemText secondary={hashes.bch} />
              <ListItemIcon>
                {
                  hashes.bch === hash ?
                    <CheckIcon color="primary" /> : <ErrorIcon color="secondary" />
                }
              </ListItemIcon>
            </ListItem>
          }
          {!hashes.eth ? null :
            <ListItem>
              <ListItemAvatar>
                <Avatar src={path.join(__static, 'ETH.svg')} />
              </ListItemAvatar>
              <ListItemText secondary={hashes.eth} />
              <ListItemIcon>
              {
                hashes.eth === hash ?
                  <CheckIcon color="primary" /> : <ErrorIcon color="secondary" />
              }
              </ListItemIcon>
            </ListItem>
          }
          {!hashes.etc ? null :
            <ListItem>
              <ListItemAvatar>
                <Avatar src={path.join(__static, 'ETC.png')} />
              </ListItemAvatar>
              <ListItemText secondary={hashes.etc} />
              <ListItemIcon>
              {
                hashes.etc === hash ?
                  <CheckIcon color="primary" /> : <ErrorIcon color="secondary" />
              }
              </ListItemIcon>
            </ListItem>
          }
        </List>
      </CardContent>
      <CardActions>
        <Fab color="primary" size="small" onClick={handleFormAddition}>
          <AddIcon />
        </Fab>
        <Button size="small" color="primary" component="label">
          Upload file
          <Input type="file" style={{ display: "none" }} onChange={handleFileRead} />
        </Button>
        <Button size="small" color="primary" onClick={() => verify(txs)}>
          Verify
        </Button>
      </CardActions>
    </Card>
  )
};

export default Verification;
