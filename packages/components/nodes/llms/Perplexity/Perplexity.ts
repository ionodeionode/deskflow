
import { INode, INodeData, INodeParams } from '../../src/Interface';

class Perplexity implements INode {
    label: string;
    name: string;
    version: number;
    description: string;
    type: string;
    icon: string;
    category: string;
    baseClasses: string[];
    inputs: INodeParams[];

    constructor() {
        this.label = 'Perplexity Chat';
        this.name = 'perplexityChat';
        this.version = 1.0;
        this.type = 'PerplexityChat';
        this.icon = 'perplexity.svg';
        this.category = 'LLMs';
        this.description = 'Perplexity AI large language model';
        this.baseClasses = ['PerplexityChat'];
        this.inputs = [
            {
                label: 'Perplexity API Key',
                name: 'PerplexityApiKey',
                type: 'password',
                placeholder: 'YOUR_PERPLEXITY_API_KEY',
                required: true
            },
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'options',
                options: [
                    {
                        label: 'pplx-7b-online',
                        name: 'pplx-7b-online'
                    },
                    {
                        label: 'pplx-70b-online',
                        name: 'pplx-70b-online'
                    },
                    {
                        label: 'pplx-7b-chat',
                        name: 'pplx-7b-chat'
                    },
                    {
                        label: 'pplx-70b-chat',
                        name: 'pplx-70b-chat'
                    },
                    {
                        label: 'llama-2-70b-chat',
                        name: 'llama-2-70b-chat'
                    },
                    {
                        label: 'codellama-34b-instruct',
                        name: 'codellama-34b-instruct'
                    },
                    {
                        label: 'mistral-7b-instruct',
                        name: 'mistral-7b-instruct'
                    }
                ],
                default: 'pplx-7b-online',
                required: true
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                default: 0.7,
                optional: true
            },
            {
                label: 'Max Tokens',
                name: 'maxTokens',
                type: 'number',
                optional: true
                ,additionalParams: true
            },
            {
                label: 'Top P',
                name: 'topP',
                type: 'number',
                optional: true
                ,additionalParams: true
            },
            {
                label: 'Frequency Penalty',
                name: 'frequencyPenalty',
                type: 'number',
                optional: true
                ,additionalParams: true
            },
            {
                label: 'Presence Penalty',
                name: 'presencePenalty',
                type: 'number',
                optional: true
                ,additionalParams: true
            },
            {
                label: 'Stop',
                name: 'stop',
                type: 'string',
                optional: true,
                additionalParams: true,
                placeholder: `["\\nObservation", "\\n\\n"]`
            }
        ];
    }

    async init(): Promise<any> {
        return null;
    }

    async run(nodeData: INodeData): Promise<string> {
        return '';
    }
}

module.exports = { nodeClass: Perplexity };
