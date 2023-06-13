#!/usr/bin/env node

// import GrapesJs and override panel to add download button to default panel.
// this button will do all the modifications we need in grapesjs.
// instead of installing grapesjs in the frontend we will install peppu-core

import grapesjs from 'grapesjs'

const Peppu = grapesjs.editors.forEach(editor => editor.Panels.addPanel({
    id: 'myNewPanel',
    visible: true,
    buttons: [
        {
            id: 'expt',
            className: 'fa fa-code',
            command: expt,
        },
    ],
}));

export default Peppu

