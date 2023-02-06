import { File, Indent, IndentationTypes } from '@asyncapi/generator-react-sdk';
import { PackageDeclaration, ImportDeclaration, Class, ClassConstructor } from './Common';
import { ModelClassVariables, ModelConstructor } from './Model';
import { generateDtoTemplates } from './DtoTemplates'
import { javaPackageToPath } from '../utils/String.utils'

export function Dtos (asyncapi, params) {
    const dtoTemplates = generateDtoTemplates(asyncapi);

    return Object.entries(dtoTemplates).map(([dtoName, dtoProps]) => {
        const packagePath = javaPackageToPath(params.package);

        return (
            <File name={`${packagePath}/${dtoName}.java`}>
                <PackageDeclaration path={`${params.package}.dto`} />
                <ImportDeclaration path={`java.util.String`} />

                <Class name={dtoName}>
                    <Indent size={2} type={IndentationTypes.SPACES}>
                        <ModelClassVariables message={dtoProps}></ModelClassVariables>
                    </Indent>

                    <ClassConstructor name={dtoName} properties={dtoProps.payload().properties()}>
                        <ModelConstructor message={dtoProps}/>
                    </ClassConstructor>
                    <ClassConstructor name={dtoName}>
                        super();
                    </ClassConstructor>
                </Class>
            </File>
        );
    });
}