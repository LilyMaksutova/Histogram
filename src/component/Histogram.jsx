import { useRef, useEffect } from 'react';
import * as d3 from "d3";

export default function Histogram({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20
}) {
  const gx = useRef(); // gx = { current: ссылка на что-то}
  const gy= useRef(); //
  const x = d3.scaleLinear([0, data.length], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(d3.extent(data.map(([_key,value]) => value)), [height - marginBottom, marginTop]);
  useEffect(() => { d3.select(gx.current).call(d3.axisBottom(x)) }, [gx, x]);
  useEffect(() => { d3.select(gy.current).call(d3.axisLeft(y)) }, [gy, y]);
  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => {
          return (<g>
            <circle key={i} cx={x(i)} cy={y(d[1])} r={5} />
            <text x={x(i)} y={y(d[1])} transform={`translate(0, -20) rotate(-20, ${x(i)}, ${y(d[1])})`}>{d[0]}</text>
          </g>)
        })}
      </g>
    </svg>
  );
}
