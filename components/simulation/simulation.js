import React, { useState } from 'react';
import { Typography, TextField } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { formatCurrency } from '../../utils';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import classes from './simulation.module.css';
import EditAttributesIcon from '@material-ui/icons/SettingsApplications';

export default function Simulation({ tokenAmount, vault, currentToken, zapperVaults }) {
  const [apy, setAPY] = useState(vault.apy.recommended);
  const interests = BigNumber(amount).times(apy);
  const results = BigNumber(amount).plus(interests);
  const priceUSD = 1000;
  const [pricePerToken, setPricePerToken] = useState(1);

  const [years, setYears] = useState(1);
  const [amount, setAmount] = useState(tokenAmount);
  //a simple recursive function to compute compound interests
  const yearn = (amount, i, percentage) => {
    while (i > 0) {
      amount = yearn(amount, 0, percentage);
      i = i - 1;
    }

    if (i == 0) {
      return BigNumber(amount).plus(BigNumber(amount).times(percentage));
    }
  };

  console.log('currentPricePertoken', tokenAmount, vault, currentToken, zapperVaults);
  const actualResults = yearn(amount, (years && years >= 1 && years <= 200 ? years : 1) - 1, apy);
  const actualIntersts = actualResults.minus(amount);
  const interestsUSD = BigNumber(actualIntersts).times(pricePerToken);
  const resultsUSD = BigNumber(actualResults).times(pricePerToken);
  const [showSimulationForm, setShowSimulationForm] = useState(false);
  React.useEffect(() => {
    function setPriceFromZapper() {
      let currentTokenPrice = 0;
      zapperVaults?.length > 0 &&
        zapperVaults.map((zvault) => {
          if (zvault.address.toLowerCase() === vault.address.toLowerCase()) {
            setPricePerToken(zvault.pricePerToken);
            if (currentToken.address?.toLowerCase() !== vault.tokenMetadata?.address?.toLowerCase()) {
              setAmount((tokenAmount * currentToken.price) / zvault.pricePerToken);
            } else {
              setAmount(tokenAmount);
            }
          }
        });
    }
    setPriceFromZapper();
  }, null);

  return (
    amount &&
    amount > 0 && (
      <>
        <Card className={classes.simulationContainer}>
          <CardContent className={classes.simulationCard}>
            <Typography variant="h5" className={classes.title}>
              Gains Simulation
            </Typography>
            <Typography variant="h5" component="h2">
              For {years && years != 0 && years >= 1 && years <= 200 ? years : 1} year{years > 1 ? 's' : ''} @ ${formatCurrency(pricePerToken)} &amp;{' '}
              {BigNumber(apy).times(100).toFixed(2) + '%'} APY
            </Typography>
            <div className={classes.simulationSubTitles}>
              <Typography color="textSecondary">interests won:</Typography>
              <Typography variant="body2" component="p">
                {vault.displayName} {formatCurrency(BigNumber(actualIntersts.toFixed(2)))} (${formatCurrency(interestsUSD)})
              </Typography>
            </div>
            <div className={classes.simulationSubTitles}>
              <Typography color="textSecondary">cashed out amount:</Typography>
              <Typography variant="body2" component="p">
                {vault.displayName} {formatCurrency(BigNumber(actualResults.toFixed(2)))} (${formatCurrency(resultsUSD)})
              </Typography>
            </div>
            {showSimulationForm && (
              <form className={classes.simulationForm} noValidate autoComplete="off">
                <TextField
                  value={years}
                  type="number"
                  min="1"
                  max="100"
                  onChange={(event) => {
                    const years = parseInt(BigNumber(event.target.value).integerValue().valueOf());
                    setYears(years);
                  }}
                  id="standard-secondary"
                  label="Years"
                  color="secondary"
                />
                <TextField
                  value={apy * 100}
                  id="filled-secondary"
                  label="apy"
                  color="secondary"
                  type="number"
                  onChange={(event) => {
                    setAPY(event.target.value / 100);
                  }}
                />
                <TextField
                  value={pricePerToken}
                  id="outlined-secondary"
                  label="price"
                  color="secondary"
                  onChange={(event) => {
                    setPricePerToken(event.target.value);
                  }}
                />
              </form>
            )}
          </CardContent>
          <CardActions className={classes.simulationCardButtons}>
            <Button
              size="small"
              onClick={() => {
                setShowSimulationForm(!showSimulationForm);
              }}
              startIcon={<EditAttributesIcon />}
            >
              Modify simulation parameters
            </Button>
          </CardActions>
        </Card>
      </>
    )
  );
}
