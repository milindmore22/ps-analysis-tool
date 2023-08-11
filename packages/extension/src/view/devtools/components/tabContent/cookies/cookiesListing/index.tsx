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
import { Resizable } from 're-resizable';

/**
 * Internal dependencies.
 */
import { useCookieStore } from '../../../../stateProviders/syncCookieStore';
import CookieDetails from './cookieDetails';
import CookieTable from './cookieTable';
import FiltersList from '../../../cookieFilter';
import { useFilterManagementStore } from '../../../../stateProviders/filterManagementStore';
import ChipsBar from '../../../cookieFilter/chips';

const CookiesListing = () => {
  const { selectedFrame } = useCookieStore(({ state }) => ({
    selectedFrame: state.selectedFrame,
  }));

  const filteredCookies = useFilterManagementStore(
    ({ state }) => state.filteredCookies
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-7">
        <ChipsBar />
      </div>
      <div className="w-full h-[calc(100%-1.75rem)]">
        <div className="h-full flex flex-col">
          <Resizable
            defaultSize={{
              width: '100%',
              height: '80%',
            }}
            minHeight="6%"
            maxHeight="98%"
            enable={{
              top: false,
              right: false,
              bottom: true,
              left: false,
            }}
          >
            <div className="h-full flex">
              <Resizable
                defaultSize={{
                  width: '20%',
                  height: '100%',
                }}
                minWidth="10%"
                maxWidth="80%"
                enable={{
                  top: false,
                  right: true,
                  bottom: false,
                  left: false,
                }}
                className="overflow-y-scroll overflow-x-hidden pt-5 pl-5"
              >
                <FiltersList />
              </Resizable>

              <div className="flex-1">
                <CookieTable
                  cookies={filteredCookies}
                  selectedFrame={selectedFrame}
                />
              </div>
            </div>
          </Resizable>
          <div className="w-full h-full bg-white border-2 border-gray-300 shadow overflow-auto">
            <CookieDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesListing;
