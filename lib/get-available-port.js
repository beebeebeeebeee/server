import http from "http";

export async function getAvailablePort(port = 36000, maxPort = 36010) {
    if (port > maxPort) {
        throw new Error(`No available port found ${port} - ${maxPort}`);
    }

    return new Promise((resolve, reject) => {
        const server = http.createServer();
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                if (port < maxPort) {
                    resolve(getAvailablePort(port + 1, maxPort));
                } else {
                    reject(new Error(`No available port found ${port} - ${maxPort}`));
                }
            } else {
                reject(err);
            }
        });
        server.listen(port, () => {
            server.close(() => resolve(port));
        });
    });
}
