import { useState } from 'react';
import { NumericFormat } from 'react-number-format';

const NumberInput = (props) => {
  const [state, setState] = useState();
  return (
    <NumericFormat thousandSeparator value={state} onValueChange={(values) => setState(values.value)} {...props} />
  );
};

export default NumberInput;
