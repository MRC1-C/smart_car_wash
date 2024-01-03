'use client'
import React from 'react';
import { Liquid } from '@ant-design/plots';


const ChartLiquid = (props:any) => {
  const config = {
    percent: props.v,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
     
  };
  return <Liquid {...config}/>;
};

export default ChartLiquid