/**
 *
 * Style
 *
 */
import styled from 'styled-components';
import {
  PlusOutlined,
  DownloadOutlined,
  CheckSquareTwoTone,
  CloseSquareTwoTone,
  UserOutlined,
} from '@ant-design/icons';

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const MyBox = styled.div`
  padding: 10px;
  margin: 10px 10px 0 10px;
  height: auto;
`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// #region icon
const PlusIcon = styled(PlusOutlined)`
  margin-bottom: 8px;
  &.anticon svg {
    vertical-align: baseline !important;
  }
`;

const DownloadIcon = styled(DownloadOutlined)`
  &.anticon svg {
    vertical-align: baseline !important;
  }
`;

const CheckIcon = styled(CheckSquareTwoTone)`
  &.anticon svg {
    vertical-align: baseline !important;
  }
`;

const CloseIcon = styled(CloseSquareTwoTone)`
  &.anticon svg {
    vertical-align: baseline !important;
  }
`;

const UIcon = styled(UserOutlined)`
  &.anticon svg {
    vertical-align: baseline !important;
  }
`;
// #endregion

export {
  CenterDiv,
  MyBox,
  layout,
  tailLayout,
  PlusIcon,
  CheckIcon,
  CloseIcon,
  UIcon,
  DownloadIcon,
};
