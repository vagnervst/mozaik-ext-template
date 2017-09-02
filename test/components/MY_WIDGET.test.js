import test        from 'ava';
import React       from 'react';
import { shallow } from 'enzyme';
import mockery     from 'mockery';

test.before('before hook', t => {
    mockery.enable({
        warnOnUnregistered: false
    });
    mockery.registerMock('mozaik/browser', {
        Mixin: { ApiConsumer: {} }
    });

    MY_WIDGET = require('./../../src/components/MY_WIDGET.jsx').default;
});


test.after('after hook', () => {
    mockery.deregisterMock('mozaik/browser');
    mockery.disable();
});


test('should ...', t => {
    const wrapper = shallow(<MY_WIDGET />);
    //Test code
});
