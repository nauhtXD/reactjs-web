import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-component';
// import { Layout } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelect from './selectors';
import reducer from './reducer';
import saga from './saga';

// import * as action from './actions';
import * as hAction from '../Home/actions';
import makeSelectHome from '../Home/selectors';

import MyLayout from '../../components/MyLayout/index';
import TitleCom from '../../components/TitleCom/index';
import { API_KEY, CenterDiv, ContentDiv } from '../../components/Style/index';

const bcrData = [
  {
    name: 'Giới thiệu',
  },
];

export function Introduce(props) {
  useInjectReducer({ key: 'introduce', reducer });
  useInjectSaga({ key: 'introduce', saga });

  const [usrName, setUsrName] = useState(null);

  useEffect(() => {
    props.getCategories();
    props.getSubCategories();
    props.getContacts();
    props.getCityList();
    props.getLastestDocuments(4);
    props.getBanners();
  }, []);

  useEffect(() => {
    const dataList = props.homeReducer.cityList.map(i => i.province.weatherId);
    if (dataList.length > 0)
      props.getWeathers({
        data: [...new Set(dataList)],
        key: API_KEY,
      });
  }, [props.homeReducer.cityList]);

  useEffect(() => {
    if (props.homeReducer.loginToken.token) {
      localStorage.setItem('authToken', props.homeReducer.loginToken.token);
      localStorage.setItem('usrId', props.homeReducer.loginToken.uid);
      localStorage.setItem('usrName', usrName);
      window.location.reload();
    }
  }, [props.homeReducer.loginToken]);

  const handleLogin = values => {
    setUsrName(values.username);
    props.getLoginToken(values);
  };

  return (
    <div>
      <Helmet>
        <title>Introduce</title>
        <meta name="description" content="Description of Introduce" />
      </Helmet>
      <MyLayout
        mCont={
          <TitleCom
            mCategory="Chức năng nhiệm vụ"
            mCont={
              <div>
                <CenterDiv>
                  <ContentDiv
                    style={{
                      WebkitLineClamp: 100,
                      fontSize: '1.2vw',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: `<p style='box-sizing: border-box; outline: 0px !important; margin: 0px 0px 10px; padding: 0px; color: rgb(51, 51, 51); font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 13px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;'><strong style="box-sizing: border-box; outline: 0px !important; font-weight: 700;">I. Chức năng</strong></p>
                      <p style='box-sizing: border-box; outline: 0px !important; margin: 0px 0px 10px; padding: 0px; color: rgb(51, 51, 51); font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 13px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;'>1. Tập hợp, vận động, gi&aacute;o dục hội vi&ecirc;n, n&ocirc;ng d&acirc;n ph&aacute;t huy quyền l&agrave;m chủ, t&iacute;ch cực học tập n&acirc;ng cao tr&igrave;nh độ, năng lực về mọi mặt.</p>
                      <p style='box-sizing: border-box; outline: 0px !important; margin: 0px 0px 10px; padding: 0px; color: rgb(51, 51, 51); font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 13px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;'>2. Đại diện giai cấp n&ocirc;ng d&acirc;n tham gia x&acirc;y dựng Đảng, Nh&agrave; nước v&agrave; khối đại đo&agrave;n kết to&agrave;n d&acirc;n tộc.</p>
                      <p style='box-sizing: border-box; outline: 0px !important; margin: 0px 0px 10px; padding: 0px; color: rgb(51, 51, 51); font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 13px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;'>3. Chăm lo, bảo vệ quyền v&agrave; lợi &iacute;ch ch&iacute;nh đ&aacute;ng, hợp ph&aacute;p của n&ocirc;ng d&acirc;n; tổ chức c&aacute;c hoạt động dịch vụ, tư vấn, hỗ trợ n&ocirc;ng d&acirc;n trong sản xuất, kinh doanh v&agrave; đời sống.</p>
                      <p style='box-sizing: border-box; outline: 0px !important; margin: 0px 0px 10px; padding: 0px; color: rgb(51, 51, 51); font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 13px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;'><strong style="box-sizing: border-box; outline: 0px !important; font-weight: 700;">II. Nhiệm vụ</strong></p>
                      <p style='box-sizing: border-box; outline: 0px !important; margin: 0px 0px 10px; padding: 0px; color: rgb(51, 51, 51); font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 13px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;'>1. Tuy&ecirc;n truyền, vận động c&aacute;n bộ, hội vi&ecirc;n, n&ocirc;ng d&acirc;n hiểu v&agrave; t&iacute;ch cực thực hiện đường lối, chủ trương của Đảng, ch&iacute;nh s&aacute;ch, ph&aacute;p luật của Nh&agrave; nước; nghị quyết, chỉ thị của Hội. Khơi dậy v&agrave; ph&aacute;t huy truyền thống y&ecirc;u nước, &yacute; ch&iacute; c&aacute;ch mạng, tinh thần tự lực, tự cường, lao động s&aacute;ng tạo của n&ocirc;ng d&acirc;n.</p>
                      <p style='box-sizing: border-box; outline: 0px !important; margin: 0px 0px 10px; padding: 0px; color: rgb(51, 51, 51); font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 13px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;'>2. Vận động, tập hợp, l&agrave;m n&ograve;ng cốt tổ chức c&aacute;c phong tr&agrave;o n&ocirc;ng d&acirc;n ph&aacute;t triển kinh tế, văn ho&aacute;, x&atilde; hội, quốc ph&ograve;ng, an ninh; x&acirc;y dựng n&ocirc;ng th&ocirc;n mới.</p>
                      <p style='box-sizing: border-box; outline: 0px !important; margin: 0px 0px 10px; padding: 0px; color: rgb(51, 51, 51); font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 13px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;'>3. Chăm lo đời sống vật chất v&agrave; tinh thần của hội vi&ecirc;n, n&ocirc;ng d&acirc;n. Trực tiếp thực hiện v&agrave; phối hợp thực hiện một số chương tr&igrave;nh, đề &aacute;n ph&aacute;t triển kinh tế, văn ho&aacute;, x&atilde; hội n&ocirc;ng th&ocirc;n; hướng dẫn ph&aacute;t triển c&aacute;c h&igrave;nh thức kinh tế tập thể trong n&ocirc;ng nghiệp, n&ocirc;ng th&ocirc;n. Tổ chức c&aacute;c hoạt động dịch vụ, tư vấn, hỗ trợ, dạy nghề, khoa học c&ocirc;ng nghệ gi&uacute;p n&ocirc;ng d&acirc;n ph&aacute;t triển sản xuất, n&acirc;ng cao đời sống, bảo vệ m&ocirc;i trường.</p>
                      <p style='box-sizing: border-box; outline: 0px !important; margin: 0px 0px 10px; padding: 0px; color: rgb(51, 51, 51); font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 13px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;'>4. Đo&agrave;n kết, tập hợp đ&ocirc;ng đảo n&ocirc;ng d&acirc;n v&agrave;o tổ chức Hội, ph&aacute;t triển v&agrave; n&acirc;ng cao chất lượng hội vi&ecirc;n. X&acirc;y dựng tổ chức Hội vững mạnh về mọi mặt; đ&agrave;o tạo, bồi dưỡng c&aacute;n bộ Hội đ&aacute;p ứng y&ecirc;u cầu, nhiệm vụ thời kỳ c&ocirc;ng nghiệp ho&aacute;, hiện đại ho&aacute; đất nước.</p>
                      <p style='box-sizing: border-box; outline: 0px !important; margin: 0px 0px 10px; padding: 0px; color: rgb(51, 51, 51); font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 13px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;'>5. Tham gia x&acirc;y dựng Đảng, ch&iacute;nh quyền trong sạch, vững mạnh. Tham gia gi&aacute;m s&aacute;t v&agrave; phản biện x&atilde; hội theo quy chế; tham gia x&acirc;y dựng cơ chế, ch&iacute;nh s&aacute;ch ph&aacute;t triển n&ocirc;ng nghiệp, n&ocirc;ng d&acirc;n, n&ocirc;ng th&ocirc;n. Kịp thời phản &aacute;nh t&acirc;m tư nguyện vọng của n&ocirc;ng d&acirc;n với Đảng v&agrave; Nh&agrave; nước; bảo vệ c&aacute;c quyền v&agrave; lợi &iacute;ch ch&iacute;nh đ&aacute;ng, hợp ph&aacute;p của hội vi&ecirc;n, n&ocirc;ng d&acirc;n. Thực hiện Quy chế d&acirc;n chủ ở cơ sở, giữ g&igrave;n đo&agrave;n kết trong nội bộ n&ocirc;ng d&acirc;n; g&oacute;p phần x&acirc;y dựng khối đại đo&agrave;n kết to&agrave;n d&acirc;n, giữ vững an ninh ch&iacute;nh trị, trật tự an to&agrave;n x&atilde; hội; chống quan li&ecirc;u, tham nhũng, l&atilde;ng ph&iacute; v&agrave; c&aacute;c tệ nạn x&atilde; hội.</p>
                      <p style='box-sizing: border-box; outline: 0px !important; margin: 0px 0px 10px; padding: 0px; color: rgb(51, 51, 51); font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 13px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;'>6. Mở rộng hoạt động đối ngoại theo quan điểm, đường lối của Đảng, tăng cường hợp t&aacute;c, trao đổi, học tập kinh nghiệm, tiến bộ khoa học kỹ thuật, quảng b&aacute; h&agrave;ng ho&aacute; n&ocirc;ng sản, văn ho&aacute; Việt Nam với tổ chức n&ocirc;ng d&acirc;n, tổ chức quốc tế, c&aacute;c tổ chức ch&iacute;nh phủ, phi ch&iacute;nh phủ trong khu vực v&agrave; tr&ecirc;n thế giới.</p>
                      <p style='box-sizing: border-box; outline: 0px !important; margin: 0px 0px 10px; padding: 0px; color: rgb(51, 51, 51); font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 13px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; text-align: right;'><span style="box-sizing: border-box; outline: 0px !important; color: rgb(153, 153, 153);"><em style="box-sizing: border-box; outline: 0px !important;"><strong style="box-sizing: border-box; outline: 0px !important; font-weight: 700;">Theo Điều lệ Hội N&ocirc;ng d&acirc;n Việt Nam kh&oacute;a VI (nhiệm kỳ 2013 - 2018)</strong></em></span></p>`,
                    }}
                  />
                </CenterDiv>
              </div>
            }
          />
        }
        mCategories={props.homeReducer.categories}
        mSubCategories={props.homeReducer.subCategories}
        mContacts={props.homeReducer.contacts}
        mCreateReport={props.createProblem}
        mDocuments={props.homeReducer.lastestDocuments}
        mWeathers={props.homeReducer.weathers}
        mLogin={handleLogin}
        mBanner={props.homeReducer.banners}
        mBreadcrumbs={bcrData}
      />
    </div>
  );
}

