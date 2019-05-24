define({ "api": [
  {
    "type": "post",
    "url": "auth/login",
    "title": "Login user",
    "name": "LoginUser",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body:",
          "content": "{ username: 'test',\n  password: 'password' }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "roles",
            "description": "<p>all user roles. Null if there are no roles.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>json web token, valid for 24 hours</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 201 OK\n{ id: 1,\n  username: 'henry',\n  roles: ['admin'],\n  token:\n  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiY3JlYXRlZF9hdCI6bnVsbCwidXBkYXRlZF9hdCI6bnVsbCwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNTU4NTQwODY2LCJleHAiOjE1NTg1NDQ0NjZ9.ZfXu0mKSPJYYbuw0ebkAJ6KzJIZnLWxxQKJo7euXj3s' }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "auth/refresh",
    "title": "Refresh token",
    "name": "RefreshUser",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>json web token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>json web token, valid for 24 hours</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 201 OK\n{ id: 3,\n  username: 'test',\n  roles: null,\n  token:\n  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiY3JlYXRlZF9hdCI6bnVsbCwidXBkYXRlZF9hdCI6bnVsbCwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNTU4NTQwODY2LCJleHAiOjE1NTg1NDQ0NjZ9.ZfXu0mKSPJYYbuw0ebkAJ6KzJIZnLWxxQKJo7euXj3s' }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "auth/register",
    "title": "Register user",
    "name": "RegisterUser",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body:",
          "content": "{ username: 'test',\n  password: 'password' }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "roles",
            "description": "<p>all user roles. Null if there are no roles.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>json web token, valid for 24 hours</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 201 OK\n{ id: 3,\n  username: 'test',\n  roles: null,\n  token:\n  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiY3JlYXRlZF9hdCI6bnVsbCwidXBkYXRlZF9hdCI6bnVsbCwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNTU4NTQwODY2LCJleHAiOjE1NTg1NDQ0NjZ9.ZfXu0mKSPJYYbuw0ebkAJ6KzJIZnLWxxQKJo7euXj3s' }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "authors/",
    "title": "Add author",
    "name": "AddAuthor",
    "group": "Authors",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>json web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>author name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body:",
          "content": "{ name: 'New Name' }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>author id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>author name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 201 OK\n{ id: 1,\n name: 'New Name' }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/authors.js",
    "groupTitle": "Authors"
  },
  {
    "type": "delete",
    "url": "authors/:id",
    "title": "Delete author by id",
    "name": "DeleteAuthor",
    "group": "Authors",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>json web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>author id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/authors.js",
    "groupTitle": "Authors"
  },
  {
    "type": "get",
    "url": "authors/:id",
    "title": "Get author by id",
    "name": "GetAuthor",
    "group": "Authors",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>author id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>author id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>author name</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "books",
            "description": "<p>an array of book objects written by the author</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 200 OK\n{ id: 1,\n name: 'John R. Taylor',\n books:\n [ { id: 1,\n     title: 'Classical Mechanics',\n     isbn: '9781891389221',\n     cover_url: 'https://www.uscibooks.com/taycm.jpg',\n     description:\n     'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',\n     edition: '1',\n     year: 2005,\n     featured: true,\n     publisher_id: 1,\n     created_at: null,\n     updated_at: null,\n     subjects: [{id: 1, name: 'Physics'}],\n     authors: [{id: 1, name: 'John R. Taylor'}],\n     publisher: 'University Science Books',\n     average: 4.25 } ] }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/authors.js",
    "groupTitle": "Authors"
  },
  {
    "type": "get",
    "url": "authors/",
    "title": "Get authors",
    "name": "GetAuthors",
    "group": "Authors",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>author id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>author name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 200 OK\n[{id: 1, name: \"John R. Taylor\"}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/authors.js",
    "groupTitle": "Authors"
  },
  {
    "type": "put",
    "url": "authors/:id",
    "title": "Update author by id",
    "name": "UpdateAuthor",
    "group": "Authors",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>json web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>author id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>author name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body:",
          "content": "{ name: 'New Name' }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>author id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>author name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 200 OK\n{ id: 1,\n name: 'New Name'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/authors.js",
    "groupTitle": "Authors"
  },
  {
    "type": "delete",
    "url": "books/:id",
    "title": "Delete book",
    "name": "DeleteBook",
    "group": "Books",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>json web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>book id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/books.js",
    "groupTitle": "Books"
  },
  {
    "type": "get",
    "url": "books/:id/reviews",
    "title": "Get book reviews",
    "name": "DeleteBook",
    "group": "Books",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>json web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>book id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "reviews",
            "description": "<p>book review array</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 1,\n    \"title\": \"Classical Mechanics\",\n    \"username\": \"henry\",\n    \"book_id\": 1,\n    \"user_id\": 1,\n    \"rating\": 5,\n    \"comment\": \"Good book!\"\n  },\n  {\n    \"id\": 2,\n    \"title\": \"Classical Mechanics\",\n    \"username\": \"blevins\",\n    \"book_id\": 1,\n    \"user_id\": 2,\n    \"rating\": 3.5,\n    \"comment\": \"Love the cover\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/books.js",
    "groupTitle": "Books"
  },
  {
    "type": "get",
    "url": "books/:id",
    "title": "Request book by id",
    "name": "GetBook",
    "group": "Books",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>json web token (only needed if you want user_review)</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>book id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>book id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>book title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "isbn",
            "description": "<p>isbn 13 string with no formatting</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cover_url",
            "description": "<p>a url to a large book cover</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>book description</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "average",
            "description": "<p>The average rating of the book. Null if there are no ratings.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "edition",
            "description": "<p>book edition</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>year published</p>"
          },
          {
            "group": "Success 200",
            "type": "Bool",
            "optional": false,
            "field": "featured",
            "description": "<p>featured</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user_review",
            "description": "<p>User review object or null (only if logged in)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "publisher_id",
            "description": "<p>publisher id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "publisher",
            "description": "<p>publisher name</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "authors",
            "description": "<p>array of author objects</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "reviews",
            "description": "<p>array of review objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 200 OK\n{ id: 1,\n  title: 'Classical Mechanics',\n  isbn: '9781891389221',\n  cover_url: 'https://www.uscibooks.com/taycm.jpg',\n  description:\n  'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',\n  average: 4.25,\n  edition: '1',\n  year: 2005,\n  user_review: {\n    book_id: 1,\n    comment: \"Good book!\",\n    id: 1,\n    rating: 5,\n    title: \"Classical Mechanics\",\n    user_id: 1,\n    username: \"henry\",\n  }\n  featured: true,\n  publisher_id: 1,\n  created_at: null,\n  updated_at: null,\n  publisher: 'University Science Books',\n  authors: [{id: 1, name: \"John R. Taylor\"}],\n  subjects: [{id: 1, name: \"Physics\"}],\n  reviews:\n  [ { id: 1, rating: 5, comment: 'Good book!', book_id: 1, user_id: 1, title: 'Classical Mechanics', username: 'henry' },\n  { id: 2, rating: 3.5, comment: 'Love the cover', book_id: 1, user_id: 2, title: 'Classical Mechanics', username: 'blevins' } ] }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/books.js",
    "groupTitle": "Books"
  },
  {
    "type": "get",
    "url": "books/?featured=:featured",
    "title": "Request books",
    "name": "GetBooks",
    "group": "Books",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "featured",
            "description": "<p>If true, return only featured books. False, return all books. False by default.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "books",
            "description": "<p>an array of book objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 200 OK\n[ { \n  id: 1,\n  title: 'Classical Mechanics',\n  isbn: '9781891389221',\n  cover_url: 'https://www.uscibooks.com/taycm.jpg',\n  description:\n  'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',\n  average: 4.25,\n  edition: '1',\n  year: 2005,\n  featured: true,\n  publisher_id: 1,\n  created_at: null,\n  updated_at: null,\n  subjects: [{id: 1, name: 'Physics'}],\n  authors: [{id: 1, name: 'John R. Taylor'}],\n  publisher: 'University Science Books' \n} ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/books.js",
    "groupTitle": "Books"
  },
  {
    "type": "post",
    "url": "books/:id",
    "title": "Add book",
    "name": "PostBook",
    "group": "Books",
    "description": "<p>Note that this endpoint does not allow for adding authors or subjects to the book. This must be done on the sub endpoints. If there is time, endpoint will gain the functionality.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>json web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>book title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "isbn",
            "description": "<p>isbn 13 string with no formatting</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cover_url",
            "description": "<p>a url to a large book cover</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>book description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "edition",
            "description": "<p>book edition</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>year published</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "publisher_id",
            "description": "<p>publisher id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body:",
          "content": "{ title: 'Classical Mechanics',\n  isbn: '9781891389221',\n  cover_url: 'https://www.uscibooks.com/taycm.jpg',\n  description:\n  'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',\n  edition: '1',\n  year: 2005,\n  publisher_id: 1,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Bool",
            "optional": false,
            "field": "featured",
            "description": "<p>featured</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>book id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>book title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "isbn",
            "description": "<p>isbn 13 string with no formatting</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cover_url",
            "description": "<p>a url to a large book cover</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>book description</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "average",
            "description": "<p>The average rating of the book. Null if there are no ratings.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "edition",
            "description": "<p>book edition</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>year published</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "publisher_id",
            "description": "<p>publisher id</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "authors",
            "description": "<p>array of author objects</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "subjects",
            "description": "<p>array of subject objects</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "publisher",
            "description": "<p>publisher name</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "reviews",
            "description": "<p>array of review objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 200 OK\n{ id: 1,\n  title: 'Classical Mechanics',\n  isbn: '9781891389221',\n  cover_url: 'https://www.uscibooks.com/taycm.jpg',\n  description:\n  'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',\n  average: 4.25,\n  edition: '1',\n  year: 2005,\n  featured: true,\n  publisher_id: 1,\n  created_at: null,\n  updated_at: null,\n  subjects: [{id: 1, name: 'Physics'}],\n  authors: [{id: 1, name: 'John R. Taylor'}],\n  publisher: 'University Science Books',\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/books.js",
    "groupTitle": "Books"
  },
  {
    "type": "put",
    "url": "books/:id",
    "title": "Update book",
    "name": "UpdateBook",
    "group": "Books",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>json web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>book title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "isbn",
            "description": "<p>isbn 13 string with no formatting</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cover_url",
            "description": "<p>a url to a large book cover</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>book description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "edition",
            "description": "<p>book edition</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>year published</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "publisher_id",
            "description": "<p>publisher id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body:",
          "content": "{ title: 'Classical Mechanics Part 2',\n  isbn: '9999999999999',\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Bool",
            "optional": false,
            "field": "featured",
            "description": "<p>featured</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>book id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>book title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "isbn",
            "description": "<p>isbn 13 string with no formatting</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cover_url",
            "description": "<p>a url to a large book cover</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>book description</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "average",
            "description": "<p>The average rating of the book. Null if there are no ratings.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "edition",
            "description": "<p>book edition</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>year published</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "publisher_id",
            "description": "<p>publisher id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "publisher",
            "description": "<p>publisher name</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "authors",
            "description": "<p>array of author objects</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "reviews",
            "description": "<p>array of review objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 200 OK\n{ id: 1,\n  title: 'Classical Mechanics Part 2',\n  isbn: '9999999999999',\n  cover_url: 'https://www.uscibooks.com/taycm.jpg',\n  description:\n  'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',\n  average: 4.25,\n  edition: '1',\n  year: 2005,\n  featured: false,\n  publisher_id: 1,\n  created_at: null,\n  updated_at: null,\n  subjects: null,\n  authors: null,\n  publisher: 'University Science Books',\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/books.js",
    "groupTitle": "Books"
  },
  {
    "type": "delete",
    "url": "reviews/:id",
    "title": "Delete review by id",
    "name": "DeleteReview",
    "group": "Reviews",
    "description": "<p>Only the user who made the review may delete it.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>json web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>review id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/reviews.js",
    "groupTitle": "Reviews"
  },
  {
    "type": "get",
    "url": "reviews/:id",
    "title": "Request review by id",
    "name": "GetReview",
    "group": "Reviews",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>review id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>comment id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>A comment string, or null.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>user rating for book</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "book_id",
            "description": "<p>book id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 200 OK\n{ id: 1,\n  rating: 5,\n  comment: 'Good book!',\n  book_id: 1,\n  title: 'Classical Mechanics',\n  user_id: 1,\n  username: 'henry'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/reviews.js",
    "groupTitle": "Reviews"
  },
  {
    "type": "get",
    "url": "reviews/?user_id={:user_id}",
    "title": "Request reviews",
    "name": "GetReviews",
    "group": "Reviews",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>An optional user id to get all reviews belonging to that user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "reviews",
            "description": "<p>an array of review objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 200 OK\n[{ id: 1,\n   rating: 5,\n   comment: 'Good book!',\n   book_id: 1,\n   title: 'Classical Mechanics',\n   user_id: 1,\n   username: 'henry'\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/reviews.js",
    "groupTitle": "Reviews"
  },
  {
    "type": "post",
    "url": "reviews/",
    "title": "Post review",
    "name": "PostReview",
    "group": "Reviews",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>json web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "size": "0.0-5.0",
            "optional": false,
            "field": "rating",
            "description": "<p>a floating point number between 0 and 5</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>optional comment string</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "book_id",
            "description": "<p>book id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example request body:",
          "content": "{ rating: 4.6,\n  comment: 'It was pretty good',\n  book_id: 1,\n  user_id: 2 }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>comment id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>A comment string, or null.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>user rating for book</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "book_id",
            "description": "<p>book id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 200 OK\n{ id: 5\n  rating: 4.6,\n  comment: 'It was pretty good',\n  username: 'blevins',\n  title: 'Classical Mechanics'\n  book_id: 1,\n  user_id: 2 }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/reviews.js",
    "groupTitle": "Reviews"
  },
  {
    "type": "put",
    "url": "reviews/:id",
    "title": "Update review by id",
    "name": "UpdateReview",
    "group": "Reviews",
    "description": "<p>Only the user who made the review may update it.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>json web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>review id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example request body:",
          "content": "{ rating: 0.5,\n  comment: 'It is not very good',\n  book_id: 1,\n  user_id: 2 }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>comment id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>A comment string, or null.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>user rating for book</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "book_id",
            "description": "<p>book id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 200 OK\n{ id: 5\n  rating: 0.5,\n  comment: 'It is not very good',\n  username: 'blevins',\n  title: 'Classical Mechanics'\n  book_id: 1,\n  user_id: 2 }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/reviews.js",
    "groupTitle": "Reviews"
  },
  {
    "type": "post",
    "url": "subjects/",
    "title": "Add subject",
    "name": "CreateSubject",
    "group": "Subjects",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>json web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>subject name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body:",
          "content": "{ name: 'New Name' }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>subject id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>subject name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 201 OK\n{ id: 10,\n name: 'New Name' }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/subjects.js",
    "groupTitle": "Subjects"
  },
  {
    "type": "delete",
    "url": "subjects/:id",
    "title": "Delete subject by id",
    "name": "DeleteSubject",
    "group": "Subjects",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>json web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>subject id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/subjects.js",
    "groupTitle": "Subjects"
  },
  {
    "type": "get",
    "url": "subjects/:id",
    "title": "Get subject by id",
    "name": "GetSubject",
    "group": "Subjects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>subject id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>subject id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>subject name</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "books",
            "description": "<p>an array of book objects in the subject</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 200 OK\n{ id: 1,\n name: 'Physics',\n books:\n [ { id: 1,\n     title: 'Classical Mechanics',\n     isbn: '9781891389221',\n     cover_url: 'https://www.uscibooks.com/taycm.jpg',\n     description:\n     'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',\n     edition: '1',\n     featured: true,\n     year: 2005,\n     publisher_id: 1,\n     created_at: null,\n     updated_at: null,\n     subjects: [{id: 1, name: 'Physics'}],\n     authors: [{id: 1, name: 'John R. Taylor'}],\n     publisher: 'University Science Books',\n     average: 4.25 } ] }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/subjects.js",
    "groupTitle": "Subjects"
  },
  {
    "type": "get",
    "url": "subjects/",
    "title": "Get subjects",
    "name": "GetSubjects",
    "group": "Subjects",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>subject id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>subject name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 200 OK\n[{id: 1, name: \"Physics\"}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/subjects.js",
    "groupTitle": "Subjects"
  },
  {
    "type": "put",
    "url": "subjects/:id",
    "title": "Update subject by id",
    "name": "UpdateSubject",
    "group": "Subjects",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>json web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>subject id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>subject name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body:",
          "content": "{ name: 'New Name' }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>subject id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>subject name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 200 OK\n{ id: 1,\n name: 'New Name' }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/subjects.js",
    "groupTitle": "Subjects"
  }
] });
