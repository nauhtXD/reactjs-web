import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-component';
// import { Layout } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCrops from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import MyLayout from '../../components/MyLayout/Loadable';
import TitleCom from '../../components/TitleCom/Loadable';

const item = [];
for (let i = 0; i < 4; i += 1) {
  item.push(
    <div>
      <ImgWd
        textAlign="left"
        leftCol={6}
        rightCol={18}
        imgWidth={180}
        imgSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        mLink="/"
        linkTitle="Title"
        postDay="dd/MM/yyyy"
        mDetail="details"
      />
      <div style={{ marginBottom: '2px' }} />,
    </div>,
  );
}

export function Crops() {
  useInjectReducer({ key: 'crops', reducer });
  useInjectSaga({ key: 'crops', saga });

  return (
    <div>
      <Helmet>
        <title>Crops</title>
        <meta name="description" content="Description of Crops" />
      </Helmet>
      <MyLayout
        mCont={
          <div>
            <TitleCom
              mCategory="Kỹ thuật trồng trọt"
              mCont={
                <div>
                  <ImgWd
                    textAlign="center"
                    leftCol={12}
                    rightCol={12}
                    imgWidth={300}
                    imgSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    mLink="/"
                    linkTitle="Cam Lâm: Thu hoạch bội thu xoài"
                    mDetail="Diện tích nhỏ lẻ, manh mún, không đáp ứng quy mô vùng
                  sản xuất; tâm lý nông dân không muốn liên kết; chính
                  sách thay đổi là những nguyên nhân khiến công tác chuyển
                  đổi..."
                  />
                  <HImgWct
                    mNum="3"
                    imgWidth={180}
                    imgSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    mLink="/"
                    linkTitle="Title"
                  />
                </div>
              }
            />
            {item}
            <HImgWct
              mNum="4"
              imgWidth={180}
              imgSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              mLink="/"
              linkTitle="Title"
            />
          </div>
        }
      />
    </div>
  );
}

Crops.propTypes = {};

const mapStateToProps = createStructuredSelector({
  crops: makeSelectCrops(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Crops);
