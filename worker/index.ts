// Serves the static site, and sends every other host (www, the old domain, plain http) to
// https://musab.dev with a permanent redirect. workers.dev previews are served as they are.
const CANONICAL_HOST = 'musab.dev';

interface Env {
	ASSETS: { fetch: (request: Request) => Promise<Response> };
}

const worker = {
	fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const isPreview = url.hostname.endsWith('.workers.dev') || url.hostname === 'localhost';

		if (!isPreview && (url.hostname !== CANONICAL_HOST || url.protocol !== 'https:')) {
			url.hostname = CANONICAL_HOST;
			url.protocol = 'https:';
			url.port = '';

			return Promise.resolve(Response.redirect(url.toString(), 301));
		}

		return env.ASSETS.fetch(request);
	},
};

export default worker;
