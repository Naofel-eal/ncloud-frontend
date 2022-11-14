class API{
    static URL = "http://localhost:3000/";

    //AUTHENTICATION
    static LOGIN = "auth/login";
    static REGISTER_EMAIL = "users/registermail"
    static REGISTER_USERNAME = "users/registerusername"
    static REGISTER = "users/register"

    //FILES
    static FILES = 'files/';
    static  FILE_PUSH = 'files/upload';
    static FILE_DELETE = 'files/delete';

    //FOLDERS
    static FOLDERS = 'folders/';
    static FOLDER_CREATE = 'folders/create';
    static FOLDER_FILES = 'folders/files';
    static FOLDERS_FOLDERS = 'folders/folders';

    //GROUPS
    static GROUPS = 'groups';
    static GROUPS_CREATE = 'groups/create';
    
    //USERS
    static USERS = 'users';
    static USERS_FILES = 'users/files'
    static USERS_FOLDERS = 'users/folders'
    static USERS_ROOTFOLDER = 'users/rootfolder'

}
export default API;