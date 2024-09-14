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
      id: 'peppu:open',
      className: 'fa fa-terminal',
      active: true,
      command: 'peppu:open'
    }
  ])

  editor.Panels.addButton('options', [
    {
      id: 'redo',
      label: `<svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M10.5 18H18V20H10.5C6.91 20 4 17.09 4 13.5S6.91 7 10.5 7H16.17L13.08 3.91L14.5 2.5L20 8L14.5 13.5L13.09 12.09L16.17 9H10.5C8 9 6 11 6 13.5S8 18 10.5 18Z" />
        </svg>`,
      active: false,
      command: () => editor.runCommand('core:redo'),
    }
  ])

  editor.Panels.addButton('options', [
    {
      id: 'undo',
      label: `<svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z" />
      </svg>`,
      active: false,
      command: () => editor.runCommand('core:undo'),
    }
  ])

  editor.Panels.addButton('options', [
    {
      id: 'core:canvas-clear',
      active: false,
        command: () => editor.runCommand('core:canvas-clear'),
        label: `<svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
        </svg>`,
    }
  ])

  /*
  editor.Panels.addButton('views',
    {
      id: 'publish',
      className: 'fa fa-upload',
      active: false,
      command: 'peppu:publish'
    }
  )
  */

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

    /* LOGO VERSION */

    .gjs-pn-commands .gjs-pn-buttons,
    #gjs-pn-commands .gjs-pn-buttons {
      display: none;
    }

    .gjs-logo {
      height: 25px;
    }

    .gjs-logo-cont {
      position: relative;
      display: inline-block;
      top: 3px;
    }

    a:link {
      text-decoration: none;
    }

    a:visited {
      text-decoration: none;
    }

    a:hover {
      text-decoration: none;
    }

    a:active {
      text-decoration: none;
    }
    `;

  // Append css styles to html
  const style = document.createElement('style');
  style.innerText = cssString;
  document.head.appendChild(style);
};