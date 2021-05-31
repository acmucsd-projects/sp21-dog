# Routes

## <u>Users</u>
 Verb | Uri | Authenticated | Operation | Description |
 :--- | :--- | :---: | :---: | :--- |
 GET | /api/users/user/{username} | No  | Read | Read a user's profile information (by username) |
 GET | /api/users/user/{username}/tasks | Yes |  Read | Read all tasks (complete and incomplete) by username |
 POST | /api/users/register | No | Create | Register a user and create it in the database |
 POST | /api/users/login | No | Read | Log in a user, generate auth token and refresh token |
 GET | /api/users/user/{username}/edit | Yes | Read | Get user's sensitive information
 POST | /api/users/user/{username}/edit | Yes | Update | Set user's sensitive information
 POST | /api/users/user/{username}/edit-password | Yes | Update | Set user's password
 POST | /api/users/user/{username}/edit-email | Yes | Update | Set user's email



### **[GET] /api/users/user/{username}**
Parameters
| Name | Required | Description |
| :--- | :---: | :--- |
| username | Yes | Username of user |

Responses
<table>
  <tr>
    <th>Code</th>
    <th>Body</th>
    <th>Header</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td><pre>{
  "username": string,
  "first": string,
  "last": string,
  "points": int,
  "fitness": int,
  "nature": int,
  "community": int,
  "knowledge": int,
  "joinDate": dateTime,
  "factionId": int,
  "guildId": int
}</pre></td>
    <td><pre>content-type: application/json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT
server: Kestrel 
transfer-encoding: chunked</pre></td>
    <td>User profile response with non-sensitive information</td>
  </tr>

  <tr>
    <td>404</td>
    <td><pre>{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  "title": "Not Found",
  "status": 404,
  "traceId": "00-58fa83de9d965b0eef5650fbf6920e5a-ce0f991e69bc7768-00"
}</pre></td>
    <td><pre>content-type: application/problem+json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT
server: Kestrel 
transfer-encoding: chunked</pre></td>
    <td>User does not exist</td>
  </tr>
</table>



### **[GET] /api/users/user/{username}/tasks**
Request Parameters
| Name | Required | Description |
| :--- | :---: | :--- | 
| username | Yes | Username of user |

Responses
<table>
  <tr>
    <th>Code</th>
    <th>Body</th>
    <th>Header</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td><pre>[
  {
    "taskType": int,
    "difficulty": int,
    "points": int,
    "duration": int,
    "assigned": dateTime,
    "completed": dateTime [nullable],
    "description": string
  }
]</pre></td>
    <td><pre>content-type: application/json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT
server: Kestrel 
transfer-encoding: chunked</pre></td>
    <td>List of tasks associated with a user</td>
  </tr>
  <tr>
    <td>401</td>
    <td><pre>{
  "type": "https://tools.ietf.org/html/rfc7235#section-3.1",
  "title": "Unauthorized",
  "status": 401,
  "traceId":"00-98ffaa12fb1c79bb6b3d57d4163235ea-0695a5058e6469a3-00"
}</pre></td>
    <td><pre>content-type: application/problem+json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT
server: Kestrel 
transfer-encoding: chunked</pre></td>
    <td>User is not authorized to access another user's tasks</td>
  </tr>
  <tr>
    <td>401</td>
    <td><pre></pre></td>
    <td><pre>
date: Wed05 May 2021 03:30:17 GMT
server: Kestrel 
content-length: 0
transfer-encoding: chunked
www-authenticate: Bearer error="invalid_token", error_description="The token expired at '05/04/2021 23:30:36'"
token-expired: true</pre></td>
    <td>User failed authentication</td>
  </tr>
  <tr>
    <td>404</td>
    <td><pre>{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  "title": "Not Found",
  "status": 404,
  "traceId": "00-58fa83de9d965b0eef5650fbf6920e5a-ce0f991e69bc7768-00"
}</pre></td>
    <td><pre>content-type: application/problem+json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT
