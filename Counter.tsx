import React, { useState, useRef } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Count: {count}</p>
      <input ref={inputRef} placeholder="Type something" />
    </div>
  );
}

export default Counter;

