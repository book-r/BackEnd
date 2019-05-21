define({ "api": [
  {
    "type": "get",
    "url": "books/:id",
    "title": "Request book by id",
    "name": "GetBook",
    "group": "Books",
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
          "content": "HTTP/1.1 200 OK\n{ id: 1,\n  title: 'Classical Mechanics',\n  isbn: '9781891389221',\n  cover_url: 'https://www.uscibooks.com/taycm.jpg',\n  description:\n  'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',\n  average: 4.25,\n  edition: '1',\n  year: 2005,\n  publisher_id: 1,\n  created_at: null,\n  updated_at: null,\n  publisher: 'University Science Books',\n  authors: [{id: 1, name: \"John R. Taylor\",},],\n  subjects: [{id: 1, name: \"Physics\",},],\n  reviews:\n  [ { id: 1, rating: 5, comment: 'Good book!', book_id: 1, user_id: 1, title: 'Classical Mechanics', username: 'henry' },\n  { id: 2, rating: 3.5, comment: 'Love the cover', book_id: 1, user_id: 2, title: 'Classical Mechanics', username: 'blevins' } ] }",
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
    "url": "books",
    "title": "Request books",
    "name": "GetBooks",
    "group": "Books",
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
          "content": "HTTP/1.1 200 OK\n[ { \n  id: 1,\n  title: 'Classical Mechanics',\n  isbn: '9781891389221',\n  cover_url: 'https://www.uscibooks.com/taycm.jpg',\n  description:\n  'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',\n  average: 4.25,\n  edition: '1',\n  year: 2005,\n  publisher_id: 1,\n  created_at: null,\n  updated_at: null,\n  publisher: 'University Science Books' \n} ]",
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
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>id of user posting. Will be removed after auth is implemented.</p>"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 200 OK\n{ id: 5\n  rating: 4.6,\n  comment: 'It was pretty good',\n  book_id: 1,\n  user_id: 2 }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/reviews.js",
    "groupTitle": "Reviews"
  }
] });
