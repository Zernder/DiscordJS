const body = {
	'prompt': 'Niko the kobold stalked carefully down the alley, his small scaly figure obscured by a dusky cloak that fluttered lightly in the cold winter breeze.',
	'temperature': 0.5,
	'top_p': 0.9,

};

// Description: This file is used to test the chatbot API endpoint.
async function chatbot() {
	const response = await fetch('http://127.0.0.1:5000/api/v1/generate', {
		method: 'POST',
		mode:'cors',
		headers: {},
		body: JSON.stringify(body),
	});


	console.log(response.status);
	const text = await response.json();
	console.log(text);
}

chatbot();