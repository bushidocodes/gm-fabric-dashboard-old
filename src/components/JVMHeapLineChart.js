import React, { PropTypes } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

JVMHeapLineChart.propTypes = {
  maxHeap: PropTypes.number.isRequired,
  usedAndCommittedHeapArr: PropTypes.array.isRequired
};

export default function JVMHeapLineChart({ maxHeap, usedAndCommittedHeapArr }) {
  const BYTES_TO_MB = 1048576;
  // Map the metrics array and generate array of objects with an array of objects
  // with time stamps and the # of HTTP connections
  const maxHeapInMegabytes = maxHeap / BYTES_TO_MB;
  const httpConnections = usedAndCommittedHeapArr.map(obj => ({
    time: obj.time,
    prettyTime: obj.prettyTime,
    committedHeap: Math.round(obj.committed / BYTES_TO_MB),
    usedHeap: Math.round(obj.used / BYTES_TO_MB)
  }));

  return (
    <div className="uk-card uk-card-default uk-card-body">
      <h3 className="uk-card-title">Heap</h3>
      <ResponsiveContainer
        height="80%"
        width="90%"
      >
        <LineChart data={httpConnections}>
          <Line
            dataKey="committedHeap"
            isAnimationActive={false}
            name="Committed Heap Size"
            stroke="#ffc700"
            type="monotone"
          />
          <Line
            dataKey="usedHeap"
            isAnimationActive={false}
            name="Used Heap Size"
            stroke="#00a1ff"
            type="monotone"
          />
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey="prettyTime"
            interval="preserveStartEnd"
            padding={{ left: 25 }}
          />
          <YAxis allowDecimals={false} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
      <div>Max Heap Size: {maxHeapInMegabytes} MB</div>
    </div>
  );
}
