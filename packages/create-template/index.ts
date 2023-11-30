import {
    intro,
    outro,
    confirm,
    select,
    spinner,
    isCancel,
    cancel,
    text,
} from '@clack/prompts';
  


interface IGeneratorOpts {
    cwd: string;
   
}


enum ETemplate {
    compoent = 'component',
    page='page'
}
  

const DEFAULT_DATA = {
    appTemplate: ETemplate.page,
} ;
  
  
export default async ({

    defaultData = DEFAULT_DATA,
    
}) => { 

    let appTemplate = defaultData?.appTemplate || ETemplate.page;

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
}