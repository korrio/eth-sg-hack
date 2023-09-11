import React, { ReactElement, useEffect, useState } from 'react';
import QR from '@/components/QR';
import { useRouter } from 'next/router';
import axios from 'axios';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, Divider } from '@mui/material';

type TMerchantData = {
  address: string;
  amount: any;
  assestaddress: string;
  cusid: string;
  hookurl: any;
  id: string;
  invoiceid: string;
  isactive: boolean;
  merchantcode: string;
  network: number;
  reqblock: number;
  reqtime: any;
  status: string;
};

const Payment = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [expiredTime, setExpiredTime] = useState('');
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
        console.log('res', res);
        const data = await res.data;
        setPaymentDetails(data);
        setExpiredTime(data.exprietime);
        // if (data.status === 'watched') {
        //   router.push(`/payment/success/${reqid_fromSlug}`);
        // }
        // if (data.status === 'expired') {
        //   router.push(`/payment/expired/${reqid_fromSlug}`);
        // }
      };
      getDetails();
    }
  }, [uid]);

  useEffect(() => {
    if (uid) {
      const invoiceId: any = uid;
      const reqid_fromSlug = invoiceId.match(/[^/]*$/)![0];
      const eventSource = new EventSource(
        'https://apis.finnwork.co/crypto/Wallet/updateReqDeposit'
      );

      eventSource.onmessage = ({ data }) => {
        console.log(data);
        data = JSON.parse(data);
        console.log('data.id', data.id);
        console.log('reqid', reqid_fromSlug);
        console.log('data.status', data.status);
        console.log(data.status === 'watched');
        if (data.id === reqid_fromSlug && data.status === 'watched') {
          // do something
          console.log('watched');
          // setIsSuccess(true);
          router.push(`/payment/success/${reqid_fromSlug}`);
        } else if (data.id === reqid_fromSlug && data.status === 'expired') {
          // do something
          console.log('expired');
          router.push(`/payment/expired/${reqid_fromSlug}`);
        }
      };

      // const updateTime = setInterval(() => {
      //   const getExpiretime = new Date(expiredTime);
      //
      //   // const timeToMinutes = time * 60 * 1000;
      //   const countDownDate = getExpiretime.getTime();
      //   const now = new Date().getTime();
      //
      //   const difference = countDownDate - now;
      //
      //   const newDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      //   const newHours = Math.floor(
      //     (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      //   );
      //   const newMinutes = Math.floor(
      //     (difference % (1000 * 60 * 60)) / (1000 * 60)
      //   );
      //   const newSeconds = Math.floor((difference % (1000 * 60)) / 1000);
      //
      //   setDays(newDays);
      //   setHours(newHours);
      //   setMinutes(newMinutes);
      //   setSeconds(newSeconds);
      //
      //   if (difference <= 0) {
      //     clearInterval(updateTime);
      //     setMessage('The Launch Has Started');
      //     setDays(0);
      //     setHours(0);
      //     setMinutes(0);
      //     setSeconds(0);
      //     // router.push("/payment/expired");
      //   }
      // });

      return () => {
        // clearInterval(updateTime);
      };
    }
  }, [expiredTime, uid]);

  return (
    <Card>
      <CardHeader title="Scan for payment" />
      <Divider />
      <CardContent>
        {paymentDetails !== null && (
          <QR
            address={paymentDetails.address}
            assestaddress={paymentDetails.assestaddress}
            amount={paymentDetails.amount}
            asset={paymentDetails.asset}
            rate={paymentDetails.rate}
            exprietime={paymentDetails.exprietime}
            status={paymentDetails.status}
          />
        )}
      </CardContent>
    </Card>
  );
};

Payment.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Payment;