server: Kestrel 
transfer-encoding: chunked</pre></td>
    <td>User does not exist</td>
  </tr>
</table>



### **[POST] /api/users/register**
Request Parameters
| Name | Required | Description |
| :--- | :---: | :--- | 
| *none* |

Request Body (multipart/form-data)
| Name | Required |
| :--- | :---: |
| Username | Yes |
| First | No |
| Last | No |
| Email | Yes |
| Password | Yes |

Responses
<table>
<tr>
    <th>Code</th>
    <th>Body</th>
    <th>Header</th>
    <th>Description</th>
</tr>

<tr>
<td>201</td>
<td><pre>{
  "username": string,
  "first": string,
  "last": string,
  "points": int,
  "fitness": int,
  "nature": int,
  "community": int,
  "knowledge": int,
  "joinDate": dateTime,
  "factionId": int,
  "guildId": int
}</pre></td>
<td><pre>content-type: application/json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT 
location: https://localhost:5001/api/users/user/{username}
server: Kestrel 
transfer-encoding: chunked</pre></td>
<td>Created at route</td>
</tr>

<tr>
<td>409</td>
<td><pre>User already exists</pre></td>
<td><pre> content-type: text/plain; charset=utf-8 
 date: Wed05 May 2021 03:41:53 GMT 
 server: Kestrel 
 transfer-encoding: chunked</pre></td>
 <td>Conflict message</td>
</tr>
</table>



### **[POST] /api/users/login**
Request Parameters
| Name | Required | Description |
| :--- | :---: | :--- | 
| *none* |

Request Body (multipart/form-data)
| Name | Required |
| :--- | :---: |
| Username | Yes |
| Password | Yes |

Responses
<table>
<tr>
  <th>Code</th>
  <th>Body</th>
  <th>Header</th>
  <th>Description</th>
</tr>
<tr>
  <td>200</td>
  <td><pre>{
  "jwt": string
}</pre></td>
  <td><pre>content-type: application/json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT 
server: Kestrel 
content-length: int
set-cookie: refreshToken=string</pre></td>
<td>Returns a JWT in the response body and sets an HTTP-only refreshToken cookie</td>
</tr>
<tr>
  <td>401</td>
  <td><pre>Invalid username or password</pre></td>
  <td><pre>content-type: text/plain; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT 
server: Kestrel 
transfer-encoding: chunked</pre></td>
  <td>General error on failure to authenticate</td>
</tr>
</table>



### **[GET] /api/users/user/{username}/edit**
Parameters
| Name | Required | Description |
| :--- | :---: | :--- |
| username | Yes | Username of user |

Responses
<table>
  <tr>
    <th>Code</th>
    <th>Body</th>
    <th>Header</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td><pre>{
    "username": "shanekim28",
    "displayName": "Shane",
    "bio": "Hi there, I'm Shane Kim!",
    "email": null
}</pre></td>
    <td><pre>content-type: application/json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT
server: Kestrel 
transfer-encoding: chunked</pre></td>
    <td>User profile response with non-sensitive information</td>
  </tr>
  <tr>
    <td>401</td>
    <td><pre>{
  "type": "https://tools.ietf.org/html/rfc7235#section-3.1",
  "title": "Unauthorized",
  "status": 401,
  "traceId":"00-98ffaa12fb1c79bb6b3d57d4163235ea-0695a5058e6469a3-00"
}</pre></td>
    <td><pre>content-type: application/problem+json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT
server: Kestrel 
transfer-encoding: chunked</pre></td>
    <td>User is not authorized to access another user's personal information</td>
  </tr>
  <tr>
    <td>404</td>
    <td><pre>{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  "title": "Not Found",
  "status": 404,
  "traceId": "00-58fa83de9d965b0eef5650fbf6920e5a-ce0f991e69bc7768-00"
}</pre></td>
    <td><pre>content-type: application/problem+json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT
