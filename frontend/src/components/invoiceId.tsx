/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// {
//     "code": 200,
//     "message": "success",
//     "response": {
//         "txId": "CPY-314078517",
//         "asset": "usdt",
//         "address": "0x9A493B79c5De04c734543A98ebfF1F09E009F8C5",
//         "amountTHB": "11.01",
//         "amountAsset": 0.3204,
//         "username": "UA3OhPohRi",
//         "rate": 34.36,
//         "paymentEndpoint": "http://cryptopayee.com/168payment/redirect/CPY-314078517",
//         "qrImage": "http://cryptopayee.com/168payment/qr-scan/CPY-314078517",
//         "expired": "2023-05-28 20:05:50"
//     }
// }

import React, { useState, useEffect, ReactElement } from 'react';

import QR from '@/components/QR';
import { useRouter } from 'next/router';
import { TimerContainer } from '@/components/TimerContainer';
import Card from '@/components/card';
import BlankLayout from '@/components/layouts/BlankLayout';

const Invoice = () => {
  const router = useRouter();

  const [show, setShow] = useState(true);
  const [timeLeft, setTimeLeft] = useState(900);
  const [expiredTime, setExpiredTime] = useState('');
  const [remainingMinutes, setRemainingMinutes] = useState<number>(0);
  const [time, setTime] = useState<number>(15);
  const [newTime, setNewTime] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [reqid, setReqid] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState<any>({});
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const invoiceId = window.location.href;
    console.log(invoiceId);
    // regex to get reqid from url /payment/reqid
    const reqid_fromSlug = invoiceId.match(/[^/]*$/)![0];
    console.log('reqid_fromSlug', reqid_fromSlug);
    setReqid(reqid_fromSlug);

    const getDetails = async () => {
      const res = await fetch(
        `https://apis.finnwork.co/crypto/wallet/receiptdeposit/${reqid_fromSlug}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'depay-x-key': `${process.env.NEXT_PUBLIC_API_KEY_SUPERADMIN}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setPaymentDetails(data);
      setExpiredTime(data.exprietime);
      if (data.status === 'watched') {
        router.push(`/payment/success/${reqid_fromSlug}`);
      }
      if (data.status === 'expired') {
        router.push(`/payment/expired/${reqid_fromSlug}`);
      }
    };
    getDetails();
  }, []);

  // const eventSource = new EventSource('https://apis.finnwork.co/Wallet/updateReqDeposit');

  // eventSource.onmessage = ({data}) => { console.log(data) };

  //   eventSource.onmessage = ({data}) => {
  // console.log(data)
  //   JSON.parse(data).forEach((updateReqDeposit: any) => {
  //     // data: {"id":"d4e5ca13-a96a-4c18-88d0-465f47500ea9","merchantcode":"mc00000001","cusid":"0891139781","amount":"0.1","network":97,"status":"watching"}
  //     if (updateReqDeposit.id === reqid && updateReqDeposit.status === "watched") {
  //       // do something
  //       console.log("watched");
  //       router.push("/payment/success");
  //     } else if (updateReqDeposit.id === reqid && updateReqDeposit.status === "expired") {
  //       // do something
  //       console.log("expired");
  //       router.push("/payment/expired");
  //     }
  //   }
  //   )
  // };
  // useEffect(() => {
  //   if (isSuccess) {
  //     router.push("/payment/success");
  //   }
  // }, [isSuccess]);

  useEffect(() => {
    const invoiceId = window.location.href;
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

    const updateTime = setInterval(() => {
      const getExpiretime = new Date(expiredTime);

      // const timeToMinutes = time * 60 * 1000;
      const countDownDate = getExpiretime.getTime();
      const now = new Date().getTime();

      const difference = countDownDate - now;

      const newDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      const newHours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const newMinutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(newDays);
      setHours(newHours);
      setMinutes(newMinutes);
      setSeconds(newSeconds);

      if (difference <= 0) {
        clearInterval(updateTime);
        setMessage('The Launch Has Started');
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        // router.push("/payment/expired");
      }
    });

    return () => {
      clearInterval(updateTime);
    };
  }, [expiredTime, time]);

  const handleClick = () => {
    setTime(newTime);
    console.log(time);
    setNewTime(0);
  };

  const handleChange = (e: any) => {
    const inputTime = e.target.value;
    setNewTime(inputTime);
  };

  const countdown = () => {
    setTimeLeft(timeLeft - 1);
  };

  return (
    <Card className="max-w-lg mx-auto">
      <div className="flex text-left font-medium border-b border-slate-700 -mx-6 -mt-2 px-6 pb-4">
        <img width="32" height="32" src={`/${paymentDetails.asset}.svg`} />
        <p className="text-2xl ms-4">Deposit {paymentDetails.asset}</p>
      </div>
      <div className="font-bold text-xl mb-2">
        <center>
          <QR
            address={paymentDetails.address}
            assestaddress={paymentDetails.assestaddress}
            amount={paymentDetails.amount}
            asset={paymentDetails.asset}
            rate={paymentDetails.rate}
            exprietime={paymentDetails.exprietime}
            status={paymentDetails.status}
          />
        </center>
      </div>
      <div className="px-6 pb-2">
        <p className="text-sm text-center uppercase mt-6">
          Complete this payment within
        </p>
        <TimerContainer
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      </div>
      <div className="flex justify-center">
        <img width="164" height="48" src={`/logo.png`} />
      </div>
    </Card>
  );
};

Invoice.getLayout = function getLayout(page: ReactElement) {
  return <BlankLayout>{page}</BlankLayout>;
};

export default Invoice;
