// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **



'use strict';

function main() {
  // [START artifactregistry_v1_generated_ArtifactRegistry_GetTag_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  The name of the tag to retrieve.
   */
  // const name = 'abc123'

  // Imports the Artifactregistry library
  const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry').v1;

  // Instantiates a client
  const artifactregistryClient = new ArtifactRegistryClient();

  async function callGetTag() {
    // Construct request
    const request = {
    };

    // Run request
    const response = await artifactregistryClient.getTag(request);
    console.log(response);
  }

  callGetTag();
  // [END artifactregistry_v1_generated_ArtifactRegistry_GetTag_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
