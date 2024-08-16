import React, { memo } from 'react';

const InputField = memo(({ value, onChange }) => {
    return (
        <input
            className='input-main'
            type="text"
            value={value}
            onChange={onChange}
            placeholder='Write your todo here!'
        />
    );
});

export default InputField;
