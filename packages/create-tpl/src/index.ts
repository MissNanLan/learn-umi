import { chalk, clackPrompts } from '@umijs/utils';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { renderTep } from './template';

const { select, text, isCancel, outro } = clackPrompts;
enum ETemplate {
  compoent = 'component',
  page = 'page',
}

const DEFAULT_DATA = {
  appTemplate: ETemplate.page,
};

interface IGeneratorOpts {
  cwd: string;
  args: any;
  defaultData?: {
    appTemplate?: ETemplate;
  };
}

export default async ({
  cwd,
  args,
  defaultData = DEFAULT_DATA,
}: IGeneratorOpts) => {
  let appTemplate = defaultData?.appTemplate || ETemplate.page;
  let fileName = '';
  let [name] = args._;
  let basePath = name ? join(cwd, name) : join(cwd, 'src');

  const exitPrompt = () => {
    outro(chalk.red('Exit!'));
    process.exit(1);
  };

  const selectAppTemplate = async () => {
    appTemplate = (await select({
      message: 'Pick Template Name',
      options: [
        { label: 'Component', value: ETemplate.compoent },
        {
          label: 'Page',
          value: ETemplate.page,
        },
      ],
      initialValue: ETemplate.page,
    })) as ETemplate;
  };

  const inputFileName = async () => {
    fileName = (await text({
      message: 'Input File Name',
      validate: (value) => {
        if (!value.match(/[a-z]+[A-Z]{1}[a-z]+/g)) {
          return 'Please Input Camel Case Name!';
        }
      },
    })) as ETemplate;
  };

  const internalTemplatePrompts = async () => {
    await selectAppTemplate();

    if (isCancel(appTemplate)) {
      exitPrompt();
    }

    await inputFileName();
    if (isCancel(appTemplate)) {
      exitPrompt();
    }

    const isPage = appTemplate === ETemplate.page;
    const { LessTep, TsxTep, TsTep } = renderTep(fileName, isPage);
    const styleFileName = isPage ? 'style.module.less' : 'style.less';
    const path = isPage ? join(basePath, 'pages') : join(basePath, 'componets');

    mkdirSync(`${path}/${fileName}`); // 新建文件夹
    process.chdir(`${path}/${fileName}`); // 更改目录

    writeFileSync(styleFileName, LessTep);
    writeFileSync(`${fileName}.tsx`, TsxTep);
    writeFileSync(`index.ts`, TsTep);
  };

  await internalTemplatePrompts();
};
