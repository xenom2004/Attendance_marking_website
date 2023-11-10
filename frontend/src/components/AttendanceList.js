import React from 'react';
import '../cssfile/AttendanceList.css';

const AttendanceList = ({ presentStudents, absentStudents }) => {
    return (
        <div>
            <h2>Present Students:</h2>
            <ul>
                {presentStudents.map(student => (
                    <li key={student.id}>{student.name}</li>
                ))}
            </ul>
            <h2>Absent Students:</h2>
            <ul>
                {absentStudents.map(student => (
                    <li key={student.id}>{student.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default AttendanceList;
