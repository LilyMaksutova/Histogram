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
  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(d3.extent(data.map(([_key,value]) => value)), [height - marginBottom, marginTop]);
  console.log('y(0) =', y(0))
  console.log('y(0)-y(d[1]', y(0)-y(data[0][1]))
  return (
    <svg width={width} height={height}>
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<rect key={i} x={x(i)} y={y(d[1])} height={y(0)-y(d[1])} width={20}/>))}
      </g>
    </svg>
  );
}