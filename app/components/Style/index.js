/**
 *
 * Style
 *
 */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Typography,
  Button,
  Modal,
  Table,
  Input,
  Form,
  Menu,
  Breadcrumb,
} from 'antd';
import {
  PlusOutlined,
  DownloadOutlined,
  CheckSquareTwoTone,
  CloseSquareTwoTone,
  UserOutlined,
  UpSquareTwoTone,
} from '@ant-design/icons';

const primaryColor = '#77B81E';

const API_KEY = 'f9b8a21d57e020513b5c7e50113dd4ea';

const MyLink = styled.a`
  color: #000;
  :hover {
    color: ${primaryColor};
  }
`;

const MyRouterLink = styled(Link)`
  color: #000;
  :hover {
    color: ${primaryColor};
  }
`;

const MyBreadcrumb = styled(Breadcrumb)`
  .anticon svg {
    vertical-align: baseline !important;
  }
  .ant-breadcrumb-link {
    :hover {
      color: ${primaryColor} !important;
    }
  }
`;
// #region antd
const MyText = styled(Typography.Text)`
  &.ant-typography a {
    color: #000 !important;
    :hover {
      color: ${primaryColor} !important;
    }
    :active {
      color: #000 !important;
    }
  }
`;

const MyButton = styled(Button)`
  color: #fff;
  background-color: ${primaryColor};
  :hover,
  :focus {
    color: #fff !important;
    background-color: #000 !important;
    border-color: #fff !important;
  }
`;

const MyAntdModal = styled(Modal)`
  .ant-modal-footer button + button {
    color: #fff;
    background-color: ${primaryColor};
    border: none;
    :hover,
    :focus {
      color: #fff !important;
      background-color: #000 !important;
      border-color: #fff !important;
    }
  }
  .ant-btn {
    :hover,
    :focus {
      color: ${primaryColor} !important;
      border-color: ${primaryColor} !important;
    }
  }
`;

const MyAntdTable = styled(Table)`
  .ant-pagination-item-active {
    border-color: ${primaryColor} !important;
  }
  .ant-pagination-item-active a {
    color: ${primaryColor} !important;
  }
  .ant-pagination-item {
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      &.ant-pagination-item a {
        color: ${primaryColor} !important;
      }
      border-color: ${primaryColor} !important;
    }
  }
  .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link {
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      color: ${primaryColor} !important;
      border-color: ${primaryColor} !important;
    }
  }
`;

const MyAntdSearch = styled(Input.Search)`
  .ant-btn {
    :hover,
    :active,
    :focus {
      border-color: ${primaryColor} !important;
    }
  }
  .ant-input {
    :hover,
    :focus,
    :active {
      border-color: ${primaryColor} !important;
    }
  }
`;

const MyAntdForm = styled(Form)`
  .ant-input,
  .ant-select-selector,
  .ant-picker {
    :hover,
    :focus,
    :active {
      border-color: ${primaryColor} !important;
    }
  }
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border-color: ${primaryColor} !important;
  }
  .ant-picker-focused {
    border-color: ${primaryColor} !important;
  }
  .ant-picker {
    &.ant-picker-today-btn {
      color: ${primaryColor} !important;
      :hover,
      :active,
      :focus {
        color: ${primaryColor} !important;
      }
    }
  }
`;

const MyInlineMenu = styled(Menu)`
  .ant-menu-submenu-title a {
    color: #000 !important;
  }
  .ant-menu-submenu-title {
    :hover,
    :active,
    :focus {
      a {
        color: ${primaryColor} !important;
      }
      .ant-menu-submenu-arrow::before,
      .ant-menu-submenu-arrow::after {
        background: ${primaryColor} !important;
      }
    }
  }
  .ant-menu-item {
    a {
      :hover,
      :active,
      :focus {
        color: ${primaryColor} !important;
      }
    }
  }
  .ant-menu-submenu-selected,
  .ant-menu-item-selected a {
    color: ${primaryColor} !important;
  }
  .ant-menu-item::after {
    border-right-color: ${primaryColor} !important;
  }
`;
// #endregion

// #region div
const ContentDiv = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
`;

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
// #endregion

// #region form
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
// #endregion

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

const UpIcon = styled(UpSquareTwoTone)`
  &.anticon svg {
    vertical-align: baseline !important;
  }
`;
// #endregion

export {
  primaryColor,
  MyLink,
  MyRouterLink,
  MyBreadcrumb,
  MyText,
  MyButton,
  MyAntdModal,
  MyAntdTable,
  MyAntdSearch,
  MyAntdForm,
  MyInlineMenu,
  ContentDiv,
  CenterDiv,
  MyBox,
  layout,
  tailLayout,
  PlusIcon,
  CheckIcon,
  CloseIcon,
  UIcon,
  UpIcon,
  DownloadIcon,
  API_KEY,
};
