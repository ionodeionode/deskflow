import { INode, INodeData, INodeParams } from '../../../src/Interface';
import { getBaseClasses } from '../../../src/utils';
import { ChatPerplexity } from '../../chatmodels/ChatPerplexity/FlowiseChatPerplexity';
import { getCredentialData, getCredentialParam } from '../../../src/utils'

class PerplexityLLM implements INode {
    label: string;
    name: string;
    version: number;
    description: string;
    type: string;
    icon: string;
    category: string;
    baseClasses: string[];
    credential: INodeParams[]; // Changed to array
    inputs: INodeParams[];

    constructor() {
        this.label = 'Perplexity Chat';
        this.name = 'perplexityChat';
        this.version = 1.0;
        this.type = 'PerplexityChat';
        this.icon = 'perplexity.svg';
        this.category = 'LLMs';
        this.description = 'Perplexity AI large language model';
        this.baseClasses = [this.type, ...getBaseClasses(ChatPerplexity)];
        this.credential = [
            {
                label: 'Connect Credential',
                name: 'credential',
                type: 'credential',
                credentialNames: ['perplexityApi']
            }
        ];
        this.inputs = [
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

    async init(nodeData: INodeData): Promise<any> {
        const temperature = nodeData.inputs?.temperature as string;
        const modelName = nodeData.inputs?.modelName as string;
        const maxTokens = nodeData.inputs?.maxTokens as string;
        const topP = nodeData.inputs?.topP as string;
        const frequencyPenalty = nodeData.inputs?.frequencyPenalty as string;
        const presencePenalty = nodeData.inputs?.presencePenalty as string;
        const stop = nodeData.inputs?.stop as string;

        const credentialData = await getCredentialData(nodeData.credential ?? '');
        const perplexityApiKey = getCredentialParam('perplexityApiKey', credentialData, nodeData);

        const obj: Partial<any> = {
            model: modelName,
            temperature: parseFloat(temperature),
            perplexityApi_key: perplexityApiKey,
        };

        if (maxTokens) obj.maxTokens = parseInt(maxTokens, 10);
        if (topP) obj.topP = parseFloat(topP);
        if (frequencyPenalty) obj.frequencyPenalty = parseFloat(frequencyPenalty);
        if (presencePenalty) obj.presencePenalty = parseFloat(presencePenalty);
        if (stop) obj.stop = stop.split(',');

        const model = new ChatPerplexity(nodeData.id, obj);
        return model;
    }
}

module.exports = { nodeClass: PerplexityLLM };
