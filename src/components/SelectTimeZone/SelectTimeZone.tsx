import React, { FC } from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import { SelectTimeZoneModelProps } from './SelectTimeZone.model';

const { Option } = Select;

export const SelectTimeZone: FC<SelectTimeZoneModelProps> = ({ setTimeZone, widthScreen }) => {
  const changeTimeZone = (value: string) => {
    setTimeZone(value);
  };

  return (
    <div className="timezone">
      <Select defaultValue="+00:00" style={{ width: widthScreen > 800 ? 400 : widthScreen / 2 }} onChange={changeTimeZone}>
        <Option value="-12:00">(GMT -12:00) Eniwetok, Kwajalein</Option>
        <Option value="-11:00">(GMT -11:00) Midway Island, Samoa</Option>
        <Option value="-10:00">(GMT -10:00) Hawaii</Option>
        <Option value="-09:50">(GMT -9:30) Taiohae</Option>
        <Option value="-09:00">(GMT -9:00) Alaska</Option>
        <Option value="-08:00">(GMT -8:00) Pacific Time (US &amp; Canada)</Option>
        <Option value="-07:00">(GMT -7:00) Mountain Time (US &amp; Canada)</Option>
        <Option value="-06:00">(GMT -6:00) Central Time (US &amp; Canada), Mexico City</Option>
        <Option value="-05:00">(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima</Option>
        <Option value="-04:50">(GMT -4:30) Caracas</Option>
        <Option value="-04:00">(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz</Option>
        <Option value="-03:50">(GMT -3:30) Newfoundland</Option>
        <Option value="-03:00">(GMT -3:00) Brazil, Buenos Aires, Georgetown</Option>
        <Option value="-02:00">(GMT -2:00) Mid-Atlantic</Option>
        <Option value="-01:00">(GMT -1:00) Azores, Cape Verde Islands</Option>
        <Option value="+00:00">(GMT) Western Europe Time, London, Lisbon, Casablanca</Option>
        <Option value="+01:00">(GMT +1:00) Brussels, Copenhagen, Madrid, Paris</Option>
        <Option value="+02:00">(GMT +2:00) Kaliningrad, South Africa</Option>
        <Option value="+03:00">(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg</Option>
        <Option value="+03:50">(GMT +3:30) Tehran</Option>
        <Option value="+04:00">(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi</Option>
        <Option value="+04:50">(GMT +4:30) Kabul</Option>
        <Option value="+05:00">(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent</Option>
        <Option value="+05:50">(GMT +5:30) Bombay, Calcutta, Madras, New Delhi</Option>
        <Option value="+05:75">(GMT +5:45) Kathmandu, Pokhara</Option>
        <Option value="+06:00">(GMT +6:00) Almaty, Dhaka, Colombo</Option>
        <Option value="+06:50">(GMT +6:30) Yangon, Mandalay</Option>
        <Option value="+07:00">(GMT +7:00) Bangkok, Hanoi, Jakarta</Option>
        <Option value="+08:00">(GMT +8:00) Beijing, Perth, Singapore, Hong Kong</Option>
        <Option value="+08:75">(GMT +8:45) Eucla</Option>
        <Option value="+09:00">(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk</Option>
        <Option value="+09:50">(GMT +9:30) Adelaide, Darwin</Option>
        <Option value="+10:00">(GMT +10:00) Eastern Australia, Guam, Vladivostok</Option>
        <Option value="+10:50">(GMT +10:30) Lord Howe Island</Option>
        <Option value="+11:00">(GMT +11:00) Magadan, Solomon Islands, New Caledonia</Option>
        <Option value="+11:50">(GMT +11:30) Norfolk Island</Option>
        <Option value="+12:00">(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka</Option>
        <Option value="+12:75">(GMT +12:45) Chatham Islands</Option>
        <Option value="+13:00">(GMT +13:00) Apia, Nukualofa</Option>
        <Option value="+14:00">(GMT +14:00) Line Islands, Tokelau</Option>
      </Select>
    </div>
  );
};
