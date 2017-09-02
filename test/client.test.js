import test      from 'ava';
import nock      from 'nock';
import sinon     from 'sinon';
import mockery   from 'mockery';
import chalkMock from './chalk-mock';


let client;

const githubBaseUrl = 'https://github.test';
const githubToken   = 'secret_token';

test.before('before', t => {
    mockery.enable({
        warnOnUnregistered: false
    });

    mockery.registerMock('chalk', chalkMock);
    mockery.registerMock('./config', {
        get: (configKey) => {
            if (configKey === 'API_NAME.baseUrl') {
                return myApiBaseUrl;
            } else if (configKey === 'API_NAME.token') {
                return myApiToken;
            }

            throw new Error(`Invalid config key '${configKey}'`);
        }
    });
});

test.beforeEach('beforeEach', t => {
    const mozaik = {
        loadApiConfig: () => {},
        logger:        {
            info:  sinon.spy(),
            error: sinon.spy()
        }
    };

    t.context = {
        client: require('../src/client').default(mozaik),
        mozaik
    };
});

test.after('after', t => {
    mockery.deregisterAll();
});

//TODO: include API test example/explanation...
test('API_CALL_METHOD_NAME', t => {
    const { client, mozaik } = t.context;

    nock()
        .get(`/orgs/${organization}`)
        .reply(200, sampleOrganization)
    ;

    return client.organization({ organization })
        .then(orgData => {
            t.deepEqual(orgData, sampleOrganization);
            t.truthy(mozaik.logger.info.calledOnce);
            t.is(mozaik.logger.info.getCall(0).args[0], `[github] calling ${githubBaseUrl}/orgs/${organization}`);
        })
    ;
});
