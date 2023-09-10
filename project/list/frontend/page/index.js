import {createRoot} from 'react-dom/client';

import Container from './container';

const root = createRoot(document.getElementById('render-app'));

root.render(<Container/>);