server: Kestrel 
transfer-encoding: chunked</pre></td>
    <td>User does not exist</td>
  </tr>
</table>



### **[POST] /api/users/user/{username}/edit**
Parameters
| Name | Required | Description |
| :--- | :---: | :--- |
| username | Yes | Username of user |

```diff
- NOTE: This POST request OVERWRITES data, meaning you need the get the user's personal information first so that no information is lost
```
Request Body (multipart/form-data)
| Name | Required |
| :--- | :---: |
| DisplayName | Yes |
| Username | Yes |
| Bio | Yes

Responses
<table>
  <tr>
    <th>Code</th>
    <th>Body</th>
    <th>Header</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td><pre></pre></td>
    <td><pre>date: Wed05 May 2021 03:30:17 GMT
server: Kestrel</pre></td>
    <td>Successfully modified user information</td>
  </tr>
  <tr>
    <td>401</td>
    <td><pre>{
  "type": "https://tools.ietf.org/html/rfc7235#section-3.1",
  "title": "Unauthorized",
  "status": 401,
  "traceId":"00-98ffaa12fb1c79bb6b3d57d4163235ea-0695a5058e6469a3-00"
}</pre></td>
    <td><pre>content-type: application/problem+json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT
server: Kestrel 
transfer-encoding: chunked</pre></td>
    <td>User is not authorized to update another user's personal information</td>
  </tr>
  <tr>
    <td>404</td>
    <td><pre>{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  "title": "Not Found",
  "status": 404,
  "traceId": "00-58fa83de9d965b0eef5650fbf6920e5a-ce0f991e69bc7768-00"
}</pre></td>
    <td><pre>content-type: application/problem+json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT
server: Kestrel 
transfer-encoding: chunked</pre></td>
    <td>User does not exist</td>
  </tr>
</table>


### **[POST] /api/users/user/{username}/edit-password**
Parameters
| Name | Required | Description |
| :--- | :---: | :--- |
| username | Yes | Username of user |

Request Body (multipart/form-data)
| Name | Required |
| :--- | :---: |
| OldPassword | Yes |
| NewPassword | Yes |

Responses
<table>
  <tr>
    <th>Code</th>
    <th>Body</th>
    <th>Header</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td><pre></pre></td>
    <td><pre>date: Wed05 May 2021 03:30:17 GMT
server: Kestrel</pre></td>
    <td>Successfully updated user's password</td>
  </tr>
  <tr>
    <td>401</td>
    <td><pre>{
  "type": "https://tools.ietf.org/html/rfc7235#section-3.1",
  "title": "Unauthorized",
  "status": 401,
  "traceId":"00-98ffaa12fb1c79bb6b3d57d4163235ea-0695a5058e6469a3-00"
}</pre></td>
    <td><pre>content-type: application/problem+json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT
server: Kestrel 
transfer-encoding: chunked</pre></td>
    <td>User is not authorized to update another user's password</td>
  </tr>
  <tr>
    <td>404</td>
    <td><pre>{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  "title": "Not Found",
  "status": 404,
  "traceId": "00-58fa83de9d965b0eef5650fbf6920e5a-ce0f991e69bc7768-00"
}</pre></td>
    <td><pre>content-type: application/problem+json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT
server: Kestrel 
transfer-encoding: chunked</pre></td>
    <td>User does not exist</td>
  </tr>
</table>



### **[POST] /api/users/user/{username}/edit-email**
Parameters
| Name | Required | Description |
| :--- | :---: | :--- |
| username | Yes | Username of user |

Request Body (multipart/form-data)
| Name | Required |
| :--- | :---: |
| Email | Yes |

Responses
<table>
  <tr>
    <th>Code</th>
    <th>Body</th>
    <th>Header</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td><pre></pre></td>
    <td><pre>date: Wed05 May 2021 03:30:17 GMT
