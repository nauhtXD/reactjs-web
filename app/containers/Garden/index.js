import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-component';
import { Divider, Form, Input, Select, DatePicker } from 'antd';
import moment from 'moment';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelect from './selectors';
import reducer from './reducer';
import saga from './saga';

import * as action from './actions';
import * as hAction from '../Home/actions';
import makeSelectHome from '../Home/selectors';

// import messages from './messages';
import MyLayout from '../../components/MyLayout/Loadable';
import TitleCom from '../../components/TitleCom/Loadable';
import MyTable from '../../components/MyTable/Loadable';
import {
  API_KEY,
  MyAntdModal,
  MyAntdForm,
  MyLink,
  layout,
  dateFormat,
} from '../../components/Style/index';

const bcrData = [
  {
    name: 'Vườn cây của tôi',
  },
];

const { Option } = Select;
let k = -1;

const plantPropertyNames = [
  {
    title: 'Loại cây',
    data: ['genusFeature', 'name'],
  },

  {
    title: 'Số gốc cây',
    data: 'root',
  },
  {
    title: 'Ngày trồng',
    data: 'publishAt',
    render: record => moment(record).format(dateFormat),
  },
  {
    title: 'Cập nhật lần cuối',
    data: 'updateAt',
    render: record => moment(record).format(dateFormat),
  },
];

const propertyNames = [
  {
    title: 'Loại cây',
    data: ['plant', 'genusFeature', 'name'],
  },

  {
    title: 'Tên bệnh',
    data: ['epidemic', 'name'],
  },
  {
    title: 'Ngày bắt đầu',
    data: 'createdAt',
    render: record => moment(record).format(dateFormat),
  },
  {
    title: 'Trạng thái',
    data: 'status',
  },
];

const propertyNames1 = [
  {
    title: 'Loại cây',
    data: ['plant', 'genusFeature', 'name'],
  },

  {
    title: 'Tên bệnh',
    data: ['epidemic', 'name'],
  },
  {
    title: 'Ngày bắt đầu',
    data: 'createdAt',
    render: record => moment(record).format(dateFormat),
  },
  {
    title: 'Ngày kết thúc',
    data: 'updatedAt',
    render: record => moment(record).format(dateFormat),
  },
];

