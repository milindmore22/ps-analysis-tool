#!/bin/bash

# Download Extension
extension_setup() {
  ps_analysis_tool_version=v0.3.0
  cd /tmp/
  if [ ! -d /tmp/ps-analysis-tool-$ps_analysis_tool_version ]; then
    mkdir -p /tmp/ps-analysis-tool-$ps_analysis_tool_version
    curl -L -O -s  https://github.com/GoogleChromeLabs/ps-analysis-tool/releases/download/$ps_analysis_tool_version/extension-$ps_analysis_tool_version.zip
    unzip -qo extension-$ps_analysis_tool_version.zip -d /tmp/ps-analysis-tool-$ps_analysis_tool_version
  fi
}

# Detect OS
if [[ "$(uname)" == "Darwin" ]]; then
  echo "Macintosh"
  launch_chrome() {
      local CHROME_PATH="/Applications/Google Chrome.app"
      local DATA_DIR="$(mktemp -d '/tmp/chrome_data_dir.XXXXXXXXXX')"
      open -W -na "${CHROME_PATH}" --args \
          --disable-sync \
          --no-default-browser-check \
          --no-first-run \
          --user-data-dir="${DATA_DIR}" \
          "$@" https://example.com >/dev/null 2>&1 && rm -rf "${DATA_DIR}" &
  }
elif [[ "$(uname)" == "Linux" ]]; then
  echo "Linux"
  launch_chrome() {
    local CHROME="google-chrome"
    local DATA_DIR="$(mktemp -d '/tmp/chrome_data_dir.XXXXXXXXXX')"
    "${CHROME}" \
        --disable-sync \
        --no-default-browser-check \
        --no-first-run \
        --user-data-dir="${DATA_DIR}" \
        "$@" https://example.com >/dev/null 2>&1 && rm -rf "${DATA_DIR}" &
    }
fi

# Loads Chrome with a temporary profile that is deleted after Chrome is closed
chrome-default() {
  launch_chrome \
    --install-autogenerated-theme='150,220,150'
}

chrome-3pcd() {
  launch_chrome \
    --install-autogenerated-theme='255,51,51' \
    --test-third-party-cookie-phaseout \
    --enable-features="FirstPartySets,StorageAccessAPI,StorageAccessAPIForOriginExtension,PageInfoCookiesSubpage,PrivacySandboxFirstPartySetsUI"
}

chrome-default-ps() {
  extension_setup
  launch_chrome \
    --install-autogenerated-theme='150,220,150' \
    --load-extension="/tmp/ps-analysis-tool-v0.3.0/extension/"
}

chrome-3pcd-ps() {
  extension_setup
  launch_chrome \
    --install-autogenerated-theme='255,51,51' \
    --test-third-party-cookie-phaseout \
    --load-extension="/tmp/ps-analysis-tool-v0.3.0/extension" \
    --enable-features="FirstPartySets,StorageAccessAPI,StorageAccessAPIForOriginExtension,PageInfoCookiesSubpage,PrivacySandboxFirstPartySetsUI"
}

chrome-chip() {
  launch_chrome \
    --partitioned-cookies=true
}