Introduce.propTypes = {
  homeReducer: PropTypes.any,
  // introduceReducer: PropTypes.any,
  getCategories: PropTypes.func,
  getSubCategories: PropTypes.func,
  getContacts: PropTypes.func,
  createProblem: PropTypes.func,
  getLastestDocuments: PropTypes.func,
  getWeathers: PropTypes.func,
  getCityList: PropTypes.func,
  getLoginToken: PropTypes.func,
  getBanners: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  introduceReducer: makeSelect(),
  homeReducer: makeSelectHome(),
});

const mapDispatchToProps = dispatch => ({
  getBanners: data => {
    dispatch(hAction.getBanners(data));
  },
  getLoginToken: data => {
    dispatch(hAction.getLoginToken(data));
  },
  getCategories: data => {
    dispatch(hAction.getCategories(data));
  },
  getSubCategories: data => {
    dispatch(hAction.getSubCategories(data));
  },
  getContacts: data => {
    dispatch(hAction.getContacts(data));
  },
  getCityList: data => {
    dispatch(hAction.getCityList(data));
  },
  getWeathers: data => {
    dispatch(hAction.getWeathers(data));
  },
  createProblem: data => {
    dispatch(hAction.createProblem(data));
  },
  getLastestDocuments: data => {
    dispatch(hAction.getLastestDocuments(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Introduce);
