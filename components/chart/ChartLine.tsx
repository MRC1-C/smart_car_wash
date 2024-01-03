'use client'

import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';

const ChartLine = (props: any) => {
  const [dt, setDt] = useState<Array<any>>([])
  useEffect(() => {
    let c:any
    if (props.isWater) {
      c = setInterval(() => {
        let rd = Math.random() * 100
        setDt(prev => [...prev, {
          time: prev.length + 1,
          key: "Nước",
          value: (rd - prev.length*prev.length) >= 0 ? (rd - prev.length*prev.length) : 0
        }])
      }, 1000)
    }
    return () => clearInterval(c)
  }, [props.isWater])
  const config = {
    xField: 'time',
    yField: 'value',
    legend: false,
    seriesField: 'key',
    stepType: 'hvh',
  };
  return <Line data={dt} {...config} />;
};

export default ChartLine