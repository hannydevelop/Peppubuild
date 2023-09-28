import { Editor } from 'grapesjs';
import en from './locale/en';

export default (editor, opts = {}) => {
  const swv = "sw-visibility";
  const expt = "export-template";
  const ful = "fullscreen";
  const prv = "preview";
  const cmdClear = 'canvas-clear';

  const options = {
    ...{
      i18n: {},
      bgColor: {
        one: '#fff',
        two: '#9ca8bb',
        three: '#1df205',
        four: '#1df205'
      }
      // default options
    }, ...opts
  };

  // Load i18n files
  editor.I18n && editor.I18n.addMessages({
    en,
    ...options.i18n,
  });

  // Load panel reset
  editor.on('load', () =>
    editor.Panels.getPanels().reset([
      {
        id: 'options',
        buttons: [
          {
            active: true,
            id: swv,
            className: 'fa fa-square-o',
            command: 'core:component-outline',
            context: swv,
            attributes: { title: 'View components' },
          },
          {
            id: ful,
            className: 'fa fa-arrows-alt',
            command: ful,
            context: ful,
            attributes: { title: 'Fullscreen' },
          },
          {
            id: 'undo',
            command: 'core:undo',
            label: `<svg viewBox="0 0 24 24">
<path fill="currentColor" d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z" />
</svg>`
          },
          {
            id: 'redo',
            command: 'core:redo',
            label: `<svg viewBox="0 0 24 24">
<path fill="currentColor" d="M10.5 18H18V20H10.5C6.91 20 4 17.09 4 13.5S6.91 7 10.5 7H16.17L13.08 3.91L14.5 2.5L20 8L14.5 13.5L13.09 12.09L16.17 9H10.5C8 9 6 11 6 13.5S8 18 10.5 18Z" />
</svg>`,
          },
          {
            id: expt,
            command: expt,
            label: `<svg viewBox="0 0 24 24">
<path fill="currentColor" d="M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z" />
</svg>`
          },
          {
            id: cmdClear,
            command: 'core:canvas-clear',
            label: `<svg viewBox="0 0 24 24">
<path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
</svg>`,
          },
        ],
      },
      {
        id: 'panel-devices',
        buttons: [
          {
            id: 'device-desktop',
            label: '<i class="fa fa-laptop"></i>',
            command: 'set-device-desktop',
            active: true,
            togglable: false,
          },
          {
            id: 'device-mobile',
            label: '<i class="fa fa-tablet fa-rotate-270"></i>',
            command: 'set-device-tablet',
            togglable: false,
          },
          {
            id: 'device-tablet',
            label: '<i class="fa fa-tablet"></i>',
            command: 'set-device-mobile',
            togglable: false,
          }
        ]
      }
    ])
  )

  
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


  const style = document.createElement('style');
  style.innerText = cssString;
  document.head.appendChild(style);
};