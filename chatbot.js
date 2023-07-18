const body = {
	'prompt': 'Tell me a joke',
	'llm_config': {
		'format_outputs': false,
		'max_new_tokens': 2048,
		'min_length': 0,
		'early_stopping': false,
		'num_beams': 1,
		'num_beam_groups': 1,
		'use_cache': true,
		'temperature': 0.75,
		'top_k': 15,
		'top_p': 1,
		'typical_p': 1,
		'epsilon_cutoff': 0,
		'eta_cutoff': 0,
		'diversity_penalty': 0,
		'repetition_penalty': 1,
		'encoder_repetition_penalty': 1,
		'length_penalty': 1,
		'no_repeat_ngram_size': 0,
		'renormalize_logits': false,
		'remove_invalid_values': false,
		'num_return_sequences': 1,
		'output_attentions': false,
		'output_hidden_states': false,
		'output_scores': false,
		'encoder_no_repeat_ngram_size': 0,
	},
};

// Description: This file is used to test the chatbot API endpoint.
async function chatbot() {
	const response = await fetch('http://localhost:5000/api/v1/generate', {
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