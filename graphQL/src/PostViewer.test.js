import React from 'react';
import { shallow } from 'enzyme';
import PostViewer from './PostViewer';
describe("PostViewer", () => {
  it("should render my component", () => {
    const wrapper = shallow(<PostViewer />);
  });
});