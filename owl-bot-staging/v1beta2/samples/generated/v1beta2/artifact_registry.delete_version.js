// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


'use strict';

function main() {
  // [START artifactregistry_delete_version_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  The name of the version to delete.
   */
  // const name = 'abc123'
  /**
   *  By default, a version that is tagged may not be deleted. If force=true, the
   *  version and any tags pointing to the version are deleted.
   */
  // const force = true

  // Imports the Artifactregistry library
  const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry').v1beta2;

  // Instantiates a client
  const artifactregistryClient = new ArtifactRegistryClient();

  async function deleteVersion() {
    // Construct request
    const request = {
    };

    // Run request
    const [operation] = await artifactregistryClient.deleteVersion(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  deleteVersion();
  // [END artifactregistry_delete_version_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
