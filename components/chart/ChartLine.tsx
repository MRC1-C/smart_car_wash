'use client'

import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';

const ChartLine = () => {
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
  const config = {
    data,
    xField: 'time',
    yField: 'value',
    legend: false,
    seriesField: 'key',
    stepType: 'hvh',
  };
  return <Line {...config} />;
};

export default ChartLine