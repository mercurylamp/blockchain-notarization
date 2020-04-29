import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import crypto from "crypto";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import path from 'path';

const Notarization = ({ send, networks, txs }) => {
  const [state, setState] = React.useState({
    hash: ''
  });

  const { hash } = state;

  const handleFileRead = ({ target }) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      const file = e.target.result.split(',')[1];
      const hash = crypto.createHmac('md5', 'korbit').update(file).digest('hex');
      setState(state => ({hash: hash}));
    };
  };

  return (
    <Card>
      <CardHeader title="공증" />
      <CardContent>
        <Typography color="textPrimary">
          Hash = {hash}
        </Typography>
        <List>
          {txs.btc.loading ? <ListItem>
              <ListItemAvatar>
                <Avatar src={path.join(__static, 'BTC.svg')} />
              </ListItemAvatar>
              <CircularProgress />
            </ListItem> :
            !txs.btc.tx ? null :
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={path.join(__static, 'BTC.svg')} />
                </ListItemAvatar>
                <ListItemText secondary={<a href={`https://live.blockcypher.com/btc/tx/${txs.btc.tx}`} target="_blank">{txs.btc.tx}</a>} />
              </ListItem>
          }
          {txs.bch.loading ? <ListItem>
              <ListItemAvatar>
                <Avatar src={path.join(__static, 'BCH.svg')} />
              </ListItemAvatar>
              <CircularProgress />
            </ListItem> :
            !txs.bch.tx ? null :
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={path.join(__static, 'BCH.svg')} />
                </ListItemAvatar>
                <ListItemText secondary={<a href={`https://blockchair.com/bitcoin-cash/transaction/${txs.bch.tx}`} target="_blank">{txs.bch.tx}</a>} />
              </ListItem>
          }
          {txs.eth.loading ?
            <ListItem>
              <ListItemAvatar>
                <Avatar src={path.join(__static, 'ETH.svg')} />
              </ListItemAvatar>
              <CircularProgress />
            </ListItem> :
            !txs.eth.tx ? null :
            <ListItem>
              <ListItemAvatar>
                <Avatar src={path.join(__static, 'ETH.svg')} />
              </ListItemAvatar>
              <ListItemText secondary={<a href={`https://etherscan.io/tx/${txs.eth.tx}`} target="_blank">{txs.eth.tx}</a>} />
            </ListItem>
          }
          {txs.etc.loading ? <ListItem>
              <ListItemAvatar>
                <Avatar src={path.join(__static, 'ETC.png')} />
              </ListItemAvatar>
              <CircularProgress />
            </ListItem> :
            !txs.etc.tx ? null :
            <ListItem>
              <ListItemAvatar>
                <Avatar src={path.join(__static, 'ETC.png')} />
              </ListItemAvatar>
              <ListItemText secondary={<a href={`https://classic.etccoopexplorer.com/tx/${txs.etc.tx}`} target="_blank">{txs.etc.tx}</a>} />
            </ListItem>
          }
        </List>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" component="label">
          Upload file
          <Input type="file" style={{ display: "none" }} onChange={handleFileRead} />
        </Button>
        <Button size="small" color="primary" onClick={() => send(hash, networks)}>
          Send
        </Button>
      </CardActions>
    </Card>
  )
};

export default Notarization;
