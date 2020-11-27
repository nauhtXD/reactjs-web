/**
 *
 * SideBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
const Slider = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  width: 96px;
  height: 70%;
  background: #003164 0% 0% no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
  padding: 32px 0px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
const ItemSlider = styled.div`
  width: 89px;
  height: 110px;
  background: #003164 0% 0% no-repeat padding-box;
  border-radius: 12px 0px 0px 12px;
  opacity: 1;
  margin: auto;
  margin-right: 0;
  display: flex;
  flex-direction: column;
  padding-bottom: 3px;
  color: #ffffff;
  text-align: center;
  .Icon {
    width: 62px;
    height: 62px;
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 12px;
    opacity: 1;
    margin: auto;
    transition: all 0.2s ease-in-out;
  }

  ${props => {
    if (props.select)
      return css`
        background: #f5f9ff 0% 0% no-repeat padding-box;
        color: #003164;
        .Icon {
          background: #6382a8 0% 0% no-repeat padding-box;
        }
      `;
    return css`
      .Icon:hover {
        background: #81a9da 0% 0% no-repeat padding-box;
        transform: scale(1.1);
      }
    `;
  }}
`;
function SideBar() {
  return (
    <Slider>
      <ItemSlider select>
        <div className="Icon" />
        Quầy
      </ItemSlider>
      <ItemSlider>
        <div className="Icon" />
        Kho
      </ItemSlider>
      <ItemSlider>
        <div className="Icon" />
        Chợ
      </ItemSlider>
      <ItemSlider>
        <div className="Icon" />
        Tài khoản
      </ItemSlider>{' '}
    </Slider>
  );
}

SideBar.propTypes = {};

export default SideBar;
