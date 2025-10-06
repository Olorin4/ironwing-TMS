import * as React from 'react';
import { act, create } from 'react-test-renderer';

import { MonoText } from '../StyledText';

it(`renders correctly`, () => {
  let tree;
  act(() => {
    tree = create(<MonoText>Snapshot test!</MonoText>);
  });

  expect(tree.toJSON()).toMatchSnapshot();
});
