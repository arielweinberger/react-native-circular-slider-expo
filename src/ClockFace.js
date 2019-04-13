import React, { PureComponent } from 'react';
import { Svg } from 'expo';
const { G, Circle, Text, Line } = Svg;
import range from 'lodash.range';
import PropTypes from 'prop-types';


export default class ClockFace extends PureComponent {

  static propTypes = {
    r: PropTypes.number,
    stroke: PropTypes.string,
  }

  render() {
    const { r, stroke } = this.props;
    const faceRadius = r - 5;
    const textRadius = r - 26;

    return (
      <G>
        {
          range(96).map(i => {
            const cos = Math.cos(2 * Math.PI / 96 * i);
            const sin = Math.sin(2 * Math.PI / 96 * i);

            return (
              <Line
                key={i}
                stroke={stroke}
                strokeWidth={i % 4 === 0 ? 3 : 1}
                x1={cos * faceRadius}
                y1={sin * faceRadius}
                x2={cos * (faceRadius - 7)}
                y2={sin * (faceRadius - 7)}
              />
            );
          })
        }
      <G transform={{translate: "0, -9"}}>
          {
            range(24).map((h, i) => {
              if (h >= 12) {
                h = h - 12;
              }

              return (
                <Text
                  key={i}
                  fill={stroke}
                  fontSize="12"
                  textAnchor="middle"
                  x={textRadius * Math.cos(2 * Math.PI / 24 * i - Math.PI / 2 + Math.PI / 12)}
                  y={textRadius * Math.sin(2 * Math.PI / 24 * i - Math.PI / 2 + Math.PI / 12)}
                >
                  {h + 1}
                </Text>
              )
            })
          }
        </G>
      </G>
    );
  }
}
