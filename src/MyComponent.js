import React, { useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://api.example.com/calculate', {
        number: parseInt(number),
      });
      setResult(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a number:
          <input type="text" value={number} onChange={handleNumberChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {result && <p>The result is: {result}</p>}
    </div>
  );
};

export default MyComponent;