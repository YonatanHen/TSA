import React from 'react';
import renderer from 'react-test-renderer';
import { colors } from '../constants/colors';
import App from '../App.js'
import AppNavigator from '../navigation/AppNavigator'
import store from '../store/store'
import { Provider } from 'react-redux';

test('App component has 1 child at least', async () => {
  const tree = renderer.create(<App />).toJSON()
  expect(tree.children.length).toBeGreaterThanOrEqual(1)
});

test('App component recieved store as a prop', async () => {
  const tree = renderer.create(<App />).toTree().rendered.props
  expect(tree.store).not.toBe(null || undefined)
})

test('2 constant colors at least', async () => {
  const colorsObj = Object.keys(colors)
  expect(colorsObj.length).toBeGreaterThan(1)
})

test('Test app navigator components', async () => {
  const tree = renderer
              .create(<Provider store={store}>
                        <AppNavigator />
                      </Provider>).toJSON()
  expect(tree.children.length).toBeGreaterThanOrEqual(1)
})