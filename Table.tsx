import React, { useState } from "react";
import "./App.css";

const RomanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

const TableRow = ({
  id,
  activity,
  points,
  maxPoints,
  updateColumnTotal,
  onCertificateUpload,
  onApprove,
  onDisapprove,
}) => {
  const [inputValues, setInputValues] = useState(Array(8).fill(0));
  const [total, setTotal] = useState(0);

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = parseFloat(value) || 0;
    setInputValues(newInputValues);
    const newTotal = newInputValues.reduce((acc, val) => acc + val, 0);
    setTotal(newTotal);
    updateColumnTotal(index, newTotal);
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{activity}</td>
      <td>{points}</td>
      <td>{maxPoints}</td>
      {inputValues.map((value, index) => (
        <td key={index}>
          <input
            type="text"
            placeholder="Enter Points"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </td>
      ))}
      <td align="center">
        {" "}
        {/* Added align="center" */}
        <input type="file" onChange={(e) => onCertificateUpload(id, e)} />
      </td>
      <td>
        <button onClick={() => onApprove(id)}>Approve</button>
        <button onClick={() => onDisapprove(id)}>Disapprove</button>
      </td>
      <td>{total}</td>
    </tr>
  );
};

const Table = () => {
  const [columnTotals, setColumnTotals] = useState(Array(8).fill(0));

  const updateColumnTotal = (columnIndex, newTotal) => {
    const newColumnTotals = [...columnTotals];
    newColumnTotals[columnIndex] = newTotal;
    setColumnTotals(newColumnTotals);
  };

  const handleCertificateUpload = (rowId, event) => {
    const file = event.target.files[0];
    // Handle the file upload for the specific row.
    // You can implement the upload logic here.
    console.log(`Uploading certificate for row ${rowId}:`, file);
  };

  const handleApprove = (rowId) => {
    // Handle approval logic for the specific row.
    console.log(`Approving row ${rowId}`);
  };

  const handleDisapprove = (rowId) => {
    // Handle disapproval logic for the specific row.
    console.log(`Disapproving row ${rowId}`);
  };

  const tableRowsData = [
    {
      id: 1,
      activity: "MOOCs (SWAYAM/ NPTEL/ COURSERA/or equivalent)",
      points: 20,
      maxPoints: 40,
    },
    {
      id: 2,
      activity:
        "Tech Fest/ R&D Day/ Freshers Workshop/ Conference/ hackathons etc.",
      points: 5,
      maxPoints: 10,
    },
    {
      id: 3,
      activity: "Participation in Relief camps",
      points: 20,
      maxPoints: 40,
    },
    {
      id: 4,
      activity: "Blood donation /NSS or NCC participation",
      points: 10,
      maxPoints: 20,
    },
    {
      id: 5,
      activity: "Self-Entrepreneurship Program",
      points: 20,
      maxPoints: 20,
    },
    {
      id: 6,
      activity: "Cultural Programme (Dance, Drama, Elocution, Music etc.)",
      points: 5,
      maxPoints: 10,
    },
    {
      id: 7,
      activity: "Participation in the Sports/Games at different levels",
      points: 5,
      maxPoints: 50,
    },
    {
      id: 8,
      activity: "Class Representative",
      points: 5,
      maxPoints: 10,
    },
  ];
  // Add more rows as needed...

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>S:No</th>
            <th>Activity</th>
            <th>Points</th>
            <th>Max points</th>
            <th colSpan={8}>Points earned</th>
            <th>Upload Certificate</th>
            <th>Mentor Approval</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            {RomanNumerals.map((numeral, index) => (
              <th key={index}>{numeral}</th>
            ))}
            <th></th>
            <th></th>
            <th></th>
          </tr>
          {tableRowsData.map((rowData) => (
            <TableRow
              key={rowData.id}
              updateColumnTotal={updateColumnTotal}
              onCertificateUpload={handleCertificateUpload}
              onApprove={handleApprove}
              onDisapprove={handleDisapprove}
              {...rowData}
            />
          ))}
        </tbody>
      </table>
      <div className="columnTotals">
        <strong>Column Totals:</strong>
        {columnTotals.reduce((sum, total) => sum + total, 0)}
      </div>
    </div>
  );
};

export default Table;
