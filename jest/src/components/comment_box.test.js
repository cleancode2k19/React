import React from 'react';
import CommentBox from './comment_box';
import { mount,shallow } from 'enzyme';

//import { shallow } from "enzyme";
// We need to wrap CommentBox with <Provider> tag in first beforeEach(() => {}) below;

// The Provider's Redux store can be either our own Redux store (Way 1), or a mock Redux store (Way 2)
// You can choose which you like better (both are working)

// Redux I, needed for both ways:
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
configure({ adapter: new Adapter() });

// Redux II, way 1: Use our own Redux store
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
const createStoreWithMiddleware = applyMiddleware()(createStore);

// Redux II, way 2: Use a mock Redux store
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});
//testcase 0:
describe('CommentBox', () => {

    let component;
    let wrapper;
    let getFullNameSpy;
    let alertSpy;
//invoke core shallow before starting
    beforeEach(() => {

        // Way 1: Use our own Redux store
        // component = mount(<Provider store={createStoreWithMiddleware(reducers)}><CommentBox /></Provider>);

        // Way 2: Use a mock Redux store
        component = mount(<Provider store={store}><CommentBox /></Provider>);
    });

//testcase 1

    test('has a text area, which is our comment', () => {

        // Either:
        // expect(component.find('textarea').length).toBe(1);
        // Or:
        expect(component.find('textarea').exists()).toEqual(true);
    });
//test case 2
    test('has a input name', () => {

        expect(component.find('#name').exists()).toEqual(true);
    });
//test case 3
    test('has a input email', () => {
        expect(component.find('#email').exists()).toEqual(true);
    });
//test case 4
    test('has a input phone', () => {
        expect(component.find('#phone').exists()).toEqual(true);
    });
//test case 5
    test('has a input total Amount', () => {
        expect(component.find('#totalAmount').exists()).toEqual(true);
    });
//test case 6
    test('has a input amount Paid', () => {
        expect(component.find('#amountPaid').exists()).toEqual(true);
    });
//test case 7
    test('has a input remaining Amount', () => {
        expect(component.find('#remainingAmount').exists()).toEqual(true);
    });

//test case 8
    test('has a button', () => {

        // Either:
        // expect(component.find('button').length).toBe(1);
        // Or:
        expect(component.find('button').exists()).toEqual(true);
    });
//test case 9
    describe('entering some text', () => {
        beforeEach(() => {
            component.find('textarea').simulate('change', {target: {value: 'new comment'}});
        });

        test('shows that text in the textarea', () => {
            expect(component.find('textarea').prop('value')).toEqual('new comment');
        });
    });
//test case 10
    describe('entering some name', () => {
        beforeEach(() => {
            component.find('#name').simulate('change', {target: {value: 'Sample Name'}});
        });

        test('shows that text in the input Name', () => {
            expect(component.find('#name').prop('value')).toEqual('Sample Name');
        });
    });
//test case 11
    describe('entering some email', () => {
        beforeEach(() => {
            component.find('#email').simulate('change', {target: {value: 'email@email.com'}});
        });

        test('shows that text in the email', () => {
            expect(component.find('#email').prop('value')).toEqual('email@email.com');
        });
    });
//test case 12
    describe('entering some phone number', () => {
        beforeEach(() => {
            component.find('#phone').simulate('change', {target: {value: 1234567890}});
        });

        test('shows that text in the phone', () => {
            expect(component.find('#phone').prop('value')).toEqual(1234567890);
        });
    });
//test case 13
    describe('entering some total Amount', () => {
        beforeEach(() => {
            component.find('#totalAmount').simulate('change', {target: {value: 500}});
        });

        test('shows that text in the total amount', () => {
            expect(component.find('#totalAmount').prop('value')).toEqual(500);
        });

    });
//test case 14
    describe('entering some amount Paid', () => {
        beforeEach(() => {
            component.find('#amountPaid').simulate('change', {target: {value: 100}});
        });

        test('shows that text in the Amount Paid', () => {
            let wrapper = mount(<Provider store={store}><CommentBox /></Provider>);
            wrapper.setState({ totalAmount: 500 });
            wrapper.setState({ amoutPaid: 100 });
            wrapper.setState({ error: '' });
            expect(wrapper.state('amoutPaid')).toEqual(component.find('#amountPaid').prop('value'));
            expect(wrapper.state('error')).toEqual('');
        });
    });
//test case 15
    describe('handlesubmit', () => {
        let submit = jest.fn();
        let wrapper = mount(<Provider store={store}><CommentBox onSubmit={submit} /></Provider>);
      
        const button = wrapper.find('button');
        button.simulate('submit');
    });
//test case 16
describe('Checking amount paid must be smaller than total amount', () => {
    beforeEach(() => {
        component.find('#amountPaid').simulate('change', {target: {value: 100}});
        component.find('#totalAmount').simulate('change', {target: {value: 500}});
    });

    test('shows that text in the Amount Paid', () => {
        let wrapper = mount(<Provider store={store}><CommentBox /></Provider>);
        wrapper.setState({ error: 'baa' });
        expect(component.find('#totalAmount').prop('value')).toBeGreaterThan(component.find('#amountPaid').prop('value'));
        expect(wrapper.state('error')).toEqual('baa');
    });
});
  
      
});
