import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';

const Infos = ({ networks }) => {
  const cost = [];
  let krw = 0;
  const hashrate = [];
  let total = 0;

  if (networks.bitcoin) {
    cost.push('0.00001 BTC');
    krw += 0.00001 * 8165500;
    hashrate.push('BTC(100EH)');
    total += 100;
  }
  if (networks.bitcoin_cash) {
    cost.push('0.00001 BCH');
    krw += 0.00001 * 273750;
    hashrate.push('BCH(2.5EH)');
    total += 2.5;
  }
  if (networks.ethereum) {
    cost.push('0.0001405052 ETH');
    krw += 0.0001405052 * 170400;
    hashrate.push('ETH(176TH)');
    total += 0.176;
  }
  if (networks.ethereum_classic) {
    cost.push('0.00015226 ETC');
    krw += 0.00015226 * 6160;
    hashrate.push('ETC(10TH)');
    total += 0.01;
  }

  return (
    <div>
      <Card>
        <CardHeader title="예상 비용" />
        <CardContent>
          <Typography color="textPrimary">
            {_.isEmpty(cost) ? null : cost.reduce((acc, cur) => acc + ' + ' + cur)}
          </Typography>
          <Typography color="textSecondary">
            KRW = {krw}
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="예상 안정성" />
        <CardContent>
          <Typography color="textPrimary">
            {_.isEmpty(hashrate) ? null : hashrate.reduce((acc, cur) => acc + ' + ' + cur)}
          </Typography>
          <Typography color="textSecondary">
            약 {total}EH
          </Typography>
          <Typography color="textSecondary">
            {_.isEmpty(hashrate) ? null : `를 51% 공격하려면 ${(total/0.146627).toFixed(0)}대의 써밋 슈퍼컴퓨터가 필요합니다.`}
          </Typography>
          <Typography color="textSecondary">
            {_.isEmpty(hashrate) ? null : `* 써밋 슈퍼컴퓨터 : 2019년 세계 1위 연산능력, 약 5000억원`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
};

export default Infos;
