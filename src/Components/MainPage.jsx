import React, { useState } from 'react';

import './MainPage.css';

const evaluateExpression = (expression) => {
  const operators = ['+', '-', '*', '/', '%'];
  const stack = [];
  let currentNumber = '';

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (!isNaN(char) || char === '.') {
      currentNumber += char;
    } else if (operators.includes(char)) {
      stack.push(parseFloat(currentNumber));
      stack.push(char);
      currentNumber = '';
    }
  }

  if (currentNumber) {
    stack.push(parseFloat(currentNumber));
  }

  // Handle multiplication, percentile and division first
  const intermediateStack = [];
  while (stack.length > 0) {
    const element = stack.shift();

    if (element === '*') {
      const prevNumber = intermediateStack.pop();
      const nextNumber = stack.shift();
      intermediateStack.push(prevNumber * nextNumber);
    } else if (element === '/') {
      const prevNumber = intermediateStack.pop();
      const nextNumber = stack.shift();
      intermediateStack.push(prevNumber / nextNumber);
    } else if (element === '%') {
      const prevNumber = intermediateStack.pop();
      const nextNumber = stack.shift();
      intermediateStack.push((prevNumber * nextNumber) / 100);
    } else {
      intermediateStack.push(element);
    }
  }

  // Handle addition and subtraction
  let result = intermediateStack.shift();
  while (intermediateStack.length > 0) {
    const operator = intermediateStack.shift();
    const nextNumber = intermediateStack.shift();

    if (operator === '+') {
      result += nextNumber;
    } else if (operator === '-') {
      result -= nextNumber;
    }
  }

  return result;
};

export const MainPage = () => {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleEqual = () => {
    try {
      const result = evaluateExpression(input);
      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">{input}</div>
        <div className="buttons">
          <button onClick={handleClear} className="clear">
            C
          </button>
          <button onClick={() => handleClick('7')} className="seven">
            7
          </button>
          <button onClick={() => handleClick('/')} className="divide">
            /
          </button>

          <button onClick={() => handleClick('*')} className="multiply">
            *
          </button>

          <button onClick={() => handleClick('8')} className="eight">
            8
          </button>
          <button onClick={() => handleClick('9')} className="nine">
            9
          </button>
          <button onClick={() => handleClick('4')} className="four">
            4
          </button>
          <button onClick={() => handleClick('-')} className="subtract">
            -
          </button>

          <button onClick={() => handleClick('5')} className="five">
            5
          </button>
          <button onClick={() => handleClick('6')} className="six">
            6
          </button>
          <button onClick={() => handleClick('1')} className="one">
            1
          </button>
          <button onClick={() => handleClick('+')} className="add">
            +
          </button>

          <button onClick={() => handleClick('2')} className="two">
            2
          </button>
          <button onClick={() => handleClick('3')} className="three">
            3
          </button>
          <button onClick={() => handleClick('0')} className="zero">
            0
          </button>
          <button onClick={() => handleClick('%')} className="percent">
            %
          </button>
          <button onClick={handleEqual} className="equal">
            =
          </button>

          <button onClick={() => handleClick('.')} className="dot">
            .
          </button>
        </div>
      </div>
    </div>
  );
};
