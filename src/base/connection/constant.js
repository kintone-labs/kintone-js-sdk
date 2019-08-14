/**
 * kintone api - nodejs client
 * Connection constants
 */

const constant = function() {
  return {
    BASE: {
      SCHEMA: 'https',
      PROXY: 'proxy',
      BASE_URL: '/k/v1/{API_NAME}.json',
      BASE_GUEST_URL: '/k/guest/{GUEST_SPACE_ID}/v1/{API_NAME}.json',
      PREFIX_API_NAME: '{API_NAME}',
      PREFIX_GUESTSPACEID: '{GUEST_SPACE_ID}',
      USER_AGENT: 'User-Agent',
      USER_AGENT_BASE_VALUE: '{name}/{version}',
      HTTPS_AGENT: 'httpsAgent',
      X_HTTP_METHOD_OVERRIDE: 'X-HTTP-Method-Override',
      LIMIT_REQUEST_URI_CHARACTER: 4096
    },
    PATH: {
      APP_CUSTOMIZE: 'app/customize',
      APP_CUSTOMIZE_PREVIEW: 'preview/app/customize',
      APP_DEPLOY: 'preview/app/deploy',
      APP_DEPLOY_PREVIEW: 'preview/app/deploy',
      APP_FIELDS: 'app/form/fields',
      APP_FIELDS_PREVIEW: 'preview/app/form/fields',
      APP_LAYOUT: 'app/form/layout',
      APP_LAYOUT_PREVIEW: 'preview/app/form/layout',
      APP_PERMISSION: 'app/acl',
      APP_PERMISSION_PREVIEW: 'preview/app/acl',
      APP_PREVIEW: 'preview/app',
      APP_SETTINGS: 'app/settings',
      APP_SETTINGS_PREVIEW: 'preview/app/settings',
      APP_STATUS: 'app/status',
      APP_STATUS_PREVIEW: 'preview/app/status',
      APP_VIEWS: 'app/views',
      APP_VIEWS_PREVIEW: 'preview/app/views',
      APPS: 'apps',
      APP: 'app',
      BULK_REQUEST: 'bulkRequest',
      FIELD_PERMISSION: 'field/acl',
      FILE: 'file',
      GUESTS: 'guests',
      RECORD: 'record',
      RECORD_ASSIGNEES: 'record/assignees',
      RECORD_COMMENT: 'record/comment',
      RECORD_COMMENTS: 'record/comments',
      RECORD_PERMISSION: 'record/acl',
      RECORD_STATUS: 'record/status',
      RECORDS: 'records',
      RECORDS_STATUS: 'records/status',
      SPACE: 'space',
      SPACE_BODY: 'space/body',
      SPACE_GUESTS: 'space/guests',
      SPACE_MEMBERS: 'space/members',
      SPACE_TEMPLATE: 'template/space',
      SPACE_THREAD: 'space/thread',
      SPACE_THREAD_COMMENT: 'space/thread/comment',
      RECORD_CURSOR: 'records/cursor'
    },
  };
};

module.exports = constant();
