export {POST,GET} from "@/lib/auth"

/*
When authenticating using user credentials, no file needs to be created. However, for authentication using Google, Facebook, or Github, a this api route  file must be created, otherwise it's not going to handle the session process.
*/