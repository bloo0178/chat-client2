import React from 'react';
import {shallow} from 'enzyme';
import Channels from '../Channels';

describe("<Channels />", () => {
    let wrapper;
    const props = {

    }
    beforeEach(() => {
        wrapper = shallow(<Channels {...props} />).dive();
    })

    test("does it render correctly", () => {
        expect(wrapper).toMatchSnapshot();
    })
})