import React from 'react';
import {TailSpin} from 'react-loader-spinner';

function Loader({color = 'gray', ...props}) {
  return (
    <TailSpin
      height="80"
      width="80"
      color={color}
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{ ...props }}
      wrapperClass=""
      visible={true}
    />
  )
}

export default Loader