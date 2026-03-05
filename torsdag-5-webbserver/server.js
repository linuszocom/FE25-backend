import http from 'http';



const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = url.pathname;
    const searchParams = url.searchParams;
    

    if (pathname === '/greeting') { 
        const name = searchParams.get('name') || 'guest';
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'})
        res.end(`Hello, ${name}`)

    } else if (pathname === '/' || pathname === '/home') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'})
        res.end(`Welcome!`)
    } else if (pathname === '/hello') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'})
        res.end(`Hi!`)
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8'});
        res.end('Page not found');
    }
});

const PORT = 3001;

server.listen(PORT, () => {
    console.log(`Server lyssnar på http://localhost:${PORT}`);
})