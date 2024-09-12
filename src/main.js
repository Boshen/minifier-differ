import './style.css';

import initWasm, { Oxc } from '@oxc/oxc_wasm';
import * as terser from 'terser';
import { codeToHtml } from 'shiki'

import * as prettier from 'prettier/standalone';
import * as estree from 'prettier/plugins/estree';
import * as babel from 'prettier/plugins/babel';

let editor = document.getElementById("editor");
let middle = document.getElementById("middle");
let right = document.getElementById("right");

await initWasm();

let oxc = new Oxc();

async function format(code) {
  const formatted =  await prettier.format(code, {
    parser: 'babel',
    plugins: [estree, babel],
  });
  const html = await codeToHtml(formatted, {
    lang: 'javascript',
    theme: 'vitesse-dark'
  })
  return html
}

async function runOxc(code) {
  oxc.run(code, {
    run: {},
    minifier: {
      whitespace: true,
      mangle: true,
      compress: true,
    }
  });
  middle.innerHTML = await format(oxc.codegenText);
}

async function runTerser(code) {
  try {
    const result = await terser.minify(code);
    right.innerHTML = await format(result.code);
  } catch(e) {
    console.log(e)
  }
}

editor.addEventListener('input', async (e) => {
  await runOxc(e.target.value);
  await runTerser(e.target.value);
})
