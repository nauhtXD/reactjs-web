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
  Comment,
  List,
} from 'antd';
import {
  DownOutlined,
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
  font-size: 1.06141vw !important;
  :hover {
    color: ${primaryColor};
  }
`;

const MyP = styled.p`
  font-size: 1.06141vw;
`;

const MyRouterLink = styled(Link)`
  color: #000;
  font-size: 1.06141vw !important;
  :hover {
    color: ${primaryColor};
  }
`;

// #region antd
const MyBreadcrumb = styled(Breadcrumb)`
  .anticon svg {
    vertical-align: baseline !important;
    font-size: 0.76vw;
  }
  .ant-breadcrumb-link {
    :hover {
      color: ${primaryColor} !important;
    }
  }
  &.ant-breadcrumb {
    font-size: 1.06141vw;
    line-height: 0.119vw;
  }
`;

const MyComment = styled(Comment)`
  .ant-comment-avatar img {
    height: 2.426vw;
    width: 2.426vw;
  }
  .ant-comment-content,
  .ant-comment-content-author,
  .ant-comment-content-author-name,
  .ant-comment-content-author-time {
    font-size: 1.14vw;
  }
  .ant-comment-inner {
    padding: 1.213vw 0;
  }
`;

const MyAntdList = styled(List)`
  .ant-list-header {
    font-size: 1.213vw;
  }
  .ant-list-item,
  .ant-list-header {
    padding: 0.9vw 1.81956vw;
  }
  .ant-pagination-item-active {
    border-color: ${primaryColor} !important;
  }
  .ant-pagination-item-active a {
    color: ${primaryColor} !important;
  }
  .ant-pagination-item {
    display: inline-flex;
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
  font-size: 1.14vw;
  height: 2.426vw;
  padding: 0.30326vw 1.14vw;
  line-height: 0.12vw;
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
  .ant-form-item-control-input {
    min-height: 2.426vw;
  }
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
  .anticon {
    min-width: 1.06141vw;
    margin-right: 0.76vw;
    font-size: 0.76vw;
  }
  }
  .ant-menu-submenu-title a {
    color: #000 !important;
    font-size: 1.06141vw !important;
  }
  .ant-menu-submenu-arrow {
    right: 1.213vw !important;
    width: 0.76vw !important;
    display: none;
  }
  .ant-menu-submenu {
    .ant-menu-submenu-title {
      padding-left: 1.81956vw !important;
      padding-right: 2.57771vw !important;
    }
    .ant-menu-sub .ant-menu-submenu-title {
      padding-left: 3.63912vw !important;
    }
    .ant-menu-sub .ant-menu-item {
      padding-left: 5.45868vw !important;
    }
  }
  .ant-menu-submenu-title {
    height: 3.0326vw !important;
    line-height: 3.0326vw !important;
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
      color: ${primaryColor} !important;
    }
  }
  .ant-menu-item {
    a {
      font-size: 1.06141vw !important;
      :hover,
      :active,
      :focus {
        color: ${primaryColor} !important;
      }
    }
    height: 3.0326vw !important;
    line-height: 3.0326vw !important;
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
  font-size: 1.14vw;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.76vw;
`;

const MyBox = styled.div`
  padding: 0.76vw;
  margin: 0.76vw 0.76vw 0 0.76vw;
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
const DownIcon = styled(DownOutlined)`
  &.anticon svg {
    vertical-align: baseline !important;
    width: 0.76vw !important;
  }
`;

const PlusIcon = styled(PlusOutlined)`
  margin-bottom: 0.6vw;
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
    width: 0.76vw !important;
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
  MyP,
  MyRouterLink,
  MyBreadcrumb,
  MyComment,
  MyAntdList,
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
  DownIcon,
  UIcon,
  UpIcon,
  DownloadIcon,
  API_KEY,
};
