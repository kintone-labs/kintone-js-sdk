/**
 * kintone api - nodejs client
 * Member constants
 */

const constant = function() {
  const CONST = {};
  // FIELD TYPE constant
  CONST.FIELD = {
    CALC: 'CALC', // Calculated
    CATEGORY: 'CATEGORY', // Category
    CHECK_BOX: 'CHECK_BOX', // Check box
    CREATED_TIME: 'CREATED_TIME', // Created datetime
    CREATOR: 'CREATOR', // Created by
    DATE: 'DATE', // Date
    DATETIME: 'DATETIME', // Date and time
    DROP_DOWN: 'DROP_DOWN', // Drop-down
    FILE: 'FILE', // Attachment
    GROUP: 'GROUP', // Field group
    LINK: 'LINK', // Link
    MODIFIER: 'MODIFIER', // Updated by
    MULTI_LINE_TEXT: 'MULTI_LINE_TEXT', // Text Area
    MULTI_SELECT: 'MULTI_SELECT', // Multi-choice
    NUMBER: 'NUMBER', // Number, or Look-up
    RADIO_BUTTON: 'RADIO_BUTTON', // Radio button
    RECORD_NUMBER: 'RECORD_NUMBER', // Record number
    RICH_TEXT: 'RICH_TEXT', // Rich text
    SINGLE_LINE_TEXT: 'SINGLE_LINE_TEXT', // Text, or Look-up
    STATUS: 'STATUS', // Process management status
    STATUS_ASSIGNEE: 'STATUS_ASSIGNEE', // Assignee of the Process Management status
    SUBTABLE: 'SUBTABLE', // Table
    TIME: 'TIME', // Time
    UPDATED_TIME: 'UPDATED_TIME', // Updated datetime
    USER_SELECT: 'USER_SELECT', // User selection
    GROUP_SELECT: 'GROUP_SELECT', // Group selection
    ORGANIZATION_SELECT: 'ORGANIZATION_SELECT', // Department selection
    REVISION: '_REVISION_', // the revision of record
    ID: '_ID_', // The id of record
  };

  //  LAYOUT TYPE constant
  CONST.LAYOUT = {
    ROW: 'ROW', // A normal row of fields.
    SUBTABLE: 'SUBTABLE', // A Table.
    GROUP: 'GROUP', // A Group field.
  };

  //  LANGUAGE constant
  CONST.LANG_CODE = {
    DEFAULT: 'default', // Default language setting of system
    EN: 'en', // English language setting
    ZH: 'zh', // Chinese language setting
    JA: 'ja', // Japanese language setting
    USER: 'user', // Localized setting, in the same language as the language setting set on the user used for the authentication

  };
  return CONST;
};

module.exports = constant();