export function Garden(props) {
  // eslint-disable-next-line react/prop-types
  const { match } = props;
  useInjectReducer({ key: 'garden', reducer });
  useInjectSaga({ key: 'garden', saga });

  const userId = match.params.id;
  const [form] = Form.useForm();
  const [plantForm] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [plantVisible, setPlantVisible] = useState(false);
  const [isRerender, setIsRerender] = useState(false);
  const [stillList, setStillList] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const [epidemicList, setEpidemicList] = useState([]);

  useEffect(() => {
    props.getContacts();
    props.getCategories();
    props.getSubCategories();
    props.getCityList();
    props.getLastestDocuments(4);
    props.getBanners();
    props.getEpidemics();
    props.getGenusFeatures();
    props.getEpidemicHistories(userId);
    props.getPlants(userId);
    props.getHousehold(userId);
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
      localStorage.setItem(
        'usr',
        JSON.stringify(props.homeReducer.loginToken.user),
      );
      window.location.reload();
    }
  }, [props.homeReducer.loginToken]);

  useEffect(() => {
    if (
      props.gardenReducer.epidemicHistories.length > 0 ||
      props.gardenReducer.epidemicHistories.plantId
    ) {
      setStillList([]);
      setHistoryList([]);
      props.gardenReducer.epidemicHistories.map(i =>
        i.status
          ? setStillList(j => [...j, i])
          : setHistoryList(j => [...j, i]),
      );
    }
  }, [props.gardenReducer.epidemicHistories]);

  useEffect(() => {
    if (localStorage.getItem('usr'))
      props.getForumPostsByUID(JSON.parse(localStorage.getItem('usr')).id);
  }, [localStorage.getItem('usr')]);

  useEffect(() => {
    props.getPlants(userId);
    props.getEpidemicHistories(userId);
  }, [isRerender]);

  useEffect(() => {
    props.getPlants(userId);
    props.getEpidemicHistories(userId);
    if (k === -1) k = 0;
  }, [isRerender]);

  useEffect(() => {
    props.getPlants(userId);
    props.getEpidemicHistories(userId);
  }, [isRerender, k]);

  const handleLogin = values => {
    props.getLoginToken(values);
  };

  const handleUpdate = record => {
    const data = { ...record };
    delete data.id;
    props.updateEpidemicHistory(data);
    setIsRerender(!isRerender);
  };

  const handleClick = (record, key) => {
    const data = { ...record };
    data.publishAt = moment(record.publishAt).format();
    if (key === 0) props.updatePlant(data);
    else props.deletePlant(record);
    setIsRerender(!isRerender);
  };

  const showModal = key => {
    if (key === 1) {
      plantForm.setFieldsValue({
        genusFeatureId: 1,
        publishAt: moment(),
        root: 1,
      });
      setPlantVisible(!plantVisible);
    } else if (key === 2) {
      if (props.gardenReducer.plants[0]) {
        const { id } = props.gardenReducer.plants[0];
        form.setFieldsValue({
          plantId: id,
        });
        handleSelect(id);
      }
      setIsVisible(!isVisible);
    }
  };

  const handleSubmit = key => {
    if (key === 1) {
      plantForm.validateFields().then(values => {
        const data = {
          ...values,
          householdId: props.gardenReducer.household.id,
        };
        props.createPlant(data);
        showModal(1);
      });
    } else if (key === 2) {
      form.validateFields().then(values => {
        const data = {
          ...values,
        };
        props.createEpidemicHistory(data);
        showModal(2);
      });
    }
    setIsRerender(!isRerender);
  };

  const handleSelect = e => {
    const data = props.gardenReducer.epidemics;
    const remove = props.gardenReducer.epidemicHistories.map(
      i => i.plantId === e && i.status && i.epidemicId,
    );
    const filterData = data.filter(i => remove.indexOf(i.id) === -1);
    setEpidemicList(filterData);
    form.setFieldsValue({
      epidemicId: filterData[0]
        ? filterData[0].id
        : 'Không còn dữ liệu dịch bệnh khác',
    });
  };

  const myModal = [
    <div>
      <Form.Item label="Loại cây" name="plantId">
        <Select disabled>
          {props.gardenReducer.plants.map(i => (
            <Option key={i.id} value={i.id}>
              {i.genusFeature.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Dịch bệnh" name="epidemicId">
        <Select disabled>
          {props.gardenReducer.epidemics.map(i => (
            <Option key={i.id} value={i.id}>
              {i.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Trạng thái" name="status">
        <Select>
          <Option value={false}>Đã kết thúc</Option>
          <Option value>Đang diễn ra</Option>
        </Select>
      </Form.Item>
    </div>,
  ];

  const myPlantModal = [
    <div>
      <Form.Item name="genusFeatureId" label="Loại cây">
        <Select>
          {props.gardenReducer.genusFeatures.map(i => (
            <Option key={i.id} value={i.id}>
              {i.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="root"
        label="Số gốc cây"
        rules={[{ required: true, message: 'Vui lòng nhập số gốc cây!' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item name="publishAt" label="Thời gian trồng">
        <DatePicker format={dateFormat} />
      </Form.Item>
    </div>,
  ];

  return (
    <div>
      <Helmet>
        <title>Garden</title>
        <meta name="description" content="Description of Garden" />
      </Helmet>
      <MyLayout
        mCont={
          <div>
            <TitleCom
              mCategory="Vườn cây của tôi"
              mCont={
                <div>
                  {props.gardenReducer.plants ? (
                    <div>
                      <MyTable
                        mPropertyNames={plantPropertyNames}
                        mData={props.gardenReducer.plants}
                        mUpdate={handleClick}
                        mDelete={handleClick}
                        mModal={myPlantModal}
                      />
                      {props.gardenReducer.epidemicHistories[0] && (
                        <div>
                          <Divider
                            orientation="center"
                            style={{ fontSize: '1.14vw' }}
                          >
                            Lịch sử dịch bệnh
                          </Divider>
                          <Divider
                            orientation="left"
                            style={{ fontSize: '1.14vw' }}
                          >
                            Đang diễn ra
                            <span style={{ float: 'right' }}>
                              <MyLink onClick={() => showModal(2)}>
                                Tạo mới
                              </MyLink>
                            </span>
                          </Divider>
                          <MyTable
                            mData={stillList}
                            mPropertyNames={propertyNames}
                            mUpdate={handleUpdate}
                            mModal={myModal}
                          />
                          <Divider
                            orientation="left"
                            style={{ fontSize: '1.14vw' }}
                          >
                            Đã kết thúc
                          </Divider>
                          <MyTable
                            mData={historyList}
                            mPropertyNames={propertyNames1}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>Không có dữ liệu cây trồng</div>
                  )}
                </div>
              }
              mCreate={
                localStorage.getItem('usr') &&
                JSON.parse(localStorage.getItem('usr')).userType.name.includes(
                  'User',
                )
                  ? () => showModal(1)
                  : null
              }
            />
          </div>
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
        mUpdate={props.updateUser}
        mThread={props.homeReducer.forumPosts}
      />
      <MyAntdModal
        title="Thêm cây trồng"
        centered
        visible={plantVisible}
        onCancel={() => showModal(1)}
        onOk={() => handleSubmit(1)}
        okText="Tạo"
        cancelText="Hủy"
      >
        <MyAntdForm form={plantForm} {...layout}>
          {myPlantModal}
        </MyAntdForm>
      </MyAntdModal>
      <MyAntdModal
        title="Thêm lịch sử"
        centered
        visible={isVisible}
        onCancel={() => showModal(2)}
        onOk={() => handleSubmit(2)}
        okText="Tạo"
        cancelText="Hủy"
      >
        <MyAntdForm form={form} {...layout}>
          <Form.Item label="Loại cây" name="plantId">
            <Select onSelect={handleSelect}>
              {props.gardenReducer.plants &&
                props.gardenReducer.plants.map(i => (
                  <Option key={i.id} value={i.id}>
                    {i.genusFeature.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item label="Dịch bệnh" name="epidemicId">
            <Select>
              {epidemicList &&
                epidemicList.map(i => (
                  <Option key={i.id} value={i.id}>
                    {i.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Nội dung"
            name="content"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </MyAntdForm>
      </MyAntdModal>
    </div>
  );
}

Garden.propTypes = {
  homeReducer: PropTypes.any,
  gardenReducer: PropTypes.any,
  getCategories: PropTypes.func,
  getSubCategories: PropTypes.func,
  getContacts: PropTypes.func,
  createProblem: PropTypes.func,
  getLastestDocuments: PropTypes.func,
  getWeathers: PropTypes.func,
  getCityList: PropTypes.func,
  getLoginToken: PropTypes.func,
  getBanners: PropTypes.func,
  updateUser: PropTypes.func,
  getForumPostsByUID: PropTypes.func,
  getEpidemics: PropTypes.func,
  getEpidemicHistories: PropTypes.func,
  createEpidemicHistory: PropTypes.func,
  getPlants: PropTypes.func,
  updateEpidemicHistory: PropTypes.func,
  createPlant: PropTypes.func,
  updatePlant: PropTypes.func,
  deletePlant: PropTypes.func,
  getGenusFeatures: PropTypes.func,
  getHousehold: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  gardenReducer: makeSelect(),
  homeReducer: makeSelectHome(),
});

const mapDispatchToProps = dispatch => ({
  getForumPostsByUID: data => {
    dispatch(hAction.getForumPostsByUID(data));
  },
  updateUser: data => {
    dispatch(hAction.updateUser(data));
  },
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
  getEpidemics: data => {
    dispatch(action.getEpidemics(data));
  },
  getEpidemicHistories: data => {
    dispatch(action.getEpidemicHistories(data));
  },
  updateEpidemicHistory: data => {
    dispatch(action.updateEpidemicHistory(data));
  },
  createEpidemicHistory: data => {
    dispatch(action.createEpidemicHistory(data));
  },
  getPlants: data => {
    dispatch(action.getPlants(data));
  },
  getGenusFeatures: data => {
    dispatch(action.getGenusFeatures(data));
  },
  createPlant: data => {
    dispatch(action.createPlant(data));
  },
  updatePlant: data => {
    dispatch(action.updatePlant(data));
  },
  deletePlant: data => {
    dispatch(action.deletePlant(data));
  },
  getHousehold: data => {
    dispatch(action.getHousehold(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Garden);
