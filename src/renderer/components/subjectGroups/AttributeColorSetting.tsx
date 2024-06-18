import React, { FC } from 'react';
import { ColorResult, HuePicker as ColorPicker } from 'react-color';
import MyInput from '#renderer/components/shared/inputs/myInput/MyInput.tsx';

import './attributeColorSetting.scss';

interface ISubjectGroupSettings {
  attr: string;
  value: string;
  onChange: (color: string) => void;
}

const AttributeColorSetting: FC<ISubjectGroupSettings> = ({
                                                            attr,
                                                            value,
                                                            onChange,
                                                          }) => {

  const onChangeColorHandler = (color: ColorResult) => {
    onChange(color.hex);
  };


  return (
    <div className={'attribute-color-setting'}>
      <div className={'attribute-name'}>
        {attr}
      </div>
      <div className={'color-input'}>
        <MyInput
          text={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className={'color-picker'}>
        <ColorPicker
          color={value}
          onChange={onChangeColorHandler}
          width={'100px'}
        />
      </div>
    </div>
  );
};

export default AttributeColorSetting;
