export const renderTep = (fileName: string, isPage: boolean) => {
  const TsxPageTep = `
import React, { VFC } from 'react';
import styles from './style.module.less'

export const ${fileName}: VFC = () => <div> ${fileName} </div>
`;

  const TsxComTep = `
import React, { VFC } from 'react';
import styles from './style.less'

export const ${fileName}: VFC = () => <div> ${fileName} </div>
`;

  // ts Tep
  const TsTep = `export * from './${fileName}.tsx';`;

  // less Tep
  const LessTep = `
   @import '~@/less/index.less'
`;

  return {
    TsxTep: isPage ? TsxPageTep : TsxComTep,
    TsTep,
    LessTep,
  };
};
