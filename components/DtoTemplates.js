import { toJavaClassName } from '../utils/String.utils'

export function generateDtoTemplates(asyncapi) {

    const dtos = {}

    for (const channel of Object.values(asyncapi.channels())) {
        if (channel.hasPublish()) {
            const message = channel.publish().message()
            dtos[toJavaClassName(message.uid())+'Event'] = message;
        }
    }

    return dtos;
}