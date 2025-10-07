import * as React from 'react';
import { act, create } from 'react-test-renderer';

import { MonoText } from '../StyledText';

describe('MonoText Component', () => {
  it('renders correctly with default props', () => {
    let tree;
    act(() => {
      tree = create(<MonoText>Snapshot test!</MonoText>);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with custom style', () => {
    let tree;
    act(() => {
      tree = create(
        <MonoText style={{ color: 'red' }}>Custom Style Test</MonoText>
      );
    });
    const { style } = tree.toJSON().props;
    expect(style).toEqual(expect.arrayContaining([{ color: 'red' }]));
  });

  it('handles empty children', () => {
    let tree;
    act(() => {
      tree = create(<MonoText />);
    });
    expect(tree.toJSON().children).toBeNull();
  });
});
