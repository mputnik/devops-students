const server = require('./server.js')('form_data');

// Define port
const PORT = process.env.PORT || 8080;

server.listen(PORT, console.log(`Server starting at port ${PORT}`))