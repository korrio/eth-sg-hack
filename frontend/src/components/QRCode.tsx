import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';
import QR from '@/components/QR';

type Props = {
  open: boolean;
  onClose: () => void;
};

const QRCode: React.FC<Props> = (props) => {
  const { open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography>Scan qr code for payment</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <QR
          address={'test'}
          assestaddress={'test'}
          exprietime={new Date()}
          amount={100}
          asset={'test'}
          rate={100}
          status={'test'}
        />
      </DialogContent>
    </Dialog>
  );
};

export default QRCode;
