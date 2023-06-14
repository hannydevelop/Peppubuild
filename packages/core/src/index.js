#!/usr/bin/env node

import * as fs from 'fs'
import { Editor } from 'grapesjs'
export default (editor, opts = { path }) => {
  const options = {
    ...{

      // default options
    }, ...opts
  };


  function expt() {
    let html = editor.getHtml();
    let css = editor.getCss();

    // create vuejs file.
    let fileContent = `<template>${html}</template> <style>${css}</style>`

    // write that content into the grapesjs.
    // to do this, you need to call path in expt, i.e expt(path).
    fs.appendFile(`${path}`, `${fileContent}`, (err) => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });

    return true;
    // to do this, we'll add path as a plugin option.
  }


  // TODO Remove
  editor.on('load', () =>
    editor.Panels.addPanel({
      id: 'myNewPanel',
      visible: true,
      buttons: [
        {
          id: expt,
          command: expt,
          label: `<svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z" />
      </svg>`
        }
      ],
    }))
};