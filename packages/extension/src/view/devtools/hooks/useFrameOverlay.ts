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
import React, { useEffect, useRef, useCallback } from 'react';

/**
 * Internal dependencies.
 */
import { WEBPAGE_PORT_NAME } from '../../../constants';

interface UseFrameOverlayProps {
  selectedFrame: string | null;
  setInspectedFrame: React.Dispatch<React.SetStateAction<string | null>>;
}

interface Response {
  attributes: { src: React.SetStateAction<string | null> };
}

const useFrameOverlay = ({
  selectedFrame,
  setInspectedFrame,
}: UseFrameOverlayProps) => {
  const portRef = useRef<chrome.runtime.Port | null>(null);

  const storageChangeListner = useCallback(
    (changes: object) => {
      if (changes?.isInspecting && portRef.current) {
        if (changes.isInspecting?.newValue) {
          portRef.current.postMessage({
            FrameInspect: 'start',
          });
        } else {
          portRef.current.postMessage({
            FrameInspect: 'stop',
          });
        }
      }
      console.log('test storage listner');
    },
    [portRef]
  );

  useEffect(() => {
    chrome.runtime.onConnect.addListener((port) => {
      console.log(port);
      if (port.name === WEBPAGE_PORT_NAME) {
        portRef.current = port;
        console.log('Web port connected.');
        portRef.current.onMessage.addListener((response: Response) => {
          console.log(response);

          if (response?.attributes?.src) {
            console.log(response.attributes.src);
            setInspectedFrame(response.attributes.src);
          }
        });

        portRef.current.onDisconnect.addListener(() => {
          portRef.current = null;
          console.log('Web port disconnected.');
        });
      }
    });

    chrome.storage.onChanged.addListener(storageChangeListner);
  }, [setInspectedFrame, storageChangeListner]);

  useEffect(() => {
    if (selectedFrame && portRef.current) {
      console.log(selectedFrame);
      portRef.current.postMessage({
        selectedFrame,
      });
    }
  }, [selectedFrame]);
};

export default useFrameOverlay;
