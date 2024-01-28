import {
  AccountId,
  Hbar,
  TransactionId,
  TransferTransaction,
} from "@hashgraph/sdk";
import {
  Stack,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  Container,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  authenticate,
  executeTransaction,
  signTransaction,
  hc,
} from "../services/hashconnect";
import { AppStore } from "../store";
import { StakingForm } from "../components/stakingForm/StakingForm";


export const Home = () => {
  const { accountIds: connectedAccountIds, isConnected } = useSelector(
    (state: AppStore) => state.hashconnect
  );

  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");

  return (
    <StakingForm/>
  );
};
