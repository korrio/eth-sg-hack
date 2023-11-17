/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useQRCode } from 'next-qrcode';
import showToast from '@/utils/toast';
import {
  Alert,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

interface qrProps {
  address: string;
  assestaddress: string;
  exprietime: Date;
  amount: number;
  asset: string;
  rate: number;
  status: string;
}

const QR = ({
  address,
  assestaddress,
  // exprietime,
  amount,
  asset,
  // rate,
  status,
}: qrProps) => {
  const { Canvas } = useQRCode();
  const url = `https://metamask.app.link/send/${assestaddress}/transfer?address=${address}&uint256=${amount}e18`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      showToast.info('Copied', 'copied');
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Alert severity="warning">
            Status —{' '}
            {status === 'watching' || 'new' ? 'Waiting for payment' : ''}
          </Alert>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <label className="font-medium text-sm mb-2 text-center uppercase">
            Total {asset} Amount
          </label>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <p className="text-4xl text-center text-secondary-color font-normal">
            {amount} {asset}
          </p>
        </Grid>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Canvas
          options={{
            margin: 4,
            width: 160,
          }}
          text={url}
        />
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Typography>
          Send only <b>{asset}</b> to this deposit address
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color="gray">{asset} Deposit address</Typography>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" spacing={1} alignItems="center">
          <p className="text-sm break-all">{address}</p>
          <IconButton onClick={handleCopy}>
            <svg
              className="h-5 w-5 text-white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {' '}
              <path stroke="none" d="M0 0h24v24H0z" />{' '}
              <rect x="8" y="8" width="12" height="12" rx="2" />{' '}
              <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
            </svg>
          </IconButton>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography color="gray">Network</Typography>
        <Typography>Linea Chain</Typography>
      </Grid>
    </Container>
  );
};
export default QR;
