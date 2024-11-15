//@ts-check
const https = require('node:https');
const dotenv = require('dotenv');

dotenv.config();

const options = {
	owner: 'RonStrauss',
	repo: 'ng-todo',
	token: process.env.GITHUB_TOKEN,
	base: 'master',
	head: 'develop',
};

if (!options.token) {
	console.error('Please set the environment variable: GITHUB_TOKEN');
	process.exit(1);
}

async function openPullRequest(options) {
	const { owner, base, description, head, repo, token } = options;
	const url = `https://api.github.com/repos/${owner}/${repo}/pulls`;

	const requestData = JSON.stringify({
		title: 'PR From Script',
		base,
		head,
		body: description,
	});

	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(requestData),
			'User-Agent': `${options.owner}-github-bot`,
			Authorization: `Bearer ${token}`,
		},
	};

	const req = https.request(url, requestOptions, res => {
		let responseData = '';

		res.on('data', chunk => {
			responseData += chunk;
		});

		res.on('end', () => {
			const prData = JSON.parse(responseData);

			if (!res.statusCode || res.statusCode < 199 || res.statusCode > 399) {
				console.log('fetch failed');
				console.log(prData);
				process.exit(1);
			}

			const prNumber = prData.number;

			console.log(`Pull Request created successfully!`);
			console.log(`Link: https://github.com/${options.owner}/Mobility-Client/pull/` + prNumber);
		});
	});

	req.on('error', e => {
		console.error('Error creating pull request: ', e.message);
	});

	req.write(requestData);
	req.end();
}

openPullRequest(options);
