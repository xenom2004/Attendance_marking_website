import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../cssfile/DateSelector.css'

const DateSelector = ({ selectedDate, onDateChange }) => {
    return (
        <div>
            <DatePicker selected={selectedDate} onChange={date => onDateChange(date)} />
        </div>
    );
};

export default DateSelector;
