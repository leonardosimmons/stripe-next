
import React from 'react';


function useLogger(type: "console" | "local", log: any, dep?: Array<any>): void {
  switch(type) {
    case "console":
      dep
      ? React.useEffect(() => {console.log(log);}, dep)
      : console.log(log);
      break;
    default:
      console.log('logging error');
      break;
  };
};

export { useLogger };
