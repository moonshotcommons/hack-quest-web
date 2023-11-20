import React, { useEffect } from 'react';
import * as echarts from 'echarts';

interface ChartsProp {}

const Charts: React.FC<ChartsProp> = () => {
  const option = {
    legend: {
      orient: 'vertical',
      left: 'right',
      align: 'left',
      textStyle: {
        fontFamily: 'NEXT Book',
        fonstSize: '14px'
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '80%'],
        center: ['36%', '50%'],
        label: {
          show: true,
          formatter: '{d}%', // 使用 {d} 占比和百分号表示
          position: 'outside',
          alignTo: 'labelLine',
          textStyle: {
            fontFamily: 'NEXT Book',
            fonstSize: '12px',
            color: '#8c8c8c'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2
        },
        labelLine: {
          show: true
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('github'));
    myChart.setOption(option);
  }, []);
  return <div id="github" className="w-full h-[140px]"></div>;
};

export default Charts;
