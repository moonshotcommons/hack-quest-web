import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import { DistributionTab } from '../../../../../constants/type';
import { DistributionType, GrowthType } from '@/service/webApi/resourceStation/type';
import { separationNumber } from '@/helper/utils';

interface GrowthEchartlineProps {
  data: GrowthType[];
  curTab: DistributionTab;
}
const GrowthEchartline: React.FC<GrowthEchartlineProps> = ({ data, curTab }) => {
  const option = useMemo(() => {
    return {
      grid: {
        left: 60,
        right: 60,
        top: 60,
        bottom: 60
      },
      tooltip: {
        trigger: 'item', // 触发类型，可以是 'item' 或 'axis'
        backgroundColor: '#fff', // 背景颜色
        borderColor: '#fff', // 边框颜色
        textStyle: {
          color: '#3E3E3E', // 文字颜色
          fontSize: 10 // 字体大小
        },
        formatter: function (params: any) {
          var html = `<div style="text-align: center;">
                        <p>${params.seriesName} ${curTab}</p>
                        <p>${params.name}</p>
                        <p style="font-size: 16px; font-weight: bold;line-height:26px;">${separationNumber(params.value)}</p>
                      </div>`;
          // 自定义内容
          return html;
        }
      },
      xAxis: {
        type: 'category',
        data: data?.[0]?.data?.map((v) => v.time)
      },
      yAxis: {
        type: 'value'
      },
      series:
        data?.map((v) => ({
          data: v?.data?.map((c) => c.count),
          type: 'line',
          name: v?.sourceName,
          itemStyle: {
            color: v?.color
          }
        })) || []
    };
  }, [data, curTab]);

  return <ReactEcharts option={option} />;
};

GrowthEchartline.displayName = 'GrowthEchartline';

interface SourceEchartPieBarProps {
  data: DistributionType[];
  tab?: string;
  total?: number;
}
const SourceEchartPie: React.FC<SourceEchartPieBarProps> = ({ data, tab, total }) => {
  const option = useMemo(() => {
    return {
      grid: {
        top: 0,
        bottom: 0
      },
      tooltip: {
        trigger: 'item',
        position: function (point: any) {
          return [point[0] - 100, point[1]]; // x 固定在 point[0]，y 跟随鼠标移动
        }
      },
      title: {
        text: `${total}\n Total ${tab}`,
        left: 'center',
        top: 'center',
        textStyle: {
          fontSize: 10,
          color: '#3E3E3E',
          lineHeight: 14,
          rich: {
            line1: {
              fontSize: 14,
              fontWeight: 'bold',
              color: '#131313'
            }
          }
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: true
          },
          data:
            data?.map((v) => ({
              value: v.count,
              name: v.sourceName,
              itemStyle: {
                color: v.color
              }
            })) || []
        }
      ]
    };
  }, [data, tab, total]);
  return <ReactEcharts option={option} style={{ height: '100%' }} />;
};

SourceEchartPie.displayName = 'SourceEchartPie';

const SourceEchartBar: React.FC<SourceEchartPieBarProps> = ({ data }) => {
  const option = {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 20
    },
    tooltip: {
      trigger: 'item',
      position: function (point: any) {
        return [point[0] - 100, point[1]]; // x 固定在 point[0]，y 跟随鼠标移动
      }
    },
    xAxis: {
      type: 'category',
      show: false
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        data:
          data?.map((v) => ({
            value: v.count,
            name: v.sourceName,
            itemStyle: {
              color: v.color,
              borderRadius: 4
            }
          })) || [],

        type: 'bar'
      }
    ]
  };
  return <ReactEcharts option={option} style={{ height: '100%' }} />;
};

SourceEchartBar.displayName = 'SourceEchartBar';

export { GrowthEchartline, SourceEchartPie, SourceEchartBar };
