import {
  Box,
  Button,
} from "@mui/material";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getConnectedAccountIds,
  hc,
  hcInitPromise,
} from "../../services/hashconnect";
import { AppStore } from "../../store";


export const NavbarConnectBtn = () => {
  const { isConnected, accountIds: connectedAccountIds } = useSelector(
    (state: AppStore) => state.hashconnect
  );

  return (
    <Box>
      <Button
        
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={async () => {
          if (isConnected) {
            await hcInitPromise;
            if (isConnected) {
              if (getConnectedAccountIds().length > 0) {
                hc.disconnect();
              }
            }
          } else {
            // open walletconnect modal
            hc.openPairingModal();
          }
        }}
      >
        {isConnected
          ? `Disconnect Account${connectedAccountIds.length > 1 ? "s" : ""}`
          : "Connect"}
      </Button>
    </Box>
  );
};