server: Kestrel</pre></td>
    <td>Successfully updated user's email</td>
  </tr>
  <tr>
    <td>401</td>
    <td><pre>{
  "type": "https://tools.ietf.org/html/rfc7235#section-3.1",
  "title": "Unauthorized",
  "status": 401,
  "traceId":"00-98ffaa12fb1c79bb6b3d57d4163235ea-0695a5058e6469a3-00"
}</pre></td>
    <td><pre>content-type: application/problem+json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT
server: Kestrel 
transfer-encoding: chunked</pre></td>
    <td>User is not authorized to update another user's email</td>
  </tr>
  <tr>
    <td>404</td>
    <td><pre>{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  "title": "Not Found",
  "status": 404,
  "traceId": "00-58fa83de9d965b0eef5650fbf6920e5a-ce0f991e69bc7768-00"
}</pre></td>
    <td><pre>content-type: application/problem+json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT
server: Kestrel 
transfer-encoding: chunked</pre></td>
    <td>User does not exist</td>
  </tr>
</table>



## <u>Game</u>
| Verb | Uri | Authenticated | Operation | Description |
| :----: | :--- | :---: | :---: | :---: |
| GET | /api/game/leaderboard | No  | Read | Read a list of the top players |
| GET | /api/game/generate | Yes | Create | Generate 5 tasks within ~5 mile radius of a user
| GET | /api/game/check | Yes | Read/Update | Checks the latitude/longitude params against all (authenticated) user's tasks for today, and marks any tasks within 50m of latitude/longitude params as complete



### **[GET] /api/game/leaderboard**

Request Parameters
| Name | Required | Description |
| :--- | :---: | :--- | 
| *none* |

Responses
<table>
<tr>
    <th>Code</th>
    <th>Body</th>
    <th>Header</th>
    <th>Description</th>
</tr>

<tr>
<td>200</td>
<td><pre>[
  {
    "username": string,
    "first": string,
    "last": string,
    "points": int,
    "fitness": int,
    "nature": int,
    "community": int,
    "knowledge": int,
    "joinDate": dateTime,
    "factionId": int,
    "guildId": int
  }
]</pre></td>
<td><pre>content-type: application/json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT 
server: Kestrel 
content-length: int</pre></td>
<td>List of top 10 user profiles ordered by points (descending)</td>
</tr>
</table>



### **[GET] /api/game/generate**

Request Parameters
| Name | Required | Description |
| :--- | :---: | :--- | 
| latitude | Yes | Latitude of user
| longitude | Yes | Longitude of user

Responses
<table>
<tr>
    <th>Code</th>
    <th>Body</th>
    <th>Header</th>
    <th>Description</th>
</tr>

<tr>
<td>200</td>
<td><pre>[
    {
        "id": 42,
        "taskType": 1,
        "points": 25,
        "duration": -1,
        "assigned": "2021-05-22T14:55:14.268268-07:00",
        "completed": null,
        "description": "Go out and see the sunshine! Take a break from your devices and enjoy what nature has to offer.",
        "latitude": 29.653173,
        "longitude": 29.993027,
        "address": "16150 Bernardo Heights Pkwy",
        "text": "Bernardo Heights Community Center"
    },
    ...,
]</pre></td>
<td><pre>content-type: application/json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT 
server: Kestrel 
content-length: int</pre></td>
<td>List of 5 newly-generated tasks</td>
</tr>
<tr>
    <td>401</td>
    <td><pre>{
  "type": "https://tools.ietf.org/html/rfc7235#section-3.1",
  "title": "Unauthorized",
  "status": 401,
  "traceId":"00-98ffaa12fb1c79bb6b3d57d4163235ea-0695a5058e6469a3-00"
}</pre></td>
    <td><pre>content-type: application/problem+json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT
server: Kestrel 
transfer-encoding: chunked</pre></td>
    <td>User is not authenticated</td>
  </tr>
</table>



