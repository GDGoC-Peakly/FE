import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { colors } from '../../../styles/colors'; // 경로 확인 필요

const { width } = Dimensions.get('window');
const chartSize = Math.min(width - 40, 292);

export default function InteractiveDonutChart() {
  const [selectedSegment, setSelectedSegment] = useState(null);

  // 1. 데이터에 텍스트 정보(label, subLabel) 추가
  const segments = [
    {
      id: 1,
      label: '밤-새벽',
      subLabel: '22 - 07 시',
      fillPath:
        'M145.599 0.5C225.734 0.500072 290.697 65.4629 290.697 145.599C290.697 146.635 290.684 147.668 290.662 148.699H262.656C262.683 147.669 262.697 146.635 262.697 145.599C262.697 80.9269 210.27 28.5001 145.599 28.5C124.66 28.5 105.006 33.9965 87.998 43.624L73.9961 19.3711C95.1231 7.36101 119.559 0.500024 145.599 0.5Z',
      strokePath1:
        'M145.599 0.5C225.734 0.500072 290.697 65.4629 290.697 145.599C290.697 146.635 290.684 147.668 290.662 148.699',
      strokePath2: 'M73.9961 19.3711C95.1231 7.36101 119.559 0.500024 145.599 0.5',
      strokePath3:
        'M262.656 148.699H262.656C262.683 147.669 262.697 146.635 262.697 145.599C262.697 80.9269 210.27 28.5001 145.599 28.5C124.66 28.5 105.006 33.9965 87.998 43.624',
      strokePath4: 'M87.998 43.624L73.9961 19.3711',
    },
    {
      id: 2,
      label: '오전',
      subLabel: '07 - 12 시',
      fillPath:
        'M290.694 146.042C290.535 199.196 261.796 245.622 219.036 270.765L205.213 246.406C239.507 226.082 262.536 188.759 262.694 146.042H290.694Z',
      strokePath1: 'M290.694 146.042C290.535 199.196 261.796 245.622 219.036 270.765',
      strokePath2: 'M262.694 146.042H290.694',
      strokePath3: 'M205.213 246.406C239.507 226.082 262.536 188.759 262.694 146.042',
      strokePath4: 'M219.036 270.765L205.213 246.406',
    },
    {
      id: 3,
      label: '오후',
      subLabel: '12 - 18 시',
      fillPath:
        'M219.175 270.684C198.196 283.05 173.835 290.289 147.812 290.679V262.674C168.754 262.285 188.351 256.402 205.222 246.401L219.175 270.684Z',
      strokePath1: 'M219.175 270.684C198.196 283.05 173.835 290.289 147.812 290.679',
      strokePath2: 'M205.222 246.401L219.175 270.684',
      strokePath3: 'M147.812 262.674C168.754 262.285 188.351 256.402 205.222 246.401',
      strokePath4: 'M147.812 290.679V262.674',
    },
    {
      id: 4,
      label: '저녁',
      subLabel: '18 - 22시',
      fillPath:
        'M32.9561 177.704C46.9133 226.767 92.0599 262.697 145.599 262.697C146.339 262.697 147.077 262.687 147.813 262.674V290.679C147.077 290.69 146.338 290.697 145.599 290.697C79.1023 290.697 23.0555 245.966 5.90234 184.952L32.9561 177.704Z',
      strokePath1:
        'M147.813 290.679C147.077 290.69 146.338 290.697 145.599 290.697C79.1023 290.697 23.0555 245.966 5.90234 184.952',
      strokePath2: 'M147.813 262.674V290.679',
      strokePath3:
        'M32.9561 177.704C46.9133 226.767 92.0599 262.697 145.599 262.697C146.339 262.697 147.077 262.687 147.813 262.674',
      strokePath4: 'M5.90234 184.952L32.9561 177.704',
    },
    {
      id: 5,
      label: '밤',
      subLabel: '22 - 02시',
      fillPath:
        'M88.8076 43.1699C52.8397 63.1548 28.5001 101.534 28.5 145.599C28.5 156.731 30.0541 167.5 32.9561 177.702L5.90137 184.952C2.38303 172.437 0.500012 159.238 0.5 145.599C0.50005 91.106 30.5394 43.63 74.9619 18.8252L88.8076 43.1699Z',
      strokePath1:
        'M5.90137 184.952C2.38303 172.437 0.500012 159.238 0.5 145.599C0.50005 91.106 30.5394 43.63 74.9619 18.8252',
      strokePath2: 'M32.9561 177.702L5.90137 184.952',
      strokePath3:
        'M88.8076 43.1699C52.8397 63.1548 28.5001 101.534 28.5 145.599C28.5 156.731 30.0541 167.5 32.9561 177.702',
      strokePath4: 'M74.9619 18.8252L88.8076 43.1699',
    },
  ];

  const handleSegmentPress = (id) => {
    // 이미 선택된 걸 누르면 선택 해제(null), 아니면 해당 id 선택
    setSelectedSegment(selectedSegment === id ? null : id);
  };

  // 2. 현재 선택된 세그먼트의 데이터 찾기
  const currentSegment = segments.find((s) => s.id === selectedSegment);

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Svg width={chartSize} height={chartSize} viewBox="0 0 292 292">
          <G>
            {/* 세그먼트 Fill */}
            {segments.map((segment) => (
              <Path
                key={`fill-${segment.id}`}
                d={segment.fillPath}
                fill={selectedSegment === segment.id ? colors.primary[500] : colors.primary[50]}
                onPress={() => handleSegmentPress(segment.id)}
              />
            ))}

            {/* 세그먼트 Stroke */}
            {segments.map((segment) => (
              <G key={`stroke-${segment.id}`}>
                {/* 기존 Stroke 코드 유지 */}
                <Path
                  d={segment.strokePath1}
                  fill="none"
                  stroke={colors.primary[500]}
                  strokeWidth="1"
                  pointerEvents="none"
                />
                <Path
                  d={segment.strokePath2}
                  fill="none"
                  stroke={colors.primary[500]}
                  strokeWidth="1"
                  pointerEvents="none"
                />
                <Path
                  d={segment.strokePath3}
                  fill="none"
                  stroke={colors.primary[500]}
                  strokeWidth="1"
                  pointerEvents="none"
                />
                <Path
                  d={segment.strokePath4}
                  fill="none"
                  stroke={colors.primary[500]}
                  strokeWidth="1"
                  pointerEvents="none"
                />
              </G>
            ))}
          </G>
        </Svg>

        {/* 3. 텍스트 표시 영역 */}
        <View style={styles.textOverlay} pointerEvents="none">
          {/* 선택된 세그먼트가 있으면 해당 라벨을, 없으면 '전체' 표시 */}
          <Text style={styles.title}>{currentSegment ? currentSegment.label : '전체'}</Text>

          {/* 선택된 세그먼트가 있으면 해당 시간을, 없으면 '하루 일과' 표시 */}
          <Text style={[styles.title, styles.subTitle]}>
            {currentSegment ? `(${currentSegment.subLabel})` : '하루 일과'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  chartContainer: {
    position: 'relative',
    width: chartSize,
    height: chartSize,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    // 폰트가 없다면 fontWeight: 'bold'로 대체 가능
    fontFamily: 'Pretendard-Bold',
    color: '#000',
  },
  subTitle: {
    fontSize: 16,
    color: colors.primary[500], // colors 객체 확인 필요
    marginTop: 4,
  },
});
