import radio from './rule/radio';
import checkbox from './rule/checkbox';
import card from './rule/card';
import input from './rule/input';
import inputPassword from './rule/inputPassword';
import inputTextArea from './rule/inputTextArea';
import number from './rule/number';
import select from './rule/select';
import _switch from './rule/switch';
import slider from './rule/slider';
import time from './rule/time';
import timeRangePicker from './rule/timeRangePicker';
import date from './rule/date';
import dateRangePicker from './rule/dateRangePicker';
import rate from './rule/rate';
import row from './rule/row';
import divider from './rule/divider';
import cascader from './rule/cascader';
// import upload from './rule/upload';
import transfer from './rule/transfer';
import tree from './rule/tree';
import alert from './rule/alert';
import span from './rule/span';
import space from './rule/space';
import button from './rule/button';
// import editor from './rule/editor';
import tab from './rule/tab';
import group from './rule/group';
import table from './rule/table';

export default function createMenu() {
    return [
        {
            name: 'main',
            title: '表单组件',
            list: [
                input, inputPassword, inputTextArea,
                number, radio, checkbox,
                date, dateRangePicker, select,
                time, timeRangePicker, _switch,
                slider, rate, cascader,
                transfer, tree
            ]
        },
        {
            name: 'aide',
            title: '辅助组件',
            list: [
                alert, button, span, divider,
            ]
        },
        {
            name: 'layout',
            title: '布局组件',
            list: [
                row, space, group, table, card, tab
            ]
        },
    ];
}