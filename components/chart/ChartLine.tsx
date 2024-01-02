'use client'

import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';

const ChartLine = (props:any) => {
  const [dt, setDt] = useState<Array<any>>([])
  const data = [
    {
      time: '0',
      key: 'series1',
      value: 30,
    },
    {
      time: '2',
      key: 'series1',
      value: 32,
    },
    {
      time: '4',
      key: 'series1',
      value: 30,
    },
    {
      time: '6',
      key: 'series1',
      value: 31,
    },
    {
      time: '8',
      key: 'series1',
      value: 30,
    },
    {
      time: '10',
      key: 'series1',
      value: 40,
    },
    {
      time: '12',
      key: 'series1',
      value: 30,
    },
    {
      time: '14',
      key: 'series1',
      value: 20,
    },
    {
      time: '16',
      key: 'series1',
      value: 0,
    }
  ];
  function waitForOneSecond() {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      for (const d of data) {
        console.log('first');
        await waitForOneSecond();
        setDt(prev => [...prev, d]);
      }
      console.log('All done!');
    };
    if(props.isWater){
      fetchData();
    }
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