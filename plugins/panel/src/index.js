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
      active: false,
      command: 'peppu:open'
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