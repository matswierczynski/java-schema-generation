import { toJavaClassName } from '../utils/String.utils'

export function generateDtoTemplates(asyncapi) {

    const dtos = {}

    for (const channel of Object.values(asyncapi.channels())) {
        if (channel.publish()) {
            for (const message of Object.values(channel.publish().messages())) {
                dtos[toJavaClassName(message.uid())+'Event'] = message;
            }
        }
    }

    return dtos;
}