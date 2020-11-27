/*
 * Item Messages
 *
 * This contains all the text for the Item component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.all';

export default defineMessages({
  medicine: {
    id: `${scope}.medicine`,
    defaultMessage: 'thuốc',
  },
  medicines: {
    id: `${scope}.medicines`,
    defaultMessage: 'thuốc',
  },
  good: {
    id: `${scope}.good`,
    defaultMessage: 'sản phẩm',
  },
  goods: {
    id: `${scope}.goods`,
    defaultMessage: 'sản phẩm',
  },
  importAdditional: {
    id: `${scope}.importAdditional`,
    defaultMessage: 'Nhập bổ xung',
  },
  importReturn: {
    id: `${scope}.importReturn`,
    defaultMessage: 'Nhập khách trả',
  },
  importAnother: {
    id: `${scope}.importAnother`,
    defaultMessage: 'Khác',
  },
  exportReturn: {
    id: `${scope}.exportReturn`,
    defaultMessage: 'Xuất trả nhà cung',
  },
  exportCancel: {
    id: `${scope}.exportCancel`,
    defaultMessage: 'Xuất hủy',
  },
  exportSelling: {
    id: `${scope}.exportSelling`,
    defaultMessage: 'Xuất bán',
  },
  checkingInventoryIncrease: {
    id: `${scope}.checkingInventoryIncrease`,
    defaultMessage: 'Kiểm kho',
  },
  checkingInventoryDecrease: {
    id: `${scope}.checkingInventoryDecrease`,
    defaultMessage: 'Kiểm kho',
  },
  unknown: {
    id: `${scope}.unknown`,
    defaultMessage: 'Khác',
  },
});
