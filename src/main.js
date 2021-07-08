const { parse_parameters } = require("./parameter");
const { gne_svg } = require("./gen");

async function main() {
    addEventListener("fetch", (event) => {
        let handler = handle_request(event);
        event.respondWith(handler);
    });
}

async function handle_request(event) {
    console.time("Handle Request");
    const request = event.request;
    const url = new URL(request.url);

    // Block Unacceptable Methods
    if (request.method !== "GET") return new Response("Allowed Method: GET");

    // Favicon
    if (url.pathname.includes("favicon.ico")) return new Response("No Favicon");

    const parameters = await parse_parameters(new URLSearchParams(url));

    const svg = await gne_svg(parameters);

    console.timeEnd("Handle Request");
    return new Response(svg, {
        headers: {
            "Content-Type": "image/svg+xml; charset=utf-8",
            "Cache-Control": "s-maxage=60, maxage=60",
            "Content-Disposition": `inline; filename=${parameters.user}.svg`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
        },
    });
}

exports.main = main;
