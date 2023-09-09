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
chrome.devtools.panels.create(
  'Privacy Sandbox',
  'icons/icon.svg',
  'devtools/index.html',
  () => {
    chrome.runtime.onConnect.addListener((port) => {
      console.assert(port.name === 'psat-tool');

      console.log('content-script: devtoolMessage');

      port.onMessage.addListener((msg) => {
        console.log('content-script: onMessage', msg);
        if (msg.hover) {
          // Reply back to conent script.
          port.postMessage({ reply: 'message received!' });
        }
      });
    });
  }
);
