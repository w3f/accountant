import fs from 'fs-extra';
import tmp from 'tmp';

import { readYAML } from '../src/files';

import { should } from 'chai';

should();

describe('YAML file reader', () => {
    it('should read valid config files', () => {
        const fileContent = 'content';

        const tmpobj = tmp.fileSync();
        fs.writeSync(tmpobj.fd, fileContent);

        const result = readYAML(tmpobj.name);

        result.should.eq(fileContent);
    });

    it('should fail reading invalid config files', () => {
        const fileContent = `
  invalid:
  invalid
`;
        const tmpobj = tmp.fileSync();
        fs.writeSync(tmpobj.fd, fileContent);

        (() => { readYAML(tmpobj.name) }).should.throw();
    });

});
