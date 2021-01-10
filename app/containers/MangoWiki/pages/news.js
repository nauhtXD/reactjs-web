/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Card, List, Space } from 'antd';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import makeSelect from '../selectors';
import * as action from '../actions';

import TitleCom from '../../../components/TitleCom';
import DividerList from '../../../components/DividerList';
import { MyLink } from '../../../components/Style/index';

const { Meta } = Card;

function WikiNews(props) {
  // eslint-disable-next-line react/prop-types
  const { match } = props;
  let mD = '';
  useInjectReducer({ key: 'mangoWiki', reducer });
  useInjectSaga({ key: 'mangoWiki', saga });

  useEffect(() => {
    if (match.params.genusFeatureId) {
      mD = `/genusFeatures/${match.params.genusFeatureId}`;
    } else if (match.params.genusId) {
      mD = `/genera/${match.params.genusId}`;
    } else {
      mD = `/families/${match.params.familyId}`;
    }
    props.getNew(mD);
  }, [
    match.params.familyId,
    match.params.genusId,
    match.params.genusFeatureId,
  ]);

  return (
    <div>
      <Helmet>
        <title>WikiNews</title>
        <meta name="description" content="News of MangoWiki" />
      </Helmet>
      <div>
        {props.mangoWikiReducer.new.data && (
          <TitleCom
            mCategory={props.mangoWikiReducer.new.data.name}
            mCont={
              <div>
                <Row gutter={16}>
                  <Col span={16} style={{ lineHeight: 1.5 }}>
                    {props.mangoWikiReducer.new.data.define}
                    {props.mangoWikiReducer.new.genera &&
                      props.mangoWikiReducer.new.genera.length > 0 && (
                      <div>
                        <DividerList
                          mTitle="Các chi"
                          mSource={props.mangoWikiReducer.new.genera}
                          mListItem={item => (
                            <List.Item>
                              <MyLink
                                href={`${window.location.href}/${item.id}`}
                                style={{ marginLeft: '5%' }}
                              >
                                {'• '}
                                {item.scienceName}
                              </MyLink>
                            </List.Item>
                          )}
                        />
                      </div>
                    )}
                    {props.mangoWikiReducer.new.genusFeatures &&
                      props.mangoWikiReducer.new.genusFeatures.length > 0 && (
                      <div>
                        <DividerList
                          mTitle="Các loài"
                          mSource={props.mangoWikiReducer.new.genusFeatures}
                          mListItem={item => (
                            <List.Item>
                              <MyLink
                                href={`${window.location.href}/${item.id}`}
                                style={{ marginLeft: '5%' }}
                              >
                                {'• '}
                                {item.scienceName
                                  ? item.scienceName
                                  : item.name}
                              </MyLink>
                            </List.Item>
                          )}
                        />
                      </div>
                    )}
                    {props.mangoWikiReducer.new.characteristics &&
                      props.mangoWikiReducer.new.characteristics.length > 0 && (
                      <DividerList
                        mTitle="Đặc điểm"
                        mCont={
                          <div>
                            {props.mangoWikiReducer.new.characteristics.map(
                              i => (
                                <ul>
                                  <li>{`Rễ: ${i.root}`}</li>
                                  <li>{`Thân: ${i.stem}`}</li>
                                  <li>{`Tán: ${i.foliage}`}</li>
                                  <li>{`Hoa: ${i.flower}`}</li>
                                  <li>{`Quả: ${i.fruit}`}</li>
                                </ul>
                              ),
                            )}
                          </div>
                        }
                      />
                    )}
                    {props.mangoWikiReducer.new.plantingTechniques &&
                      props.mangoWikiReducer.new.plantingTechniques.length >
                        0 && (
                      <DividerList
                        mTitle="Cách trồng"
                        mCont={
                          <div>
                            {props.mangoWikiReducer.new.plantingTechniques.map(
                              (i, index) => (
                                <ul>
                                  <p
                                    style={{ fontSize: '15px' }}
                                  >{`Cách ${index + 1}:`}</p>
                                  <li>{`Chọn giống: ${i.seed}`}</li>
                                  <li>{`Chuẩn bị đất: ${
                                    i.soilPreparation
                                  }`}</li>
                                  <li>{`Thời gian trồng: ${i.time}`}</li>
                                  <li>{`Khoảng cách trồng: ${i.density}`}</li>
                                  <li>{`Phương pháp: ${i.technique}`}</li>
                                </ul>
                              ),
                            )}
                          </div>
                        }
                      />
                    )}
                    {props.mangoWikiReducer.new.breedings &&
                      props.mangoWikiReducer.new.breedings.length > 0 && (
                      <DividerList
                        mTitle="Cách trồng"
                        mCont={
                          <div>
                            <ul>
                              {props.mangoWikiReducer.new.breedings.map(i => (
                                <li>
                                  <Space>
                                    <p>{i.methodName}:</p>
                                    <p>{i.detail}</p>
                                  </Space>
                                </li>
                              ))}
                            </ul>
                          </div>
                        }
                      />
                    )}
                    {props.mangoWikiReducer.new.handleFlowers &&
                      props.mangoWikiReducer.new.handleFlowers.length > 0 && (
                      <DividerList
                        mTitle="Xử lý ra hoa"
                        mCont={
                          <div>
                            <ul>
                              {props.mangoWikiReducer.new.handleFlowers.map(i => (
                                <li>
                                  <Space>
                                    <p>{i.name}:</p>
                                    <p>{i.detail}</p>
                                  </Space>
                                </li>
                              ))}
                            </ul>
                          </div>
                        }
                      />
                    )}
                    {props.mangoWikiReducer.new.manures &&
                      props.mangoWikiReducer.new.manures.length > 0 && (
                      <DividerList
                        mTitle="Bón phân"
                        mCont={
                          <div>
                            <ul>
                              {props.mangoWikiReducer.new.manures.map(i => (
                                <li>
                                  <Space>
                                    <p>{i.stage}:</p>
                                    <p>{i.method}</p>
                                  </Space>
                                </li>
                              ))}
                            </ul>
                          </div>
                        }
                      />
                    )}
                  </Col>
                  <Col span={8}>
                    <Card
                      hoverable
                      style={{ width: '280px' }}
                      cover={
                        <img
                          alt="example"
                          src={props.mangoWikiReducer.new.data.img}
                        />
                      }
                    >
                      <Meta
                        title={props.mangoWikiReducer.new.data.scienceName}
                        description={props.mangoWikiReducer.new.data.name}
                      />
                    </Card>
                  </Col>
                </Row>
              </div>
            }
          />
        )}
      </div>
      <div />
    </div>
  );
}

WikiNews.propTypes = {
  mangoWikiReducer: PropTypes.any,
  getNew: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  mangoWikiReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getNew: data => {
    dispatch(action.getNew(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WikiNews);
