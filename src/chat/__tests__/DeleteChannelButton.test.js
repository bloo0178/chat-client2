import React from "react";
//import { createShallow } from "@material-ui/core/test-utils";
import {shallow} from 'enzyme';
import DeleteChannelButton from "../DeleteChannelButton";
import sinon from "sinon"; 

describe("<DeleteChannelButton />", ()=> {
    //let shallow;
    const props = {
        history: {},
        channel: { isOperatorWithUserId: jest.fn() }, //get this to return true
        sb: { getCurrentUserId: jest.fn() }, 
        openSnackbar: jest.fn()
      };
    //beforeEach(() => {
    //    shallow = createShallow({dive: true});
        /*jest.mock('../../common/SharedSnackbar.context', () => ({
            SharedSnackbarConsumer: {
                openSnackBar: jest.fn()
            }
        }))*/
   // })

    test("it renders", () => {
        const wrapper = shallow(<DeleteChannelButton {...props} />).dive();
        const button = wrapper.find({id: "deleteChannel"});
        expect(wrapper).toBeDefined();
        expect(button).toHaveLength(1);
    }) 


    // https://remarkablemark.org/blog/2017/02/13/enzyme-test-react-component-method/
    // https://github.com/airbnb/enzyme/issues/1456 
    // https://www.leighhalliday.com/testing-react-jest-enzyme-sinon
    // https://sinonjs.org/releases/v7.2.3/spies/
    
    test("it's disabled for non-operators", () => {
        const wrapper = shallow(<DeleteChannelButton {...props} />).dive(); //had an extra .dive() here as well
        const button = wrapper.find({ id: 'deleteChannel'});
        //const test2 = wrapper.instance().handleDelete();
        const test2 = wrapper.instance();

        const spy = sinon.spy(test2, "handleDelete");
  
        button.prop('onClick')();
        button.simulate('click');
        //console.log(wrapper.debug());
        //expect(spy).toHaveBeenCalled();
   
        expect(spy.calledOnce).toBe(true);
    
    })
})