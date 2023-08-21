/*
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * External dependencies.
 */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

/**
 * Internal dependencies.
 */
import CookiesLanding from '..';
import mockRespose from '../../../../../../../utils/test-data/cookieMockData';

jest.mock('../../../../../stateProviders/syncCookieStore', () => {
  return {
    useCookieStore: () => {
      return {
        cookies: Object.values(mockRespose.tabCookies),
        tabUrl: mockRespose.tabUrl,
        tabFrames: mockRespose.tabFrames,
        selectedFrame: mockRespose.selectedFrame,
      };
    },
  };
});

describe('CookiesLanding', () => {
  it('renders CookiesLanding with data', () => {
    const { getByTestId } = render(<CookiesLanding />);

    expect(getByTestId('cookies-landing')).toBeInTheDocument();
    expect(getByTestId('cookies-landing-header')).toBeInTheDocument();
    expect(getByTestId('cookies-matrix')).toBeInTheDocument();
  });
});