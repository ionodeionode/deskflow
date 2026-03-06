import { BaseCache } from '@langchain/core/caches'
import { ChatGroq, ChatGroqInput } from '@langchain/groq'
import { ICommonObject, INode, INodeData, INodeOptionsValue, INodeParams } from '../../../src/Interface'
import { getModels, MODEL_TYPE } from '../../../src/modelLoader'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'

class GroqLLM implements INode {
    label: string
    name: string
    version: number
    type: string
    icon: string
    category: string
    description: string
    baseClasses: string[]
    credential: INodeParams
    inputs: INodeParams[]

    constructor() {
        this.label = 'Groq Chat'
        this.name = 'groqChat'
        this.version = 1.0 // Changed to 1.0 from 4.0 as it's a new LLM type and not a chatmodel
        this.type = 'GroqChat'
        this.icon = 'groq.svg' // Using svg as it exists in the llms folder
        this.category = 'LLMs' // Changed from 'Chat Models'
        this.description = 'Groq AI large language model' // Updated description
        this.baseClasses = [this.type, ...getBaseClasses(ChatGroq)]
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['groqApi']
        }
        this.inputs = [
            {
                label: 'Cache',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'options', // Changed from asyncOptions as there is no specific `listModels` for LLMs in Groq
                options: [
                    {
                        label: 'llama2-70b-4096',
                        name: 'llama2-70b-4096'
                    },
                    {
                        label: 'mixtral-8x7b-32768',
                        name: 'mixtral-8x7b-32768'
                    }
                ],
                default: 'llama2-70b-4096',
                required: true
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.7, // Changed from 0.9
                optional: true
            },
            {
                label: 'Max Tokens',
                name: 'maxTokens',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Streaming',
                name: 'streaming',
                type: 'boolean',
                default: true,
                optional: true
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
        ]
    }

    //@ts-ignore
    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const modelName = nodeData.inputs?.modelName as string
        const maxTokens = nodeData.inputs?.maxTokens as string
        const cache = nodeData.inputs?.cache as BaseCache
        const temperature = nodeData.inputs?.temperature as string
        const streaming = nodeData.inputs?.streaming as boolean
        const topP = nodeData.inputs?.topP as string
        const frequencyPenalty = nodeData.inputs?.frequencyPenalty as string
        const presencePenalty = nodeData.inputs?.presencePenalty as string
        const stop = nodeData.inputs?.stop as string

        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const groqApiKey = getCredentialParam('groqApiKey', credentialData, nodeData)

        const obj: ChatGroqInput = {
            modelName,
            temperature: parseFloat(temperature),
            apiKey: groqApiKey,
            streaming: streaming ?? true
        }
        if (maxTokens) obj.maxTokens = parseInt(maxTokens, 10)
        if (cache) obj.cache = cache
        if (topP) obj.topP = parseFloat(topP)
        if (frequencyPenalty) obj.frequencyPenalty = parseFloat(frequencyPenalty)
        if (presencePenalty) obj.presencePenalty = parseFloat(presencePenalty)
        if (stop) obj.stop = stop.split(',');

        const model = new ChatGroq(obj)
        return model
    }
}

module.exports = { nodeClass: GroqLLM }