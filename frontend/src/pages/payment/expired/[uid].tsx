import React, { ReactElement, useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';

const PaymentExpired = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  useEffect(() => {
    if (uid) {
      const uuid: any = uid;
      const reqid_fromSlug = uuid.match(/[^/]*$/)![0];

      const getDetails = async () => {
        const res = await axios.get(
          `https://apis.finnwork.co/crypto/wallet/receiptdeposit/${reqid_fromSlug}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'depay-x-key': `${process.env.NEXT_PUBLIC_API_KEY_SUPERADMIN}`,
            },
          }
        );
        const data = await res.data;
        setPaymentDetails(data);
      };
      getDetails();
    }
  }, [uid]);

  return (
    <Card>
      <CardHeader title="Payment Detail" />
      <Divider />
      <CardContent>
        {paymentDetails !== null ? (
          <Container maxWidth="sm">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Alert
                  severity={
                    paymentDetails.status === 'expired' ? 'error' : 'warning'
                  }
                >
                  Status —{' '}
                  {paymentDetails.status === 'expired' ? 'Payment Expired' : ''}
                </Alert>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <label className="font-medium text-sm mb-2 text-center uppercase">
                  Total {paymentDetails.asset} Amount
                </label>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <p className="text-4xl text-center text-secondary-color font-normal">
                  {paymentDetails.amount} {paymentDetails.asset}
                </p>
              </Grid>
            </Grid>
            {/* <Grid item xs={12} display="flex" justifyContent="center"> */}
            {/*  <Canvas */}
            {/*      options={{ */}
            {/*        margin: 4, */}
            {/*        width: 160, */}
            {/*      }} */}
            {/*      text={url} */}
            {/*  /> */}
            {/* </Grid> */}
            <Grid item xs={12} display="flex" justifyContent="center">
              <Typography>
                Send only <b>{paymentDetails.asset}</b> to this deposit address
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="gray">
                {paymentDetails.asset} Deposit address
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="gray">Network</Typography>
              <Typography>Linea Chain</Typography>
            </Grid>
          </Container>
        ) : null}
      </CardContent>
    </Card>
  );
};

PaymentExpired.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default PaymentExpired;
