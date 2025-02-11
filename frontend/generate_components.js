import fs from 'fs'

const component_name = process.argv.slice(2)[0];

const appendLine = `export { default as ${component_name}} from "./${component_name}/${component_name}.jsx"; \n`;

const template = [
  'import { useEffect, useState, useRef, useMemo } from "react"; \n',
  'import { useLocation, useNavigate } from "react-router-dom"; \n',
  'import { useDispatch, useSelector } from "react-redux"; \n\n',
  `import "./${component_name}.css" \n\n`,
  `export default function ${component_name}() {\n`,
  '  const location = useLocation(); \n',
  '  const navigate = useNavigate(); \n',
  '  const [width, setWidth] = useState(window.innerWidth); \n',
  '  const [height, setHeight] = useState(window.innerHeight); \n\n',
  '  return ( \n',
  '    <div>\n',
  `      <h1>${component_name}</h1> \n`,
  '    </div> \n',
  '  ) \n',
  '}'
]

await fs.mkdir(`src/Components/${component_name}`, { recursive: true }, (err) => {
  if (err) {
    console.log('Error creating folder:', err);
  } else {
    console.log(`Folder "${component_name}" created successfully!`);
  }
});

setTimeout(() => {
  fs.writeFile(`./src/Components/${component_name}/${component_name}.css`, '', (err) => {
    if (err) {
      console.log('Error writing file:', err);
    } else {
      console.log('File created successfully!');
    }
  })
}, 200)

setTimeout(() => {
  fs.writeFile(`./src/Components/${component_name}/${component_name}.jsx`, template.join(''), (err) => {
    if (err) {
      console.log('Error writing file:', err);
    } else {
      console.log('File created successfully!');
    }
  });
}, 200)
