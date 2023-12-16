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

  editor.Panels.addButton('views',
    {
      id: 'publish',
      className: 'fa fa-upload',
      active: false,
      command: 'peppu:publish'
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

  var s = document.createElement('script');
  s.innerText = function commandMod() {
    editor.Modal.setTitle('About Peppubuild');
    editor.Modal.setContent(
      `<div>
    <br/>
    <div style="text-align: center">
    <img src='https://www.linkpicture.com/q/IMG_2437-1.png' style="width:10%;height:5%;"/>
    </div>
    <br/>
    <br/><br/>
    <div>
      <a class="gjs-four-color" target="_blank" href="peppubuild.com"><b>Peppubuild</b><a> is an attempt to build the ultimate
      <a class="info-panel-link gjs-four-color" target="_blank" href="https://github.com/Peppu-Group/peppubuild">opensource fullstack nocode/lowcode tool</a>
      for web applications.
      <br/><br/>
      For any hint about this project, check the
      <ul>
      <li>
      <a class="info-panel-link gjs-four-color" target="_blank" href="https://docs.peppubuild.com">Peppubuild documentation</a>
      </li>
      <li>
      <a class="info-panel-link gjs-four-color" target="_blank" href="https://github.com/artf/grapesjs-preset-webpage">
      Read the contribution guideline</a>
      and open an issue or start a discussion to contribute.
      </li>
      <li>
      Checkout our <a class="info-panel-link gjs-four-color" target="_blank" href="https://github.com/artf/grapesjs-preset-webpage">milestone board</a> to see what we're up to.
      </li>
      </ul>
      Being a free and open source project contributors and supporters are extremely welcome.
    </div>
  </div>`
    );
    editor.Modal.open();
  }
  document.body.appendChild(s)

  editor.on('load', function () {
    var logoCont = document.createElement('div');
    logoCont.innerHTML = `
    <div class="gjs-logo-cont">
      <button onclick="commandMod()"><img class="gjs-logo" src="https://www.linkpicture.com/q/IMG_2437-1.png"></button>
    </div>
    `
    var logoPanel = document.querySelector('.gjs-pn-commands');
    logoPanel.appendChild(logoCont);
  })
};