import radio from './radio';
import checkbox from './checkbox';
import card from './card';
import input from './input';
import inputPassword from './inputPassword';
import inputTextArea from './inputTextArea';
import number from './number';
import select from './select';
import _switch from './switch';
import slider from './slider';
import time from './time';
import timeRangePicker from './timeRangePicker';
import date from './date';
import dateRangePicker from './dateRangePicker';
import rate from './rate';
import group from './group';
import row from './row';
import col from './col';
import tabPane from './tabPane';
import divider from './divider';
import cascader from './cascader';
import upload from './upload';
import transfer from './transfer';
import tree from './tree';
import table from './table';
import alert from './alert';
import span from './span';
import space from './space';
import tab from './tab';
import button from './button';
import editor from './editor';


const ruleList = {
    [radio.name]: radio,
    [checkbox.name]: checkbox,
    [input.name]: input,
    [card.name]: card,
    [inputPassword.name]: inputPassword,
    [inputTextArea.name]: inputTextArea,
    [number.name]: number,
    [select.name]: select,
    [_switch.name]: _switch,
    [slider.name]: slider,
    [time.name]: time,
    [timeRangePicker.name]: timeRangePicker,
    [date.name]: date,
    [dateRangePicker.name]: dateRangePicker,
    [rate.name]: rate,
    [group.name]: group,
    [row.name]: row,
    [col.name]: col,
    [tab.name]: tab,
    [tabPane.name]: tabPane,
    [divider.name]: divider,
    [cascader.name]: cascader,
    [upload.name]: upload,
    [transfer.name]: transfer,
    [tree.name]: tree,
    [table.name]: table,
    [alert.name]: alert,
    [span.name]: span,
    [space.name]: space,
    [button.name]: button,
    [editor.name]: editor,
};

export default ruleList;