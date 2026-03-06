# Perplexity LLM

Perplexity Large Language Model.

## Parameters:
- **Perplexity API Key**: Your API key from Perplexity.
- **Model Name**: The model to use, e.g., `pplx-7b-online`, `pplx-70b-online`, `pplx-7b-chat`, `pplx-70b-chat`, `llama-2-70b-chat`, `codellama-34b-instruct`, `mistral-7b-instruct`.
- **Temperature**: The temperature of the model. Increasing the temperature will make the model more creative and generate more diverse responses, while decreasing it will make the model more focused and deterministic.
- **Max Tokens**: The maximum number of tokens to generate in the completion. The token count of your prompt plus `max_tokens` cannot exceed the model's maximum context length.
- **Top P**: The `top_p` parameter controls the nucleus sampling, or the cumulative probability of the most likely tokens to be considered.
- **Frequency Penalty**: Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
- **Presence Penalty**: Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
- **Stop**: Up to 4 sequences where the API will stop generating further tokens. The API will return all of the text generated up to the first occurrence of a stop sequence.

## Output:
The generated text from the Perplexity LLM.