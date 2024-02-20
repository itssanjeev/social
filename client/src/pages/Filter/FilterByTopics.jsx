import React from 'react'
import { useState } from 'react';
import { Input, Radio, Space } from 'antd';
import { categoryPost } from '../../apicall/postApi';

const FilterByTopics = ({ setPosts }) => {
    const [value, setValue] = useState(4);
    const onChange = async (e) => {
        try {
            console.log('radio checked', e.target.value);
            setValue(e.target.value);
            const response = await categoryPost({ category: e.target.value });
            setPosts(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col ml-2">
            <div className='text-xl'>Post by topics</div>
            <div className='text-2xl'>
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                        <Radio value={1}><div className='text-xl'>Sports</div></Radio>
                        <Radio value={2}><div className='text-xl'>Politics</div></Radio>
                        <Radio value={3}><div className='text-xl'>Religion</div></Radio>
                        <Radio value={4}><div className='text-xl'>All</div></Radio>
                    </Space>
                </Radio.Group>
            </div>
        </div>
    )
}

export default FilterByTopics