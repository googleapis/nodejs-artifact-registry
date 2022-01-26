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

/* global window */
import * as gax from 'google-gax';
import {Callback, CallOptions, Descriptors, ClientOptions, PaginationCallback, GaxCall} from 'google-gax';

import { Transform } from 'stream';
import { RequestType } from 'google-gax/build/src/apitypes';
import * as protos from '../../protos/protos';
import jsonProtos = require('../../protos/protos.json');
/**
 * Client JSON configuration object, loaded from
 * `src/v1/artifact_registry_client_config.json`.
 * This file defines retry strategy and timeouts for all API methods in this library.
 */
import * as gapicConfig from './artifact_registry_client_config.json';

const version = require('../../../package.json').version;

/**
 *  The Artifact Registry API service.
 *
 *  Artifact Registry is an artifact management system for storing artifacts
 *  from different package management systems.
 *
 *  The resources managed by this API are:
 *
 *  * Repositories, which group packages and their data.
 *  * Packages, which group versions and their tags.
 *  * Versions, which are specific forms of a package.
 *  * Tags, which represent alternative names for versions.
 *  * Files, which contain content and are optionally associated with a Package
 *    or Version.
 * @class
 * @memberof v1
 */
export class ArtifactRegistryClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _providedCustomServicePath: boolean;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  descriptors: Descriptors = {
    page: {},
    stream: {},
    longrunning: {},
    batching: {},
  };
  warn: (code: string, message: string, warnType?: string) => void;
  innerApiCalls: {[name: string]: Function};
  pathTemplates: {[name: string]: gax.PathTemplate};
  artifactRegistryStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of ArtifactRegistryClient.
   *
   * @param {object} [options] - The configuration object.
   * The options accepted by the constructor are described in detail
   * in [this document](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#creating-the-client-instance).
   * The common options are:
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   * @param {gax.ClientConfig} [options.clientConfig] - Client configuration override.
   *     Follows the structure of {@link gapicConfig}.
   * @param {boolean} [options.fallback] - Use HTTP fallback mode.
   *     In fallback mode, a special browser-compatible transport implementation is used
   *     instead of gRPC transport. In browser context (if the `window` object is defined)
   *     the fallback mode is enabled automatically; set `options.fallback` to `false`
   *     if you need to override this behavior.
   */
  constructor(opts?: ClientOptions) {
    // Ensure that options include all the required fields.
    const staticMembers = this.constructor as typeof ArtifactRegistryClient;
    const servicePath = opts?.servicePath || opts?.apiEndpoint || staticMembers.servicePath;
    this._providedCustomServicePath = !!(opts?.servicePath || opts?.apiEndpoint);
    const port = opts?.port || staticMembers.port;
    const clientConfig = opts?.clientConfig ?? {};
    const fallback = opts?.fallback ?? (typeof window !== 'undefined' && typeof window?.fetch === 'function');
    opts = Object.assign({servicePath, port, clientConfig, fallback}, opts);

    // If scopes are unset in options and we're connecting to a non-default endpoint, set scopes just in case.
    if (servicePath !== staticMembers.servicePath && !('scopes' in opts)) {
      opts['scopes'] = staticMembers.scopes;
    }

    // Choose either gRPC or proto-over-HTTP implementation of google-gax.
    this._gaxModule = opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options sent to the client.
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = (this._gaxGrpc.auth as gax.GoogleAuth);

    // Set useJWTAccessWithScope on the auth object.
    this.auth.useJWTAccessWithScope = true;

    // Set defaultServicePath on the auth object.
    this.auth.defaultServicePath = staticMembers.servicePath;

    // Set the default scopes in auth client if needed.
    if (servicePath === staticMembers.servicePath) {
      this.auth.defaultScopes = staticMembers.scopes;
    }

    // Determine the client header string.
    const clientHeader = [
      `gax/${this._gaxModule.version}`,
      `gapic/${version}`,
    ];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    } else if (opts.fallback === 'rest' ) {
      clientHeader.push(`rest/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    this._protos = this._gaxGrpc.loadProtoJSON(jsonProtos);

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this.pathTemplates = {
      dockerImagePathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/repositories/{repository}/dockerImages/{docker_image}'
      ),
      repositoryPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/repositories/{repository}'
      ),
    };

    // Some of the methods on this service return "paged" results,
    // (e.g. 50 results at a time, with tokens to get subsequent
    // pages). Denote the keys used for pagination and results.
    this.descriptors.page = {
      listDockerImages:
          new this._gaxModule.PageDescriptor('pageToken', 'nextPageToken', 'dockerImages'),
      listRepositories:
          new this._gaxModule.PageDescriptor('pageToken', 'nextPageToken', 'repositories')
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
        'google.devtools.artifactregistry.v1.ArtifactRegistry', gapicConfig as gax.ClientConfig,
        opts.clientConfig || {}, {'x-goog-api-client': clientHeader.join(' ')});

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};

    // Add a warn function to the client constructor so it can be easily tested.
    this.warn = gax.warn;
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.artifactRegistryStub) {
      return this.artifactRegistryStub;
    }

    // Put together the "service stub" for
    // google.devtools.artifactregistry.v1.ArtifactRegistry.
    this.artifactRegistryStub = this._gaxGrpc.createStub(
        this._opts.fallback ?
          (this._protos as protobuf.Root).lookupService('google.devtools.artifactregistry.v1.ArtifactRegistry') :
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.devtools.artifactregistry.v1.ArtifactRegistry,
        this._opts, this._providedCustomServicePath) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const artifactRegistryStubMethods =
        ['listDockerImages', 'listRepositories', 'getRepository'];
    for (const methodName of artifactRegistryStubMethods) {
      const callPromise = this.artifactRegistryStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        },
        (err: Error|null|undefined) => () => {
          throw err;
        });

      const descriptor =
        this.descriptors.page[methodName] ||
        undefined;
      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        descriptor
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.artifactRegistryStub;
  }

  /**
   * The DNS address for this API service.
   * @returns {string} The DNS address for this service.
   */
  static get servicePath() {
    return 'artifactregistry.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   * @returns {string} The DNS address for this service.
   */
  static get apiEndpoint() {
    return 'artifactregistry.googleapis.com';
  }

  /**
   * The port for this API service.
   * @returns {number} The default port for this service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   * @returns {string[]} List of default scopes.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/cloud-platform.read-only'
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @returns {Promise} A promise that resolves to string containing the project ID.
   */
  getProjectId(callback?: Callback<string, undefined, undefined>):
      Promise<string>|void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
/**
 * Gets a repository.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.name
 *   Required. The name of the repository to retrieve.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Repository]{@link google.devtools.artifactregistry.v1.Repository}.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
 *   for more details and examples.
 * @example <caption>include:samples/generated/v1/artifact_registry.get_repository.js</caption>
 * region_tag:artifactregistry_v1_generated_ArtifactRegistry_GetRepository_async
 */
  getRepository(
      request?: protos.google.devtools.artifactregistry.v1.IGetRepositoryRequest,
      options?: CallOptions):
      Promise<[
        protos.google.devtools.artifactregistry.v1.IRepository,
        protos.google.devtools.artifactregistry.v1.IGetRepositoryRequest|undefined, {}|undefined
      ]>;
  getRepository(
      request: protos.google.devtools.artifactregistry.v1.IGetRepositoryRequest,
      options: CallOptions,
      callback: Callback<
          protos.google.devtools.artifactregistry.v1.IRepository,
          protos.google.devtools.artifactregistry.v1.IGetRepositoryRequest|null|undefined,
          {}|null|undefined>): void;
  getRepository(
      request: protos.google.devtools.artifactregistry.v1.IGetRepositoryRequest,
      callback: Callback<
          protos.google.devtools.artifactregistry.v1.IRepository,
          protos.google.devtools.artifactregistry.v1.IGetRepositoryRequest|null|undefined,
          {}|null|undefined>): void;
  getRepository(
      request?: protos.google.devtools.artifactregistry.v1.IGetRepositoryRequest,
      optionsOrCallback?: CallOptions|Callback<
          protos.google.devtools.artifactregistry.v1.IRepository,
          protos.google.devtools.artifactregistry.v1.IGetRepositoryRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.devtools.artifactregistry.v1.IRepository,
          protos.google.devtools.artifactregistry.v1.IGetRepositoryRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.devtools.artifactregistry.v1.IRepository,
        protos.google.devtools.artifactregistry.v1.IGetRepositoryRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'name': request.name || '',
    });
    this.initialize();
    return this.innerApiCalls.getRepository(request, options, callback);
  }

 /**
 * Lists docker images.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.parent
 *   Required. The name of the parent resource whose docker images will be listed.
 * @param {number} request.pageSize
 *   The maximum number of artifacts to return.
 * @param {string} request.pageToken
 *   The next_page_token value returned from a previous list request, if any.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is Array of [DockerImage]{@link google.devtools.artifactregistry.v1.DockerImage}.
 *   The client library will perform auto-pagination by default: it will call the API as many
 *   times as needed and will merge results from all the pages into this array.
 *   Note that it can affect your quota.
 *   We recommend using `listDockerImagesAsync()`
 *   method described below for async iteration which you can stop as needed.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
 *   for more details and examples.
 */
  listDockerImages(
      request?: protos.google.devtools.artifactregistry.v1.IListDockerImagesRequest,
      options?: CallOptions):
      Promise<[
        protos.google.devtools.artifactregistry.v1.IDockerImage[],
        protos.google.devtools.artifactregistry.v1.IListDockerImagesRequest|null,
        protos.google.devtools.artifactregistry.v1.IListDockerImagesResponse
      ]>;
  listDockerImages(
      request: protos.google.devtools.artifactregistry.v1.IListDockerImagesRequest,
      options: CallOptions,
      callback: PaginationCallback<
          protos.google.devtools.artifactregistry.v1.IListDockerImagesRequest,
          protos.google.devtools.artifactregistry.v1.IListDockerImagesResponse|null|undefined,
          protos.google.devtools.artifactregistry.v1.IDockerImage>): void;
  listDockerImages(
      request: protos.google.devtools.artifactregistry.v1.IListDockerImagesRequest,
      callback: PaginationCallback<
          protos.google.devtools.artifactregistry.v1.IListDockerImagesRequest,
          protos.google.devtools.artifactregistry.v1.IListDockerImagesResponse|null|undefined,
          protos.google.devtools.artifactregistry.v1.IDockerImage>): void;
  listDockerImages(
      request?: protos.google.devtools.artifactregistry.v1.IListDockerImagesRequest,
      optionsOrCallback?: CallOptions|PaginationCallback<
          protos.google.devtools.artifactregistry.v1.IListDockerImagesRequest,
          protos.google.devtools.artifactregistry.v1.IListDockerImagesResponse|null|undefined,
          protos.google.devtools.artifactregistry.v1.IDockerImage>,
      callback?: PaginationCallback<
          protos.google.devtools.artifactregistry.v1.IListDockerImagesRequest,
          protos.google.devtools.artifactregistry.v1.IListDockerImagesResponse|null|undefined,
          protos.google.devtools.artifactregistry.v1.IDockerImage>):
      Promise<[
        protos.google.devtools.artifactregistry.v1.IDockerImage[],
        protos.google.devtools.artifactregistry.v1.IListDockerImagesRequest|null,
        protos.google.devtools.artifactregistry.v1.IListDockerImagesResponse
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    this.initialize();
    return this.innerApiCalls.listDockerImages(request, options, callback);
  }

/**
 * Equivalent to `method.name.toCamelCase()`, but returns a NodeJS Stream object.
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.parent
 *   Required. The name of the parent resource whose docker images will be listed.
 * @param {number} request.pageSize
 *   The maximum number of artifacts to return.
 * @param {string} request.pageToken
 *   The next_page_token value returned from a previous list request, if any.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Stream}
 *   An object stream which emits an object representing [DockerImage]{@link google.devtools.artifactregistry.v1.DockerImage} on 'data' event.
 *   The client library will perform auto-pagination by default: it will call the API as many
 *   times as needed. Note that it can affect your quota.
 *   We recommend using `listDockerImagesAsync()`
 *   method described below for async iteration which you can stop as needed.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
 *   for more details and examples.
 */
  listDockerImagesStream(
      request?: protos.google.devtools.artifactregistry.v1.IListDockerImagesRequest,
      options?: CallOptions):
    Transform{
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    const defaultCallSettings = this._defaults['listDockerImages'];
    const callSettings = defaultCallSettings.merge(options);
    this.initialize();
    return this.descriptors.page.listDockerImages.createStream(
      this.innerApiCalls.listDockerImages as gax.GaxCall,
      request,
      callSettings
    );
  }

/**
 * Equivalent to `listDockerImages`, but returns an iterable object.
 *
 * `for`-`await`-`of` syntax is used with the iterable to get response elements on-demand.
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.parent
 *   Required. The name of the parent resource whose docker images will be listed.
 * @param {number} request.pageSize
 *   The maximum number of artifacts to return.
 * @param {string} request.pageToken
 *   The next_page_token value returned from a previous list request, if any.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Object}
 *   An iterable Object that allows [async iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).
 *   When you iterate the returned iterable, each element will be an object representing
 *   [DockerImage]{@link google.devtools.artifactregistry.v1.DockerImage}. The API will be called under the hood as needed, once per the page,
 *   so you can stop the iteration when you don't need more results.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
 *   for more details and examples.
 * @example <caption>include:samples/generated/v1/artifact_registry.list_docker_images.js</caption>
 * region_tag:artifactregistry_v1_generated_ArtifactRegistry_ListDockerImages_async
 */
  listDockerImagesAsync(
      request?: protos.google.devtools.artifactregistry.v1.IListDockerImagesRequest,
      options?: CallOptions):
    AsyncIterable<protos.google.devtools.artifactregistry.v1.IDockerImage>{
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    const defaultCallSettings = this._defaults['listDockerImages'];
    const callSettings = defaultCallSettings.merge(options);
    this.initialize();
    return this.descriptors.page.listDockerImages.asyncIterate(
      this.innerApiCalls['listDockerImages'] as GaxCall,
      request as unknown as RequestType,
      callSettings
    ) as AsyncIterable<protos.google.devtools.artifactregistry.v1.IDockerImage>;
  }
 /**
 * Lists repositories.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.parent
 *   Required. The name of the parent resource whose repositories will be listed.
 * @param {number} request.pageSize
 *   The maximum number of repositories to return.
 * @param {string} request.pageToken
 *   The next_page_token value returned from a previous list request, if any.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is Array of [Repository]{@link google.devtools.artifactregistry.v1.Repository}.
 *   The client library will perform auto-pagination by default: it will call the API as many
 *   times as needed and will merge results from all the pages into this array.
 *   Note that it can affect your quota.
 *   We recommend using `listRepositoriesAsync()`
 *   method described below for async iteration which you can stop as needed.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
 *   for more details and examples.
 */
  listRepositories(
      request?: protos.google.devtools.artifactregistry.v1.IListRepositoriesRequest,
      options?: CallOptions):
      Promise<[
        protos.google.devtools.artifactregistry.v1.IRepository[],
        protos.google.devtools.artifactregistry.v1.IListRepositoriesRequest|null,
        protos.google.devtools.artifactregistry.v1.IListRepositoriesResponse
      ]>;
  listRepositories(
      request: protos.google.devtools.artifactregistry.v1.IListRepositoriesRequest,
      options: CallOptions,
      callback: PaginationCallback<
          protos.google.devtools.artifactregistry.v1.IListRepositoriesRequest,
          protos.google.devtools.artifactregistry.v1.IListRepositoriesResponse|null|undefined,
          protos.google.devtools.artifactregistry.v1.IRepository>): void;
  listRepositories(
      request: protos.google.devtools.artifactregistry.v1.IListRepositoriesRequest,
      callback: PaginationCallback<
          protos.google.devtools.artifactregistry.v1.IListRepositoriesRequest,
          protos.google.devtools.artifactregistry.v1.IListRepositoriesResponse|null|undefined,
          protos.google.devtools.artifactregistry.v1.IRepository>): void;
  listRepositories(
      request?: protos.google.devtools.artifactregistry.v1.IListRepositoriesRequest,
      optionsOrCallback?: CallOptions|PaginationCallback<
          protos.google.devtools.artifactregistry.v1.IListRepositoriesRequest,
          protos.google.devtools.artifactregistry.v1.IListRepositoriesResponse|null|undefined,
          protos.google.devtools.artifactregistry.v1.IRepository>,
      callback?: PaginationCallback<
          protos.google.devtools.artifactregistry.v1.IListRepositoriesRequest,
          protos.google.devtools.artifactregistry.v1.IListRepositoriesResponse|null|undefined,
          protos.google.devtools.artifactregistry.v1.IRepository>):
      Promise<[
        protos.google.devtools.artifactregistry.v1.IRepository[],
        protos.google.devtools.artifactregistry.v1.IListRepositoriesRequest|null,
        protos.google.devtools.artifactregistry.v1.IListRepositoriesResponse
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    this.initialize();
    return this.innerApiCalls.listRepositories(request, options, callback);
  }

/**
 * Equivalent to `method.name.toCamelCase()`, but returns a NodeJS Stream object.
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.parent
 *   Required. The name of the parent resource whose repositories will be listed.
 * @param {number} request.pageSize
 *   The maximum number of repositories to return.
 * @param {string} request.pageToken
 *   The next_page_token value returned from a previous list request, if any.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Stream}
 *   An object stream which emits an object representing [Repository]{@link google.devtools.artifactregistry.v1.Repository} on 'data' event.
 *   The client library will perform auto-pagination by default: it will call the API as many
 *   times as needed. Note that it can affect your quota.
 *   We recommend using `listRepositoriesAsync()`
 *   method described below for async iteration which you can stop as needed.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
 *   for more details and examples.
 */
  listRepositoriesStream(
      request?: protos.google.devtools.artifactregistry.v1.IListRepositoriesRequest,
      options?: CallOptions):
    Transform{
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    const defaultCallSettings = this._defaults['listRepositories'];
    const callSettings = defaultCallSettings.merge(options);
    this.initialize();
    return this.descriptors.page.listRepositories.createStream(
      this.innerApiCalls.listRepositories as gax.GaxCall,
      request,
      callSettings
    );
  }

/**
 * Equivalent to `listRepositories`, but returns an iterable object.
 *
 * `for`-`await`-`of` syntax is used with the iterable to get response elements on-demand.
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.parent
 *   Required. The name of the parent resource whose repositories will be listed.
 * @param {number} request.pageSize
 *   The maximum number of repositories to return.
 * @param {string} request.pageToken
 *   The next_page_token value returned from a previous list request, if any.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Object}
 *   An iterable Object that allows [async iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).
 *   When you iterate the returned iterable, each element will be an object representing
 *   [Repository]{@link google.devtools.artifactregistry.v1.Repository}. The API will be called under the hood as needed, once per the page,
 *   so you can stop the iteration when you don't need more results.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
 *   for more details and examples.
 * @example <caption>include:samples/generated/v1/artifact_registry.list_repositories.js</caption>
 * region_tag:artifactregistry_v1_generated_ArtifactRegistry_ListRepositories_async
 */
  listRepositoriesAsync(
      request?: protos.google.devtools.artifactregistry.v1.IListRepositoriesRequest,
      options?: CallOptions):
    AsyncIterable<protos.google.devtools.artifactregistry.v1.IRepository>{
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    const defaultCallSettings = this._defaults['listRepositories'];
    const callSettings = defaultCallSettings.merge(options);
    this.initialize();
    return this.descriptors.page.listRepositories.asyncIterate(
      this.innerApiCalls['listRepositories'] as GaxCall,
      request as unknown as RequestType,
      callSettings
    ) as AsyncIterable<protos.google.devtools.artifactregistry.v1.IRepository>;
  }
  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified dockerImage resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} repository
   * @param {string} docker_image
   * @returns {string} Resource name string.
   */
  dockerImagePath(project:string,location:string,repository:string,dockerImage:string) {
    return this.pathTemplates.dockerImagePathTemplate.render({
      project: project,
      location: location,
      repository: repository,
      docker_image: dockerImage,
    });
  }

  /**
   * Parse the project from DockerImage resource.
   *
   * @param {string} dockerImageName
   *   A fully-qualified path representing DockerImage resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromDockerImageName(dockerImageName: string) {
    return this.pathTemplates.dockerImagePathTemplate.match(dockerImageName).project;
  }

  /**
   * Parse the location from DockerImage resource.
   *
   * @param {string} dockerImageName
   *   A fully-qualified path representing DockerImage resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromDockerImageName(dockerImageName: string) {
    return this.pathTemplates.dockerImagePathTemplate.match(dockerImageName).location;
  }

  /**
   * Parse the repository from DockerImage resource.
   *
   * @param {string} dockerImageName
   *   A fully-qualified path representing DockerImage resource.
   * @returns {string} A string representing the repository.
   */
  matchRepositoryFromDockerImageName(dockerImageName: string) {
    return this.pathTemplates.dockerImagePathTemplate.match(dockerImageName).repository;
  }

  /**
   * Parse the docker_image from DockerImage resource.
   *
   * @param {string} dockerImageName
   *   A fully-qualified path representing DockerImage resource.
   * @returns {string} A string representing the docker_image.
   */
  matchDockerImageFromDockerImageName(dockerImageName: string) {
    return this.pathTemplates.dockerImagePathTemplate.match(dockerImageName).docker_image;
  }

  /**
   * Return a fully-qualified repository resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} repository
   * @returns {string} Resource name string.
   */
  repositoryPath(project:string,location:string,repository:string) {
    return this.pathTemplates.repositoryPathTemplate.render({
      project: project,
      location: location,
      repository: repository,
    });
  }

  /**
   * Parse the project from Repository resource.
   *
   * @param {string} repositoryName
   *   A fully-qualified path representing Repository resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromRepositoryName(repositoryName: string) {
    return this.pathTemplates.repositoryPathTemplate.match(repositoryName).project;
  }

  /**
   * Parse the location from Repository resource.
   *
   * @param {string} repositoryName
   *   A fully-qualified path representing Repository resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromRepositoryName(repositoryName: string) {
    return this.pathTemplates.repositoryPathTemplate.match(repositoryName).location;
  }

  /**
   * Parse the repository from Repository resource.
   *
   * @param {string} repositoryName
   *   A fully-qualified path representing Repository resource.
   * @returns {string} A string representing the repository.
   */
  matchRepositoryFromRepositoryName(repositoryName: string) {
    return this.pathTemplates.repositoryPathTemplate.match(repositoryName).repository;
  }

  /**
   * Terminate the gRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   * @returns {Promise} A promise that resolves when the client is closed.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.artifactRegistryStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
