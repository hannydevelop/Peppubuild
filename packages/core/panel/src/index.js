import en from './locale/en';

export default (editor, opts = {}) => {
  const commands = editor.Commands;
  // create plugin options default
  const options = {
    ...{
      i18n: {},
      bgColor: {
        one: '#fff',
        two: '#9ca8bb',
        three: '#1df205',
        four: '#1df205'
      },
      url: 'https://www.peppubuild.com',
      // default options
    }, ...opts
  };

  // Load i18n files
  editor.I18n && editor.I18n.addMessages({
    en,
    ...options.i18n,
  });

  // add editor panels
  editor.Panels.addButton('options',
    {
      id: 'save',
      className: 'fa fa-save',
      active: false,
      command: 'peppu:save'
    }
  )

  editor.Panels.addButton('options', [
    {
      id: 'bcode',
      className: 'fa fa-terminal',
      active: false,
      command: 'peppu:code'
    }
  ])

  editor.Panels.addButton('views',
    {
      id: 'publish',
      className: 'fa fa-upload',
      active: false,
      command: 'peppu:publish'
    }
  )

  editor.Panels.addButton('views', [
    {
      id: 'create',
      className: 'fa fa-folder-open',
      active: false,
      command: 'peppu:create'
    }
  ])

  // Add logo to panel
  editor.Panels.addButton('options',
    {
      id: 'logo',
      label: `<img src='https://www.linkpicture.com/q/IMG_2437-1.png' style="width:60%;height:50%;"/>`,
      active: false,
      command: 'peppu:logo'
    }
  )


  // option value for CSS values
  let cssString = `
    .gjs-one-bg {
      background-color: ${options.bgColor.one};
      ;
    }
    
    .gjs-two-color {
      color: ${options.bgColor.two};
    }
    
    .gjs-three-bg {
      background-color: ${options.bgColor.three};
      color: white;
    }
    
    .gjs-four-color,
    .gjs-four-color-h:hover {
      color: ${options.bgColor.four};
    }
    `;

  // Append css styles to html
  const style = document.createElement('style');
  style.innerText = cssString;
  document.head.appendChild(style);

  // create commands for save, publish and create project.
  commands.add('peppu:save', editor => { console.log('saved') });
  commands.add('peppu:create', editor => { console.log('created') });
  // add option for front, back or fullstack
  commands.add('peppu:publish', editor => { console.log('published') });
  // peppu logo
  editor.Commands.add('peppu:logo', editor => { window.open(options.url) });
};