/*
* (c) Copyright IBM Corporation 2021
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { createJavaArgsFromProperties } from '../utils/Types.utils';

export function Class({ childrenContent, name, implementsClass, extendsClass }) {
  if (childrenContent === undefined) { 
    childrenContent = '';
  }

  let implementsString = '';

  if (implementsClass !== undefined) {
    implementsString = `implements ${implementsClass}`;
  }

  let extendsString = '';

  if (extendsClass !== undefined) {
    extendsString = `extends ${extendsClass}`;
  }

  return `
public class ${name} ${implementsString} ${extendsString}{
${childrenContent}
}
`;
}

export function ClassConstructor({ childrenContent, name, properties }) {
  let propertiesString = '';

  if (properties) {
    propertiesString = createJavaArgsFromProperties(properties);
  }

  return `
  public ${name}(${propertiesString}) {
    ${childrenContent}
  }`;
}

export function PackageDeclaration({ path }) {
  return `
${javaCopyright()}
package ${path};
  `;
}

export function ImportDeclaration({path}) {
  return `
import ${path};`;
}

export function javaCopyright() {
  return `/*
* (c) Copyright IBM Corporation 2021
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/`;
}
