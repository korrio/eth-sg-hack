import { useSwitchNetwork } from '@/hooks/useSwitchNetwork';

const SwitchNetwork = () => {
  const { switchNetwork } = useSwitchNetwork();
  return <button onClick={switchNetwork}>Switch Chain</button>;
};

export default SwitchNetwork;
