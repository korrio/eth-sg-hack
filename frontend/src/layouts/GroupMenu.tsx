import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';

const GroupBoxStyle = styled.div`
  padding: 10px;

  > p {
    margin-bottom: 15px;
    color: #92929d;
  }

  svg {
    color: #a5a5a5;
  }
`;
const GroupMenuStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const GroupItemStyle = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
  gap: 16px;
  transition: 0.3s;
  cursor: pointer;
  position: relative;
  color: #90a4ae;
  ${({ $isActive }) =>
    $isActive &&
    css`
      color: #f72860;

      svg {
        color: #f72860;
      }
    `};

  &:hover * {
    color: #f72860;
  }
`;

type GroupItem = {
  name: string;
  url: string;
  icon: any;
  newTab: boolean;
};

type GroupMenuProps = {
  groups: GroupItem[];
};

const GroupMenu = ({ groups }: GroupMenuProps) => {
  const router = useRouter();
  const isActiveUrl = (url: string) => {
    return router.pathname === url;
  };
  return (
    <GroupBoxStyle>
      <GroupMenuStyle>
        {groups.map((item: GroupItem, index: number) => (
          <GroupItemStyle
            key={index}
            $isActive={isActiveUrl(item.url)}
            onClick={() => {
              router.push(item.url);
            }}
          >
            <div>
              <Image src={item.icon} alt="" width={24} height={24} />
            </div>
            <div>{item.name}</div>
          </GroupItemStyle>
        ))}
      </GroupMenuStyle>
    </GroupBoxStyle>
  );
};
export default GroupMenu;