### **[GET] /api/game/check**

Request Parameters
| Name | Required | Description |
| :--- | :---: | :--- | 
| taskId | Yes | Id of task to check
| latitude | Yes | Latitude of user
| longitude | Yes | Longitude of user

Responses
<table>
<tr>
    <th>Code</th>
    <th>Body</th>
    <th>Header</th>
    <th>Description</th>
</tr>

<tr>
<td>200</td>
<td><pre>{
    "completedTasks": [
        {
            "id": 77,
            "taskType": 2,
            "points": 25,
            "duration": -1,
            "assigned": "2021-05-22T15:11:53.899597",
            "completed": null,
            "description": "Knowledge is power!",
            "latitude": 29.95971,
            "longitude": 29.937464
        }
    ]
}</pre></td>
<td><pre>content-type: application/json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT 
server: Kestrel 
content-length: int</pre></td>
<td>Object containing key 'completedTasks' whose value is a list of task response objects</td>
</tr>
<tr>
    <td>401</td>
    <td><pre>{
  "type": "https://tools.ietf.org/html/rfc7235#section-3.1",
  "title": "Unauthorized",
  "status": 401,
  "traceId":"00-98ffaa12fb1c79bb6b3d57d4163235ea-0695a5058e6469a3-00"
}</pre></td>
    <td><pre>content-type: application/problem+json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT
server: Kestrel 
transfer-encoding: chunked</pre></td>
    <td>User is not authenticated</td>
  </tr>
</table>



## <u>Auth</u>
| Verb | Uri | Authenticated | Operation | Description |
| :----: | :---: | :---: | :---: | :---: |
| GET | /api/auth/refresh | Yes | Create | Create a refresh token and set it to the refreshToken cookie |
| GET | /api/auth/revoke | Yes | Update | Revoke the refresh token in the request body |



### **[GET] /api/auth/refresh**

Request Parameters
| Name | Required | Description |
| :--- | :---: | :--- | 
| *none* |

Responses
<table>
<tr>
    <th>Code</th>
    <th>Body</th>
    <th>Header</th>
    <th>Description</th>
</tr>

<tr>
<td>200</td>
<td><pre>{
  "jwt": string,
}</pre></td>
<td><pre>content-type: application/json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT 
server: Kestrel 
content-length: int
set-cookie: refreshToken=string
token-expired=true</pre></td>
<td>Returns a new auth token and re-sets the refreshToken cookie to a new refresh token</td>
</tr>
<tr>
  <td>400</td>
  <td><pre>{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "Bad Request",
  "status": 400,
  "traceId":"00-89699e8be9404f61b190889dc61ca512-1572550073beb99d-00"
}</pre></td>
<td><pre>content-type: application/problem+json; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT 
server: Kestrel 
content-length: int
token-expired=true</pre></td>
<td>Returns a bad request on an altered auth token or invalid refresh token</td>
</tr>

</table>



### **[GET] /api/auth/revoke**

Request Parameters
| Name | Required | Description |
| :--- | :---: | :--- | 
| *none* |

Responses
<table>
<tr>
    <th>Code</th>
    <th>Body</th>
    <th>Header</th>
    <th>Description</th>
</tr>

<tr>
<td>204</td>
<td><pre></pre></td>
<td><pre>date: Wed05 May 2021 03:30:17 GMT 
server: Kestrel</pre></td>
<td>Successfully revoked refresh token. [NOTE] It is up to the client to dispose of the authentication header, since the auth token will be active for a total of 15 minutes</td>
</tr>
<tr>
  <td>400</td>
  <td><pre>Invalid token</pre></td>
<td><pre>content-type: text/plain; charset=utf-8 
date: Wed05 May 2021 03:30:17 GMT 
server: Kestrel
transfer-encoding: chunked</pre></td>
<td>Auth token is expired or invalid, refresh token is invalid, or refresh token is inactive</td>
</tr>

</table>