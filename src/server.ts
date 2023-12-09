import config from './config';

import { createApp } from './app';

const app = createApp();

app.listen(config.port, () => {
    console.log(`\n Running into: PORT: ${config.port} | ENV: ${config.environment}`);
});
