const server = require('./server.js')('form_data', 'database');

// Define port
const PORT = process.env.PORT || 8080;

server.initAdmin();
server.app.listen(PORT, console.log(`Server starting at port ${PORT}`));