'use client'
import React from 'react';
import { Container, Box, TextField, Button, Typography, Grid, } from '@mui/material';
import Remove from '@mui/icons-material/Remove'
import Add from '@mui/icons-material/Add'
import { FormConnectBtn } from '../formConnectBtn/FormConnectBtn';
import { useSelector } from "react-redux";
import { AppStore } from "../../store";
import {
  ContractExecuteTransaction,
  AccountId,
  PrivateKey,
  Client,
  Signer,
  TransactionId
} from "@hashgraph/sdk"
import {
  authenticate,
  executeTransaction,
  signTransaction,
  hc,
} from "../../services/hashconnect";

export const StakingForm = () => {
  const { isConnected, accountIds} = useSelector(
    (state: AppStore) => state.hashconnect
  );
  let  handleStackClick: () => void;
  if(isConnected) {
  
  console.log(accountIds[0]);
  const myAccountId = AccountId.fromString(process.env.HEDERA_TESTNET_ACCOUNT_ID);
  const myPrivateKey = PrivateKey.fromStringED25519(process.env.HEDERA_TESTNET_ACCOUNT_PK);
  const contractId = process.env.HEDERA_TESTNET_SMART_CONTRACT_ID ;

  const signer = hc.getSigner(AccountId.fromString(accountIds[0]));
  // instenciate a testNet Client
  const client = Client.forTestnet();

  // set client operator
  client.setOperator(myAccountId, myPrivateKey);

   handleStackClick = async () => {
    //Create the transaction
    const transaction = new ContractExecuteTransaction()
      .setContractId(contractId)
      .setGas(100000)
      .setPayableAmount(1)
      .setFunction("stake")
      .setNodeAccountIds([AccountId.fromString("0.0.9")])
      .setTransactionId(TransactionId.generate(accountIds[0]))
      
      const frozentx = await transaction.freeze();

    
    
    //const contractExecSubmit = await contractExecSign.executeWithSigner(signer);
    
    try {
      
      const executeResult = await executeTransaction(
        AccountId.fromString(accountIds[0]),
        frozentx
          );
          console.log({
              executeResult,
            });
    } catch(err) {
        console.log(err)
    }

    //Request the receipt of the transaction
    //const receipt = await contractExecSubmit.getReceipt(client);
    //console.log("- Token transfer from Operator to contract:" ,receipt.status.toString());

    //Get the transaction consensus status
    ///const transactionStatus = receipt.status;

   // console.log("The transaction consensus status is " + transactionStatus);

    //v2.0.0
  }
} else {
   handleStackClick = async () => {
    return;
  }
}
  return (
    <Container maxWidth="sm" className='StakingForm'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          HBAR amount
        </Typography>
        <Box component="form" noValidate>
          <TextField
            InputLabelProps={{
              style: { color: '#fff', borderBlockColor: '#fff' },
            }}
            required
            fullWidth
            id="HBAR-amount"
            label="HBAR amount"
            name="HBARAmount"
            autoFocus
          />
          {isConnected
            ? <Box
              sx={{
                marginY: 8,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mt: 2,
                alignContent: 'center',
              }}
            >
              <Button
                variant="outlined"
                startIcon={<Remove />}
                sx={{ m: 1 }}
                >
                Unstack
              </Button>
              <Button 
              variant="outlined" 
              startIcon={<Add />}
              onClick={() => handleStackClick()}>
                Stack
              </Button>
            </Box>
            : <FormConnectBtn />}


          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                You will receive
              </Typography>
              <Typography variant="body1">
                1.1 AQUA
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                Exchange rate
              </Typography>
              <Typography variant="body1">
                1 HBAR = 1.1 AQUA
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                Max transaction cost
              </Typography>
              <Typography variant="body1">
                $5.46
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                Reward fee
              </Typography>
              <Typography variant="body1">
                10%
              </Typography>
            </Grid>
          </Grid>
        </Box>

      </Box>

    </Container>

  );
};
