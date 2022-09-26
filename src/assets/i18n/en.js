module.exports = {
  login: {
    title: "this title",
    username: "Please enter the user name",
    usernameLengthLimit: "Username length is limited to 5 to 20 characters",
    password: "Please enter your password",
    passwordLengthLimit: "Password length is limited to 5 to 50 characters",
    passwordDifferent: "Please enter the password again",
    email: "Please enter your email",
    emailLengthLimit: "Email length is limited to 5 to 50 characters",
    emailErrorInput: "Please input the correct email address",
    unauthenticatedEmail:
      "The user has not authorized the email, please enter the email",
    openLoginRegisterFirst: "Please register first",
    openLoginLoginFirst: "Please login first",
  },
  header: {
    language: "Language",
    upload: "Upload",
    profile: "Profile",
    history: "History",
    setting: "Setting",
    likes: "Likes",
    logout: "Logout",
    search: "Please enter your search keyword",
    searchSelect: "Select",
    logIn: "Log in",
    signUp: "Sign up",
  },
  upload: {
    title: "Title",
    tags: "Tags",
    license: "License",
    tutorial: "Tutorial",
    resourceList: "The resource list",
    description: "Description",
    resourceCover: "The resource cover",
    createProject: "Create project",
    editProject: "Edit project",
    dragFileTip: "Drag your file & photo here",
    draFileTipDesc:
      "A maximum of {0} files can be upload,and the size of a single file should not exceed {1}",
    or: "Or",
    selectFile: "Add file",
    supportedFiles: "Supported Files",
    addStepTitle: "Add step title",
    addStepDesc: "Add step desctription",
    save: "Save",
    preview: "Preview",
    reset: "Reset",
    editOn: "Editd on ",
    source: "source",
    filenameTooLong:
      "The file name is too long, it should be within 50 characters",

    fileTooLarge: "The size of a single file cannot exceed {0}",
    fileExceed: "A maximum of {0} files can be uploaded",
    supportedFilesError: "Supported Files:{0}",
    tagTip: "Hint: Press Enter to save",
    updateOk: "Update ok",
    updateFail: "Update fail",
    saveOk: "Save ok",
    saveFail: "Save fail",
    notEmpty: "It's cannot be empty",
    sourceNotEmpty: "The resource cannot be empty",
    coverNotEmpty: "The cover cannot be empty",
    tagNotEmpty: "The tag cannot be empty",
    titleNotEmpty: "The title cannot be empty",
    descNotEmpty: "The description cannot be empty",
    tagNumError: "Up to 12 tags",
    charNumError: "Up to 32 characters",
    validateError: "Verification failed",
    titleLengthError: "title must be between {0} and {1} characters",
    fileSizeTipError: "The file is too large to upload failed",
    uploadfailed: "Upload failed",
  },
  comment: {
    empty: "No comments",
    emptyToast: "Comments cannot be empty",
    replyNum: "{0} replies",
    sendOk: "Send successfully",
  },
  download: {
    fileNum: "Files",
    downloadAll: "DownloadAll",
    download: "Download",
  },
  notice: {
    all: "All notice",
    followYou: "Follow you",
    unFollowYou: "UnFollow you",
    system: "System",
    systemMsg: "System notification",
    msg: "Send a message to you",
    comment: "Comment",
    following: "Following",
    markRead: "Mark as read",
    leftComment: "Comments your work:",
    upload: "Has upload a thing",
  },
  design: {
    follower: "Follower",
    following: "Following",
    resources: "Resources",
    likes: "Likes",
    collection: "Collection",
    histories: "Histories",
    Delete: "Delete",
    moveTo: "MoveTo",
    download: "Download",
    delFolderTip: "Delete this folder?",
    delFileTip: "Delete this file?",
    confirm: "Confirm",
    cancel: "Cancel",
    delSuccess: "Successfully deleted",
    Account: "Account",
    chooseImg: "edit",
    name: "Name",
    email: "Email",
    password: "Password",
    private: "Private",
    accountBinding: "Account Binding",
    tips: "Tips",
    followSuccess: "Follow success",
    unFollowSuccess: "UnFollow success",
    follow: "Follow",
    myFollowing: "Following",
    unFollow: "UnFollow",
    folderNameRequire: "FolderName is require",
    Rename: "Rename",
    moveSuccess: "Move success",
    addSuccess: "Add success",
    mine: "Mine",
    remixes: "Remixes",
    makes: "Makes",
    updSuccess: "Update success",
    emptyCollection: "Empty",
    onlyImg: "Upload files can only be picture format",
    uploadSuccess: "Successfully upload!",
    uploadFail: "upload failed!",
    noCollection: "No collection file",
    changePassword: "change Password",
  },
  setting: {
    forgetPassword: "Forget password",
    submit: "Submit",
    changeEmail: "Change email",
    newEmail: "New email",
    confirmPassword: "Confirm password",
    currentPassword: "Current password",
    newPassword: "New password",
    changePassword: "Change password",
    changeName: "Change name",
    newName: "New name",
    currentPasswordRequired: "The current password must be filled",
    PasswordLen: "The length is 5 to 20 characters",
    inputPassword: "Please enter the password",
    inputPasswordAgain: "Please enter the password again",
    PasswordNoSame: "Two input passwords are inconsistent!",
  },
  error: {
    serverDatabaseError: "server database error",
    serverError: "server error",
    created: "Created",
    unauthenticated: "Unauthenticated",
    forbidden: "Forbidden",
    notFound: "Not Found",
    usernameAndPasswordMustEnter: "username and password must be entered",
    usernameAndPasswordRange:
      " The length of the password is 8-16 characters, must contain two kinds of numbers, letters and characters.",
    usernameRange: "username is not in the specified range",
    emailRange: "email is not in the specified range",
    usernameExist: "The username already exists",
    emailExist: "The email already exists",
    accountDeleted: "Sorry, your account has been deleted",
    accountDisabled:
      "this account has been disabled. Please contact the administrator",
    passwordError: "Old password error",
    tokenExpired: "token expired",
    deviceNotSupported: "Your device does not support logins",
    usernameNotExist: "username does not exist",
    usernameOrPasswordError: "Username or password error",
    1: "server database error",
    2: "server error",
    201: "Created",
    401: "Unauthenticated",
    403: "Forbidden",
    404: "Not Found",
    1002: "username and password must be entered",
    1003: "username is not in the specified range",
    1004: " The length of the password is 8-16 characters, must contain two kinds of numbers, letters and characters.",
    1006: "username does not exist",
    1007: "Sorry, your account has been deleted",
    1008: "this account has been disabled. Please contact the administrator",
    1009: "Password error",
    1011: "The username already exists",
    1012: "The email already exists",
    1013: "token expired",
    1016: "Your device does not support logins",
  },
  main: {
    barnerViewMore: "view more",
  },
  thing: {
    fileNameTooLong:
      "The file name is too long, it should be within 50 characters",
    acceptFileFormat: "File only accepts png, jpg, jpeg, gif formats",
    acceptFileSize: "Upload image size should not exceed 10M",
  },
};
