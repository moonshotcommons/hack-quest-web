import React, { useEffect } from 'react';
import * as echarts from 'echarts';

export interface OptionDataType {
  value: number;
  name: string;
}

interface ChartsProp {
  optionData: OptionDataType[];
}

const Charts: React.FC<ChartsProp> = ({ optionData }) => {
  const option = {
    legend: {
      orient: 'vertical',
      left: 'right',
      align: 'left',
      itemGap: 6,
      textStyle: {
        fontFamily: 'NEXT Book',
        fonstSize: '14px'
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
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
        data: []
      }
    ]
  };
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('github'));
    option.series[0].data = optionData as [];
    myChart.setOption(option);
  }, [optionData]);
  return <div id="github" className="h-[136px] w-full"></div>;
};

export default Charts;
