
import React from 'react';
import { configure,  shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';


configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    it('should manage orders and logout <NavigationItems />  once isAuth props are true', () => {
        const wrapper = shallow(<NavigationItems isAuth />);
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    });

    it('should contain a logout link', () => {
        const wrapper = shallow(<NavigationItems isAuth />);
        expect(wrapper.contains(<NavigationItem link = '/logout'>Logout</NavigationItem>)).toEqual(true);
    })
}
)